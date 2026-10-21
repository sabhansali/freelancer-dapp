
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract FreelancerLiquidityPair is ERC20, ReentrancyGuard {
    using SafeERC20 for IERC20;

    uint256 public constant MINIMUM_LIQUIDITY = 1000;
    address public constant LOCKED_LIQUIDITY =
        address(0x000000000000000000000000000000000000dEaD);

    address public factory;
    address public token0;
    address public token1;

    uint112 private reserve0;
    uint112 private reserve1;
    uint32 private blockTimestampLast;

    bool private initialized;

    event Mint(
        address indexed sender,
        uint256 amount0,
        uint256 amount1,
        address indexed to
    );

    event Burn(
        address indexed sender,
        uint256 amount0,
        uint256 amount1,
        address indexed to
    );

    event Swap(
        address indexed sender,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out,
        address indexed to
    );

    event Sync(uint112 reserve0, uint112 reserve1);

    modifier onlyFactory() {
        require(msg.sender == factory, "FORBIDDEN");
        _;
    }

    constructor() ERC20("Freelancer DEX LP Token", "FDLP") {
        factory = msg.sender;
    }

    function initialize(
        address _token0,
        address _token1
    ) external onlyFactory {
        require(!initialized, "ALREADY_INITIALIZED");
        require(
            _token0 != address(0) &&
            _token1 != address(0) &&
            _token0 != _token1,
            "INVALID_TOKENS"
        );

        token0 = _token0;
        token1 = _token1;
        initialized = true;
    }

    function getReserves()
        public
        view
        returns (uint112, uint112, uint32)
    {
        return (reserve0, reserve1, blockTimestampLast);
    }

    function mint(address to)
        external
        nonReentrant
        returns (uint256 liquidity)
    {
        require(initialized, "NOT_INITIALIZED");
        require(to != address(0), "INVALID_RECIPIENT");

        uint256 balance0 = IERC20(token0).balanceOf(address(this));
        uint256 balance1 = IERC20(token1).balanceOf(address(this));

        uint256 amount0 = balance0 - uint256(reserve0);
        uint256 amount1 = balance1 - uint256(reserve1);

        uint256 supply = totalSupply();

        if (supply == 0) {
            uint256 initialLiquidity = _sqrt(amount0 * amount1);

            require(
                initialLiquidity > MINIMUM_LIQUIDITY,
                "INSUFFICIENT_LIQUIDITY"
            );

            _mint(LOCKED_LIQUIDITY, MINIMUM_LIQUIDITY);
            liquidity = initialLiquidity - MINIMUM_LIQUIDITY;
        } else {
            require(reserve0 > 0 && reserve1 > 0, "INVALID_RESERVES");

            uint256 liquidity0 =
                amount0 * supply / uint256(reserve0);

            uint256 liquidity1 =
                amount1 * supply / uint256(reserve1);

            liquidity = liquidity0 < liquidity1
                ? liquidity0
                : liquidity1;

            require(liquidity > 0, "INSUFFICIENT_LIQUIDITY");
        }

        _mint(to, liquidity);
        _update(balance0, balance1);

        emit Mint(msg.sender, amount0, amount1, to);
    }

    function burn(address to)
        external
        nonReentrant
        returns (uint256 amount0, uint256 amount1)
    {
        require(initialized, "NOT_INITIALIZED");
        require(to != address(0), "INVALID_RECIPIENT");
        require(to != token0 && to != token1, "INVALID_RECIPIENT");

        IERC20 token0Contract = IERC20(token0);
        IERC20 token1Contract = IERC20(token1);

        uint256 balance0 = token0Contract.balanceOf(address(this));
        uint256 balance1 = token1Contract.balanceOf(address(this));

        uint256 liquidity = balanceOf(address(this));
        uint256 supply = totalSupply();

        require(liquidity > 0, "INSUFFICIENT_LIQUIDITY");
        require(supply > 0, "INSUFFICIENT_SUPPLY");

        amount0 = liquidity * balance0 / supply;
        amount1 = liquidity * balance1 / supply;

        require(
            amount0 > 0 && amount1 > 0,
            "INSUFFICIENT_LIQUIDITY_BURNED"
        );

        _burn(address(this), liquidity);

        token0Contract.safeTransfer(to, amount0);
        token1Contract.safeTransfer(to, amount1);

        balance0 = token0Contract.balanceOf(address(this));
        balance1 = token1Contract.balanceOf(address(this));

        _update(balance0, balance1);

        emit Burn(msg.sender, amount0, amount1, to);
    }

    function swap(
        uint256 amount0Out,
        uint256 amount1Out,
        address to
    ) external nonReentrant {
        require(initialized, "NOT_INITIALIZED");
        require(
            amount0Out > 0 || amount1Out > 0,
            "INSUFFICIENT_OUTPUT_AMOUNT"
        );

        uint256 reserve0Before = uint256(reserve0);
        uint256 reserve1Before = uint256(reserve1);

        require(
            amount0Out < reserve0Before &&
            amount1Out < reserve1Before,
            "INSUFFICIENT_LIQUIDITY"
        );
        require(to != address(0), "INVALID_RECIPIENT");
        require(to != token0 && to != token1, "INVALID_RECIPIENT");

        IERC20 token0Contract = IERC20(token0);
        IERC20 token1Contract = IERC20(token1);

        if (amount0Out > 0) {
            token0Contract.safeTransfer(to, amount0Out);
        }

        if (amount1Out > 0) {
            token1Contract.safeTransfer(to, amount1Out);
        }

        uint256 balance0 = token0Contract.balanceOf(address(this));
        uint256 balance1 = token1Contract.balanceOf(address(this));

        _validateAndUpdateSwap(
            balance0,
            balance1,
            amount0Out,
            amount1Out,
            to
        );
    }

    function _validateAndUpdateSwap(
        uint256 balance0,
        uint256 balance1,
        uint256 amount0Out,
        uint256 amount1Out,
        address to
    ) private {
        uint256 reserve0Before = uint256(reserve0);
        uint256 reserve1Before = uint256(reserve1);

        uint256 amount0In =
            balance0 > reserve0Before - amount0Out
                ? balance0 - (reserve0Before - amount0Out)
                : 0;

        uint256 amount1In =
            balance1 > reserve1Before - amount1Out
                ? balance1 - (reserve1Before - amount1Out)
                : 0;

        require(
            amount0In > 0 || amount1In > 0,
            "INSUFFICIENT_INPUT_AMOUNT"
        );

        uint256 balance0Adjusted = balance0 * 1000 - amount0In * 3;
        uint256 balance1Adjusted = balance1 * 1000 - amount1In * 3;

        require(
            balance0Adjusted * balance1Adjusted >=
                reserve0Before * reserve1Before * 1000**2,
            "K"
        );

        _update(balance0, balance1);

        emit Swap(
            msg.sender,
            amount0In,
            amount1In,
            amount0Out,
            amount1Out,
            to
        );
    }

    function _update(uint256 balance0, uint256 balance1) private {
        require(
            balance0 <= type(uint112).max &&
            balance1 <= type(uint112).max,
            "RESERVE_OVERFLOW"
        );

        reserve0 = uint112(balance0);
        reserve1 = uint112(balance1);
        blockTimestampLast = uint32(block.timestamp);

        emit Sync(reserve0, reserve1);
    }

    function _sqrt(uint256 y) private pure returns (uint256 z) {
        if (y == 0) return 0;
        if (y <= 3) return 1;

        z = y;
        uint256 x = y / 2 + 1;

        while (x < z) {
            z = x;
            x = (y / x + x) / 2;
        }
    }
}