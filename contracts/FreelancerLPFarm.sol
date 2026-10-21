// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FreelancerLPFarm is ReentrancyGuard, Ownable {
    using SafeERC20 for IERC20;

    IERC20 public immutable lpToken;
    IERC20 public immutable rewardToken;

    uint256 public rewardRate;
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;
    uint256 public periodFinish;

    uint256 private constant PRECISION = 1e18;

    uint256 public totalStaked;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public userRewardPerTokenPaid;
    mapping(address => uint256) public rewards;

    event Staked(address indexed user, uint256 amount);
    event Withdrawn(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 amount);
    event RewardRateUpdated(uint256 oldRate, uint256 newRate);
    event RewardPeriodFunded(uint256 amount, uint256 duration);

    constructor(
        address lpTokenAddress,
        address rewardTokenAddress,
        uint256 initialRewardRate
    ) {
        require(lpTokenAddress != address(0), "ZERO_LP_TOKEN");
        require(rewardTokenAddress != address(0), "ZERO_REWARD_TOKEN");
        require(lpTokenAddress != rewardTokenAddress, "IDENTICAL_TOKENS");

        lpToken = IERC20(lpTokenAddress);
        rewardToken = IERC20(rewardTokenAddress);
        rewardRate = initialRewardRate;
        lastUpdateTime = block.timestamp;
    }

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = lastTimeRewardApplicable();

        if (account != address(0)) {
            rewards[account] = earned(account);
            userRewardPerTokenPaid[account] = rewardPerTokenStored;
        }

        _;
    }

    function lastTimeRewardApplicable()
        public
        view
        returns (uint256)
    {
        return block.timestamp < periodFinish
            ? block.timestamp
            : periodFinish;
    }

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) {
            return rewardPerTokenStored;
        }

        return rewardPerTokenStored
            + (
                (lastTimeRewardApplicable() - lastUpdateTime)
                    * rewardRate
                    * PRECISION
            ) / totalStaked;
    }

    function earned(address account) public view returns (uint256) {
        return (
            stakedBalance[account]
                * (
                    rewardPerToken()
                        - userRewardPerTokenPaid[account]
                )
        ) / PRECISION + rewards[account];
    }

    function stake(uint256 amount)
        external
        nonReentrant
        updateReward(msg.sender)
    {
        require(amount > 0, "ZERO_STAKE");

        totalStaked += amount;
        stakedBalance[msg.sender] += amount;

        lpToken.safeTransferFrom(msg.sender, address(this), amount);

        emit Staked(msg.sender, amount);
    }

    function withdraw(uint256 amount)
        public
        nonReentrant
        updateReward(msg.sender)
    {
        require(amount > 0, "ZERO_WITHDRAWAL");
        require(stakedBalance[msg.sender] >= amount, "INSUFFICIENT_STAKE");

        stakedBalance[msg.sender] -= amount;
        totalStaked -= amount;

        lpToken.safeTransfer(msg.sender, amount);

        emit Withdrawn(msg.sender, amount);
    }

    function claimReward()
        public
        nonReentrant
        updateReward(msg.sender)
    {
        uint256 reward = rewards[msg.sender];
        require(reward > 0, "NO_REWARDS");
        require(
            rewardToken.balanceOf(address(this)) >= reward,
            "INSUFFICIENT_REWARD_FUNDS"
        );

        rewards[msg.sender] = 0;
        rewardToken.safeTransfer(msg.sender, reward);

        emit RewardClaimed(msg.sender, reward);
    }

    function exit() external {
        uint256 amount = stakedBalance[msg.sender];

        if (amount > 0) {
            withdraw(amount);
        }

        if (earned(msg.sender) > 0) {
            claimReward();
        }
    }

    function fundRewardPeriod(uint256 amount, uint256 duration)
        external
        onlyOwner
        updateReward(address(0))
    {
        require(amount > 0, "ZERO_FUNDING");
        require(duration > 0, "ZERO_DURATION");

        rewardToken.safeTransferFrom(msg.sender, address(this), amount);

        if (block.timestamp >= periodFinish) {
            rewardRate = amount / duration;
        } else {
            uint256 remaining = periodFinish - block.timestamp;
            uint256 leftover = remaining * rewardRate;
            rewardRate = (amount + leftover) / duration;
        }

        require(rewardRate > 0, "REWARD_RATE_TOO_LOW");

        uint256 balance = rewardToken.balanceOf(address(this));
        require(
            rewardRate <= balance / duration,
            "REWARD_RATE_EXCEEDS_FUNDS"
        );

        lastUpdateTime = block.timestamp;
        periodFinish = block.timestamp + duration;

        emit RewardPeriodFunded(amount, duration);
    }

    function setRewardRate(uint256 newRate)
        external
        onlyOwner
        updateReward(address(0))
    {
        require(block.timestamp >= periodFinish, "PERIOD_ACTIVE");

        uint256 oldRate = rewardRate;
        rewardRate = newRate;

        emit RewardRateUpdated(oldRate, newRate);
    }

    function remainingRewardTime() external view returns (uint256) {
        if (block.timestamp >= periodFinish) {
            return 0;
        }

        return periodFinish - block.timestamp;
    }
}
