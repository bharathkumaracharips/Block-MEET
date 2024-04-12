// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserLinkRegistry {
    struct UserInfo {
        string name;
        string link;
    }

    mapping(address => UserInfo) public users;

    event LinkAdded(address indexed user, string name, string link);

    function addLink(string memory _name, string memory _link) public {
        users[msg.sender] = UserInfo(_name, _link);
        emit LinkAdded(msg.sender, _name, _link);
    }

    function getUserLink(address _user) public view returns (string memory name, string memory link) {
        return (users[_user].name, users[_user].link);
    }
}
