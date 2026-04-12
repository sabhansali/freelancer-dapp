// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

// Interface to interact with FreelancerRegistry
interface IFreelancerRegistry {
    function isRegistered(address _user) external view returns (bool);
}

contract TaskEscrow {

    struct Task {
        address client;
        address freelancer;
        uint amount;
        string description;  
        bool completed;
    }

    mapping(uint => Task) public tasks;
    mapping(address => uint[]) public clientTasks;
    mapping(address => uint[]) public freelancerTasks;
    uint public taskCount;

    // Address of FreelancerRegistry contract
    IFreelancerRegistry public registry;

    // Constructor to set registry contract address
    constructor(address _registryAddress) {
        registry = IFreelancerRegistry(_registryAddress);
    }

    // Create a new task and lock payment
    function createTask(address _freelancer, string memory _description) public payable {
    require(msg.value > 0, "Payment required");

    require(
        registry.isRegistered(_freelancer),
        "Freelancer not registered"
    );

    taskCount++;

    tasks[taskCount] = Task({
        client: msg.sender,
        freelancer: _freelancer,
        amount: msg.value,
        description: _description,   
        completed: false
    });

    clientTasks[msg.sender].push(taskCount);
    freelancerTasks[_freelancer].push(taskCount);
}

    // Client approves task completion → payment released
    function completeTask(uint _taskId) public {
        Task storage task = tasks[_taskId];

        require(msg.sender == task.client, "Only client can approve");
        require(!task.completed, "Already completed");

        task.completed = true;
        payable(task.freelancer).transfer(task.amount);
    }

    function getClientTasks(address _client) public view returns (uint[] memory) {
        return clientTasks[_client];
    }

    function getFreelancerTasks(address _freelancer) public view returns (uint[] memory) {
        return freelancerTasks[_freelancer];
    }
}

    