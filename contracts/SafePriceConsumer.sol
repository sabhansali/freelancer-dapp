// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface AggregatorV3Interface {
    function decimals() external view returns (uint8);
    function description() external view returns (string memory);
    function latestRoundData()
        external
        view
        returns (
            uint80 roundId,
            int256 answer,
            uint256 startedAt,
            uint256 updatedAt,
            uint80 answeredInRound
        );
}

contract SafePriceConsumer {
    AggregatorV3Interface public immutable feed;
    uint256 public immutable maxAgeSeconds;
    uint8 public immutable feedDecimals;

    constructor(address feedAddress, uint256 maxAgeSeconds_) {
        require(feedAddress != address(0), "INVALID_FEED");
        require(maxAgeSeconds_ > 0, "INVALID_MAX_AGE");

        feed = AggregatorV3Interface(feedAddress);
        maxAgeSeconds = maxAgeSeconds_;
        feedDecimals = AggregatorV3Interface(feedAddress).decimals();
    }

    function feedDescription() external view returns (string memory) {
        return feed.description();
    }

    /**
     * Returns the validated feed answer in the feed's native decimal scale.
     * For ETH/USD, an answer of 2000e8 means $2,000.00.
     */
    function safePrice() public view returns (int256 price, uint256 updatedAt) {
        (, price, , updatedAt, ) = feed.latestRoundData();

        require(price > 0, "INVALID_PRICE");
        require(updatedAt != 0, "MISSING_UPDATE_TIME");
        require(updatedAt <= block.timestamp, "FUTURE_UPDATE_TIME");
        require(block.timestamp - updatedAt <= maxAgeSeconds, "STALE_PRICE");
    }

    /**
     * Converts an amount with 18 decimal places into USD with 18 decimals.
     * The amount is token-native units (1 token = 1e18), while the feed price
     * uses feedDecimals. For example, 2e18 at 2000e8 returns 4000e18.
     */
    function valueOf(uint256 amount) external view returns (uint256) {
        (int256 price, ) = safePrice();
        return amount * uint256(price) / (10 ** uint256(feedDecimals));
    }
}
