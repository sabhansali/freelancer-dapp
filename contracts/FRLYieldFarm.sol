// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract FRLYieldFarm is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable lpToken;
    IERC20 public immutable rewardToken;
    uint256 public rewardRate;
    uint256 public totalStaked;

    mapping(address => uint256) public stakedBalance;
    mapping(address => uint256) public lastUpdate;
    mapping(address => uint256) public pendingReward;

    event Staked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event Unstaked(address indexed user, uint256 amount);

    constructor(address lpToken_, address rewardToken_) {
        require(lpToken_ != address(0), "Invalid LP token");
        require(rewardToken_ != address(0), "Invalid reward token");
        lpToken = IERC20(lpToken_);
        rewardToken = IERC20(rewardToken_);
        rewardRate = 1e15;
    }

    function stake(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be positive");
        _updateReward(msg.sender);
        stakedBalance[msg.sender] += amount;
        totalStaked += amount;
        lpToken.safeTransferFrom(msg.sender, address(this), amount);
        emit Staked(msg.sender, amount);
    }

    function earned(address user) public view returns (uint256) {
        uint256 elapsed = block.timestamp - lastUpdate[user];
        return pendingReward[user]
            + (stakedBalance[user] * rewardRate * elapsed) / 1e18;
    }

    function harvest() external nonReentrant {
        _updateReward(msg.sender);
        _claimReward(msg.sender);
    }

    function withdraw(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be positive");
        _updateReward(msg.sender);
        require(stakedBalance[msg.sender] >= amount, "Insufficient staked balance");
        stakedBalance[msg.sender] -= amount;
        totalStaked -= amount;
        lpToken.safeTransfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function exit() external nonReentrant {
        _updateReward(msg.sender);
        uint256 amount = stakedBalance[msg.sender];
        stakedBalance[msg.sender] = 0;
        totalStaked -= amount;
        if (amount > 0) {
            lpToken.safeTransfer(msg.sender, amount);
            emit Unstaked(msg.sender, amount);
        }
        _claimReward(msg.sender);
    }

    function availableRewardLiquidity() public view returns (uint256) {
        return rewardToken.balanceOf(address(this));
    }

    function _updateReward(address user) internal {
        pendingReward[user] = earned(user);
        lastUpdate[user] = block.timestamp;
    }

    function _claimReward(address user) internal {
        uint256 reward = pendingReward[user];
        require(reward <= rewardToken.balanceOf(address(this)), "Insufficient reward liquidity");
        pendingReward[user] = 0;
        rewardToken.safeTransfer(user, reward);
        emit RewardClaimed(user, reward);
    }
}