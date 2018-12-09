var DappToken = artifacts.require("./DappToken.sol");

// testing the total supply

let totalInstance;
beforeEach(async () => {
  totalInstance = await DappToken.deployed();
});

describe("contracts", () => {
  it("sets the total supply upon deployment", async () => {
    const instance = await totalInstance.totalSupply();
    assert.equal(
      instance.toNumber(),
      1000000,
      "sets the total supply to 1,000,000"
    );
    it("allocating initial supply to admin", async () => {
      const balance = await totalInstance.methods.balanceOf().call({
        from: accounts[0]
      });
      console.log("hi Mahesh");
      assert.equal(balance.toNumber(), 1000000, "allocating the balance");
    });
  });
});
