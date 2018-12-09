var DappToken = artifacts.require("./DappToken.sol");

it("sets the total supply upon deployment", async () => {
  const totalInstance = await DappToken.deployed();
  const instance = await totalInstance.totalSupply();
  assert.equal(
    instance.toNumber(),
    1000000,
    "sets the total supply to 1,000,000"
  );
});
