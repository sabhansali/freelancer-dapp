// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract SimpleAMM is ERC20, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable frlToken;

    uint256 public reserveFRL;
    uint256 public reserveETH;

    event LiquidityAdded(
        address indexed provider,
        uint256 frlAmount,
        uint256 ethAmount,
        uint256 lpTokens
    );

    event LiquidityRemoved(
        address indexed provider,
        uint256 frlAmount,
        uint256 ethAmount,
        uint256 lpTokens
    );

    event Swap(
        address indexed user,
        bool frlToEth,
        uint256 amountIn,
        uint256 amountOut
    );

    event Sync(
        uint256 reserveFRL,
        uint256 reserveETH
    );

    constructor(address _frlToken)
        ERC20("Freelancer AMM Liquidity", "fFRL-LP")
    {
        require(_frlToken != address(0), "Invalid FRL token");

        frlToken = IERC20(_frlToken);
    }

    function addLiquidity(
        uint256 frlAmount
    )
        external
        payable
        nonReentrant
        returns (uint256 lpTokens)
    {
        require(frlAmount > 0, "FRL amount must be positive");
        require(msg.value > 0, "ETH amount must be positive");

        uint256 currentSupply = totalSupply();

        if (currentSupply == 0) {
            lpTokens = sqrt(frlAmount * msg.value);
        } else {
            require(
                reserveFRL > 0 && reserveETH > 0,
                "Invalid reserves"
            );

            uint256 lpFromFRL =
                (frlAmount * currentSupply) / reserveFRL;

            uint256 lpFromETH =
                (msg.value * currentSupply) / reserveETH;

            lpTokens =
                lpFromFRL < lpFromETH
                ? lpFromFRL
                : lpFromETH;
        }

        require(
            lpTokens > 0,
            "Insufficient liquidity minted"
        );

        frlToken.safeTransferFrom(
            msg.sender,
            address(this),
            frlAmount
        );

        reserveFRL += frlAmount;
        reserveETH += msg.value;

        _mint(msg.sender, lpTokens);

        emit LiquidityAdded(
            msg.sender,
            frlAmount,
            msg.value,
            lpTokens
        );

        emit Sync(
            reserveFRL,
            reserveETH
        );
    }

    function removeLiquidity(
        uint256 lpTokens
    )
        external
        nonReentrant
        returns (
            uint256 frlAmount,
            uint256 ethAmount
        )
    {
        require(
            lpTokens > 0,
            "LP amount must be positive"
        );

        uint256 currentSupply = totalSupply();

        require(
            currentSupply > 0,
            "No liquidity"
        );

        require(
            balanceOf(msg.sender) >= lpTokens,
            "Insufficient LP tokens"
        );

        frlAmount =
            (lpTokens * reserveFRL) /
            currentSupply;

        ethAmount =
            (lpTokens * reserveETH) /
            currentSupply;

        require(
            frlAmount > 0 && ethAmount > 0,
            "Insufficient output"
        );

        _burn(msg.sender, lpTokens);

        reserveFRL -= frlAmount;
        reserveETH -= ethAmount;

        frlToken.safeTransfer(
            msg.sender,
            frlAmount
        );

        (bool success, ) =
            payable(msg.sender).call{
                value: ethAmount
            }("");

        require(
            success,
            "ETH transfer failed"
        );

        emit LiquidityRemoved(
            msg.sender,
            frlAmount,
            ethAmount,
            lpTokens
        );

        emit Sync(
            reserveFRL,
            reserveETH
        );
    }

    function swapFRLForETH(
        uint256 frlAmount
    )
        external
        nonReentrant
        returns (uint256 ethAmount)
    {
        require(
            frlAmount > 0,
            "FRL amount must be positive"
        );

        require(
            reserveFRL > 0 && reserveETH > 0,
            "Insufficient liquidity"
        );

        ethAmount = getAmountOut(
            frlAmount,
            reserveFRL,
            reserveETH
        );

        require(
            ethAmount > 0,
            "Insufficient output"
        );

        require(
            ethAmount < reserveETH,
            "Insufficient ETH reserve"
        );

        frlToken.safeTransferFrom(
            msg.sender,
            address(this),
            frlAmount
        );

        reserveFRL += frlAmount;
        reserveETH -= ethAmount;

        (bool success, ) =
            payable(msg.sender).call{
                value: ethAmount
            }("");

        require(
            success,
            "ETH transfer failed"
        );

        emit Swap(
            msg.sender,
            true,
            frlAmount,
            ethAmount
        );

        emit Sync(
            reserveFRL,
            reserveETH
        );
    }

    function swapETHForFRL()
        external
        payable
        nonReentrant
        returns (uint256 frlAmount)
    {
        require(
            msg.value > 0,
            "ETH amount must be positive"
        );

        require(
            reserveFRL > 0 && reserveETH > 0,
            "Insufficient liquidity"
        );

        frlAmount = getAmountOut(
            msg.value,
            reserveETH,
            reserveFRL
        );

        require(
            frlAmount > 0,
            "Insufficient output"
        );

        require(
            frlAmount < reserveFRL,
            "Insufficient FRL reserve"
        );

        reserveETH += msg.value;
        reserveFRL -= frlAmount;

        frlToken.safeTransfer(
            msg.sender,
            frlAmount
        );

        emit Swap(
            msg.sender,
            false,
            msg.value,
            frlAmount
        );

        emit Sync(
            reserveFRL,
            reserveETH
        );
    }

    function getReserves()
        external
        view
        returns (
            uint256 frlReserve,
            uint256 ethReserve
        )
    {
        return (
            reserveFRL,
            reserveETH
        );
    }

    function getAmountOut(
        uint256 amountIn,
        uint256 reserveIn,
        uint256 reserveOut
    )
        public
        pure
        returns (uint256)
    {
        require(
            amountIn > 0,
            "Invalid input"
        );

        require(
            reserveIn > 0 && reserveOut > 0,
            "Invalid reserves"
        );

        uint256 newReserveIn =
            reserveIn + amountIn;

        uint256 newReserveOut =
            (reserveIn * reserveOut) /
            newReserveIn;

        return reserveOut - newReserveOut;
    }

    function getK()
        external
        view
        returns (uint256)
    {
        return reserveFRL * reserveETH;
    }

    function sqrt(
        uint256 y
    )
        internal
        pure
        returns (uint256 z)
    {
        if (y > 3) {
            z = y;

            uint256 x =
                y / 2 + 1;

            while (x < z) {
                z = x;

                x =
                    (y / x + x) /
                    2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }
}