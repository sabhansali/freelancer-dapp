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
        uint assignedAt; // Timestamp when task was assigned
        uint deadline;   // Timestamp by which task must be completed
        bool fundsReclaimed; // Track if funds have been reclaimed
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
    function createTask(address _freelancer, string memory _description, uint _duration) public payable {
        require(msg.value > 0, "Payment required");
        require(
            registry.isRegistered(_freelancer),
            "Freelancer not registered"
        );
        require(_duration > 0, "Duration must be positive");

        taskCount++;
        uint nowTime = block.timestamp;
        tasks[taskCount] = Task({
            client: msg.sender,
            freelancer: _freelancer,
            amount: msg.value,
            description: _description,
            completed: false,
            assignedAt: nowTime,
            deadline: nowTime + _duration,
            fundsReclaimed: false
        });

        clientTasks[msg.sender].push(taskCount);
        freelancerTasks[_freelancer].push(taskCount);
    }

    // Client approves task completion → payment released
    function completeTask(uint _taskId) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.client, "Only client can approve");
        require(!task.completed, "Already completed");
        require(!task.fundsReclaimed, "Funds already reclaimed");
        task.completed = true;
        payable(task.freelancer).transfer(task.amount);
    }

    // Allow client to reclaim funds if deadline has passed and task not completed
    function reclaimFunds(uint _taskId) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.client, "Only client can reclaim");
        require(!task.completed, "Task already completed");
        require(!task.fundsReclaimed, "Funds already reclaimed");
        require(block.timestamp > task.deadline, "Deadline not yet passed");
        task.fundsReclaimed = true;
        payable(task.client).transfer(task.amount);
    }

    // Allow client to extend the deadline ONLY after the deadline has passed and task not completed or reclaimed
    function extendDeadline(uint _taskId, uint _extensionDuration) public {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.client, "Only client can extend deadline");
        require(!task.completed, "Task already completed");
        require(!task.fundsReclaimed, "Funds already reclaimed");
        require(block.timestamp > task.deadline, "Can only extend after deadline has passed");
        require(_extensionDuration > 0, "Extension duration must be positive");
        task.deadline = block.timestamp + _extensionDuration;
    }

    function getClientTasks(address _client) public view returns (uint[] memory) {
        return clientTasks[_client];
    }

    function getFreelancerTasks(address _freelancer) public view returns (uint[] memory) {
        return freelancerTasks[_freelancer];
    }
}

    