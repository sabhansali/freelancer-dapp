// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MockFeed {
    uint8 public immutable feedDecimals;
    string private feedDescription;
    int256 private answer;
    uint256 private updatedAt;
    uint80 private roundId;

    constructor(uint8 decimals_, string memory description_) {
        feedDecimals = decimals_;
        feedDescription = description_;
    }

    function decimals() external view returns (uint8) {
        return feedDecimals;
    }

    function description() external view returns (string memory) {
        return feedDescription;
    }

    function latestRoundData()
        external
        view
        returns (
            uint80,
            int256,
            uint256,
            uint256,
            uint80
        )
    {
        return (roundId, answer, updatedAt, updatedAt, roundId);
    }

    function set(int256 newAnswer, uint256 newUpdatedAt) public {
        answer = newAnswer;
        updatedAt = newUpdatedAt;
        roundId += 1;
    }

    function setFresh(int256 newAnswer) external {
        set(newAnswer, block.timestamp);
    }
}
