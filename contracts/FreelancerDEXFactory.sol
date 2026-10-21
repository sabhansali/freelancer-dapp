
 // SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./FreelancerLiquidityPair.sol";

contract FreelancerDEXFactory {
    address public feeTo;
    address public feeToSetter;

    mapping(address => mapping(address => address)) public getPair;
    address[] public allPairs;

    event PairCreated(
        address indexed token0,
        address indexed token1,
        address pair,
        uint256 pairCount
    );

    event FeeToUpdated(address indexed oldFeeTo, address indexed newFeeTo);
    event FeeToSetterUpdated(
        address indexed oldSetter,
        address indexed newSetter
    );

    modifier onlyFeeToSetter() {
        require(msg.sender == feeToSetter, "FORBIDDEN");
        _;
    }

    constructor() {
        feeToSetter = msg.sender;
    }

    function allPairsLength() external view returns (uint256) {
        return allPairs.length;
    }

    function createPair(
        address tokenA,
        address tokenB
    ) external returns (address pair) {
        require(tokenA != tokenB, "IDENTICAL_ADDRESSES");

        (address token0, address token1) = sortTokens(tokenA, tokenB);

        require(token0 != address(0), "ZERO_ADDRESS");
        require(getPair[token0][token1] == address(0), "PAIR_EXISTS");

        FreelancerLiquidityPair newPair = new FreelancerLiquidityPair();
        newPair.initialize(token0, token1);

        pair = address(newPair);

        getPair[token0][token1] = pair;
        getPair[token1][token0] = pair;
        allPairs.push(pair);

        emit PairCreated(token0, token1, pair, allPairs.length);
    }

    function sortTokens(
        address tokenA,
        address tokenB
    ) public pure returns (address token0, address token1) {
        require(tokenA != address(0), "ZERO_ADDRESS");
        require(tokenB != address(0), "ZERO_ADDRESS");
        require(tokenA != tokenB, "IDENTICAL_ADDRESSES");

        (token0, token1) = tokenA < tokenB
            ? (tokenA, tokenB)
            : (tokenB, tokenA);
    }

    function setFeeTo(address newFeeTo) external onlyFeeToSetter {
        emit FeeToUpdated(feeTo, newFeeTo);
        feeTo = newFeeTo;
    }

    function setFeeToSetter(address newSetter) external onlyFeeToSetter {
        require(newSetter != address(0), "ZERO_ADDRESS");

        emit FeeToSetterUpdated(feeToSetter, newSetter);
        feeToSetter = newSetter;
    }
}
