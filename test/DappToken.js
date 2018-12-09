var DappToken = artifacts.require("./DappToken.sol");

// testing the total supply

var totalInstance;
beforeEach("deploying the contract", async () => {
  totalInstance = await DappToken.deployed();
});

it("sets the total supply upon deployment", async () => {
  const instance = await totalInstance.totalSupply();
  assert.equal(
    instance.toNumber(),
    1000000,
    "sets the total supply to 1,000,000"
  );
  it("allocating initial supply to admin", async () => {
    const balance = await totalInstance.balanceOf(accounts[0]);
    assert.equal(balance.toNumber(), 1000000, "allocating the balance");
  });
});
