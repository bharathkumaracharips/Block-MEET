const UserLinkRegistry = artifacts.require("UserLinkRegistry");

module.exports = function(deployer) {
  deployer.deploy(UserLinkRegistry);
};
