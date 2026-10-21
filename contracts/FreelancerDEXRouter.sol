
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

interface IFreelancerDEXFactory {
    function getPair(address tokenA, address tokenB)
        external
        view
        returns (address pair);

    function createPair(address tokenA, address tokenB)
        external
        returns (address pair);
}

interface IFreelancerDEXPair {
    function token0() external view returns (address);
    function token1() external view returns (address);

    function getReserves()
        external
        view
        returns (uint112 reserve0, uint112 reserve1, uint32 timestamp);

    function mint(address to) external returns (uint256 liquidity);

    function burn(address to)
        external
        returns (uint256 amount0, uint256 amount1);

    function swap(uint256 amount0Out, uint256 amount1Out, address to)
        external;
}

contract FreelancerDEXRouter {
    using SafeERC20 for IERC20;

    address public immutable factory;

    modifier ensure(uint256 deadline) {
        require(deadline >= block.timestamp, "EXPIRED");
        _;
    }

    constructor(address factoryAddress) {
        require(factoryAddress != address(0), "ZERO_FACTORY");
        factory = factoryAddress;
    }

    // ------------------------------------------------------------
    // Liquidity
    // ------------------------------------------------------------

    function addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        ensure(deadline)
        returns (uint256 amountA, uint256 amountB, uint256 liquidity)
    {
        require(to != address(0), "ZERO_RECIPIENT");

        (amountA, amountB) = _addLiquidity(
            tokenA,
            tokenB,
            amountADesired,
            amountBDesired,
            amountAMin,
            amountBMin
        );

        liquidity = _transferAndMint(
            tokenA,
            tokenB,
            amountA,
            amountB,
            to
        );
    }

    function _transferAndMint(
        address tokenA,
        address tokenB,
        uint256 amountA,
        uint256 amountB,
        address to
    ) internal returns (uint256 liquidity) {
        address pair = IFreelancerDEXFactory(factory).getPair(
            tokenA,
            tokenB
        );

        IERC20(tokenA).safeTransferFrom(msg.sender, pair, amountA);
        IERC20(tokenB).safeTransferFrom(msg.sender, pair, amountB);

        liquidity = IFreelancerDEXPair(pair).mint(to);
    }

    function _addLiquidity(
        address tokenA,
        address tokenB,
        uint256 amountADesired,
        uint256 amountBDesired,
        uint256 amountAMin,
        uint256 amountBMin
    ) internal returns (uint256 amountA, uint256 amountB) {
        require(tokenA != tokenB, "IDENTICAL_ADDRESSES");
        require(
            tokenA != address(0) && tokenB != address(0),
            "ZERO_ADDRESS"
        );

        address pair = IFreelancerDEXFactory(factory).getPair(
            tokenA,
            tokenB
        );

        if (pair == address(0)) {
            IFreelancerDEXFactory(factory).createPair(tokenA, tokenB);
            pair = IFreelancerDEXFactory(factory).getPair(
                tokenA,
                tokenB
            );
        }

        (uint256 reserveA, uint256 reserveB) = _getReserves(
            pair,
            tokenA
        );

        if (reserveA == 0 && reserveB == 0) {
            amountA = amountADesired;
            amountB = amountBDesired;
        } else {
            uint256 amountBOptimal = quote(
                amountADesired,
                reserveA,
                reserveB
            );

            if (amountBOptimal <= amountBDesired) {
                require(
                    amountBOptimal >= amountBMin,
                    "INSUFFICIENT_B_AMOUNT"
                );
                amountA = amountADesired;
                amountB = amountBOptimal;
            } else {
                uint256 amountAOptimal = quote(
                    amountBDesired,
                    reserveB,
                    reserveA
                );

                require(
                    amountAOptimal <= amountADesired,
                    "INVALID_OPTIMAL_AMOUNT"
                );
                require(
                    amountAOptimal >= amountAMin,
                    "INSUFFICIENT_A_AMOUNT"
                );

                amountA = amountAOptimal;
                amountB = amountBDesired;
            }
        }

        require(amountA >= amountAMin, "INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "INSUFFICIENT_B_AMOUNT");
        require(amountA > 0 && amountB > 0, "INSUFFICIENT_AMOUNT");
    }

    function removeLiquidity(
        address tokenA,
        address tokenB,
        uint256 liquidity,
        uint256 amountAMin,
        uint256 amountBMin,
        address to,
        uint256 deadline
    )
        external
        ensure(deadline)
        returns (uint256 amountA, uint256 amountB)
    {
        require(to != address(0), "ZERO_RECIPIENT");

        address pair = IFreelancerDEXFactory(factory).getPair(
            tokenA,
            tokenB
        );
        require(pair != address(0), "PAIR_NOT_FOUND");

        IERC20(pair).safeTransferFrom(msg.sender, pair, liquidity);

        (uint256 amount0, uint256 amount1) =
            IFreelancerDEXPair(pair).burn(to);

        (address token0,) = sortTokens(tokenA, tokenB);

        if (tokenA == token0) {
            amountA = amount0;
            amountB = amount1;
        } else {
            amountA = amount1;
            amountB = amount0;
        }

        require(amountA >= amountAMin, "INSUFFICIENT_A_AMOUNT");
        require(amountB >= amountBMin, "INSUFFICIENT_B_AMOUNT");
    }

    // ------------------------------------------------------------
    // Swaps
    // ------------------------------------------------------------

    function swapExactTokensForTokens(
        uint256 amountIn,
        uint256 amountOutMin,
        address[] calldata path,
        address to,
        uint256 deadline
    )
        external
        ensure(deadline)
        returns (uint256[] memory amounts)
    {
        require(to != address(0), "ZERO_RECIPIENT");
        require(path.length >= 2, "INVALID_PATH");
        require(amountIn > 0, "INSUFFICIENT_INPUT_AMOUNT");

        amounts = getAmountsOut(amountIn, path);

        require(
            amounts[amounts.length - 1] >= amountOutMin,
            "INSUFFICIENT_OUTPUT_AMOUNT"
        );

        address firstPair = IFreelancerDEXFactory(factory).getPair(
            path[0],
            path[1]
        );
        require(firstPair != address(0), "PAIR_NOT_FOUND");

        IERC20(path[0]).safeTransferFrom(
            msg.sender,
            firstPair,
            amounts[0]
        );

        _swap(amounts, path, to);
    }

    function _swap(
        uint256[] memory amounts,
        address[] calldata path,
        address to
    ) internal {
        for (uint256 i = 0; i < path.length - 1; i++) {
            (address token0,) = sortTokens(path[i], path[i + 1]);

            uint256 amountOut = amounts[i + 1];
            uint256 amount0Out = path[i] == token0 ? 0 : amountOut;
            uint256 amount1Out = path[i] == token0 ? amountOut : 0;

            address recipient = to;

            if (i < path.length - 2) {
                recipient = IFreelancerDEXFactory(factory).getPair(
                    path[i + 1],
                    path[i + 2]
                );
                require(recipient != address(0), "PAIR_NOT_FOUND");
            }

            address pair = IFreelancerDEXFactory(factory).getPair(
                path[i],
                path[i + 1]
            );
            require(pair != address(0), "PAIR_NOT_FOUND");

            IFreelancerDEXPair(pair).swap(
                amount0Out,
                amount1Out,
                recipient
            );
        }
    }

    // ------------------------------------------------------------
    // Pricing helpers
    // ------------------------------------------------------------

    function getAmountsOut(
        uint256 amountIn,
        address[] calldata path
    ) public view returns (uint256[] memory amounts) {
        require(path.length >= 2, "INVALID_PATH");

        amounts = new uint256[](path.length);
        amounts[0] = amountIn;

        for (uint256 i = 0; i < path.length - 1; i++) {
            address pair = IFreelancerDEXFactory(factory).getPair(
                path[i],
                path[i + 1]
            );
            require(pair != address(0), "PAIR_NOT_FOUND");

            (uint256 reserveIn, uint256 reserveOut) = _getReserves(
                pair,
                path[i]
            );

            amounts[i + 1] = getAmountOut(
                amounts[i],
                reserveIn,
                reserveOut
            );
        }
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    ) public pure returns (uint256 amountOut) {
        require(amountIn > 0, "INSUFFICIENT_INPUT_AMOUNT");
        require(
            reserveIn > 0 && reserveOut > 0,
            "INSUFFICIENT_LIQUIDITY"
        );

        uint256 amountInWithFee = amountIn * 997;
        amountOut =
            (amountInWithFee * reserveOut) /
            (reserveIn * 1000 + amountInWithFee);
    }

    function quote(
        uint256 amountA,
        uint256 reserveA,
        uint256 reserveB
    ) public pure returns (uint256 amountB) {
        require(amountA > 0, "INSUFFICIENT_AMOUNT");
        require(
            reserveA > 0 && reserveB > 0,
            "INSUFFICIENT_LIQUIDITY"
        );

        amountB = amountA * reserveB / reserveA;
    }

    function getReserves(
        address tokenA,
        address tokenB
    ) external view returns (uint256 reserveA, uint256 reserveB) {
        address pair = IFreelancerDEXFactory(factory).getPair(
            tokenA,
            tokenB
        );
        require(pair != address(0), "PAIR_NOT_FOUND");

        return _getReserves(pair, tokenA);
    }

    function _getReserves(
        address pair,
        address tokenA
    ) internal view returns (uint256 reserveA, uint256 reserveB) {
        (uint112 reserve0, uint112 reserve1,) =
            IFreelancerDEXPair(pair).getReserves();

        address token0 = IFreelancerDEXPair(pair).token0();

        if (tokenA == token0) {
            reserveA = uint256(reserve0);
            reserveB = uint256(reserve1);
        } else {
            reserveA = uint256(reserve1);
            reserveB = uint256(reserve0);
        }
    }

    function sortTokens(
        address tokenA,
        address tokenB
    ) public pure returns (address token0, address token1) {
        require(tokenA != tokenB, "IDENTICAL_ADDRESSES");
        require(
            tokenA != address(0) && tokenB != address(0),
            "ZERO_ADDRESS"
        );

        (token0, token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
    }
}
