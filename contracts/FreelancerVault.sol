// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FreelancerVault is ERC4626, Ownable {
    using SafeERC20 for IERC20;

    constructor(IERC20 asset_)
        ERC20("Freelancer Vault Share", "fFRL")
        ERC4626(asset_)
    {}

    function getUserVaultValue(address user) external view returns (uint256) {
        return convertToAssets(balanceOf(user));
    }

    function addSimulatedYield(uint256 amount) external onlyOwner {
        IERC20(asset()).safeTransferFrom(msg.sender, address(this), amount);
    }
}