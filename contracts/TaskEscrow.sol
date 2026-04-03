// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;
contract TaskEscrow {

    struct Task {
        address client;
        address freelancer;
        uint amount;
        bool completed;
    }

    mapping(uint => Task) public tasks;
    uint public taskCount;

    // Create a new task and lock payment
    function createTask(address _freelancer) public payable {
        require(msg.value > 0, "Payment required");

        taskCount++;

        tasks[taskCount] = Task({
            client: msg.sender,
            freelancer: _freelancer,
            amount: msg.value,
            completed: false
        });
    }

    // Client approves task completion → payment released
    function completeTask(uint _taskId) public {
        Task storage task = tasks[_taskId];

        require(msg.sender == task.client, "Only client can approve");
        require(!task.completed, "Already completed");

        task.completed = true;
        payable(task.freelancer).transfer(task.amount);
    }
}