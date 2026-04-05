// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract FreelancerRegistry {

    struct Freelancer {
        address user;
        string name;
        string skill;
        bool registered;
    }

    mapping(address => Freelancer) public freelancers;

    event FreelancerRegistered(address user, string name, string skill);

    // Register a freelancer
    function register(string memory _name, string memory _skill) public {
        require(!freelancers[msg.sender].registered, "Already registered");

        freelancers[msg.sender] = Freelancer(
            msg.sender,
            _name,
            _skill,
            true
        );

        emit FreelancerRegistered(msg.sender, _name, _skill);
    }

    // Check if freelancer is registered
    function isRegistered(address _user) public view returns (bool) {
        return freelancers[_user].registered;
    }

    // Get freelancer details
    function getFreelancer(address _user) public view returns (
        string memory name,
        string memory skill,
        bool registered
    ) {
        Freelancer memory f = freelancers[_user];
        return (f.name, f.skill, f.registered);
    }
}