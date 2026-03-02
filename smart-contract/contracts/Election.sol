// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Election {

    address public admin;
    bool public electionStarted;

    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    uint public candidatesCount;
    mapping(uint => Candidate) public candidates;

    mapping(address => bool) public hasVoted;
    mapping(address => bool) public registeredVoters;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }
 
  modifier electionActive() {
    require(electionStarted && !electionEnded, "Election not active");
    _;
}

    function addCandidate(string memory _name) public onlyAdmin {
        require(!electionStarted, "Election already started");
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    
    function registerVoter(address _voter) public onlyAdmin {
    registeredVoters[_voter] = true;
}

    function startElection() public onlyAdmin {
        electionStarted = true;
    }

function getCandidatesCount() public view returns (uint) {
    return candidatesCount;
}
    function vote(uint _candidateId) public electionActive {
        require(registeredVoters[msg.sender], "Not registered");
        require(!hasVoted[msg.sender], "Already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid");

        hasVoted[msg.sender] = true;
        candidates[_candidateId].voteCount++;
    }

    function getResults(uint _id) public view returns(string memory, uint) {
        Candidate memory c = candidates[_id];
        return (c.name, c.voteCount);
    }
    bool public electionEnded;

function stopElection() public onlyAdmin {
    require(electionStarted, "Election not started");
    electionEnded = true;
    electionStarted = false;
}
}