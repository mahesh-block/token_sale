var DappToken = artifacts.require("./DappToken.sol");

// testing the total supply
let tokenInstance;
let accounts;
beforeEach("sets the supply", async () => {
  tokenInstance = await DappToken.deployed();
  accounts = web3.eth.accounts;
});

it("sets the initial supply upon deployment", async () => {
  const instance = await tokenInstance.totalSupply();
  assert.equal(instance.toNumber(), 1000000);
});
it("check admin balance", async () => {
  const balance = await tokenInstance.balanceOf(accounts[0]);
  assert.equal(balance.toNumber(), 1000000);
});

it("transfers token ownership", async () => {
  try {
    const instance = await tokenInstance.transfer.call(
      accounts[1],
      999999999999999
    );
  } catch (err) {
    assert(
      err.message.indexOf("revert") >= 0,
      "error message must contain revert"
    );
  }
});
it("adds the amount to receiving amount", async () => {
  const instance = await tokenInstance.transfer(accounts[1], 250000, {
    from: accounts[0]
  });
  assert.equal(instance.logs.length, 1, "triggers one event");
  assert.equal(
    instance.logs[0].event,
    "Transfer",
    'Should be "Transfer" event'
  );
  assert.equal(
    instance.logs[0].args._from,
    accounts[0],
    "logs the account the tokens are transferred from"
  );
  assert.equal(
    instance.logs[0].args._to,
    accounts[1],
    "logs the account the tokens are transferred to"
  );
  assert.equal(
    instance.logs[0].args._value,
    250000,
    "logs the transferred amount"
  );
  const balance = await tokenInstance.balanceOf(accounts[1]);
  assert.equal(balance.toNumber(), 250000);
});

it("approves tokens for delegated transfer", async () => {
  // const instance = await tokenInstance.approve.call(accounts[1], 100);
  // assert.equal(instance, true, "it returns true");
  const instance = await tokenInstance.approve(accounts[1], 100);
  assert.equal(instance.logs.length, 1, "triggers one event");
  assert.equal(
    instance.logs[0].event,
    "Approval",
    'Should be "Approval" event'
  );
  assert.equal(
    instance.logs[0].args._owner,
    accounts[0],
    "logs the account the tokens are authorized by"
  );
  assert.equal(
    instance.logs[0].args._spender,
    accounts[1],
    "logs the account the tokens are authorized to"
  );
  assert.equal(
    instance.logs[0].args._value,
    100,
    "logs the transferred amount"
  );
  const allow = await tokenInstance.allowance(accounts[0], accounts[1]);
  assert.equal(allow, 100, "stores the allownace for delegated transfer");
});

it("handles delegated token transfers", async () => {
  fromAccount = accounts[2];
  toAccount = accounts[3];
  spendingAccount = accounts[4];
  //transfer some tokens
  const instance = await tokenInstance.transfer(fromAccount, 100, {
    from: accounts[0]
  });
  const allow_spend = await tokenInstance.approve(spendingAccount, 10, {
    from: fromAccount
  });
  try {
    const large_spend = await tokenInstance.transferFrom(
      fromAccount,
      toAccount,
      9999,
      { from: spendingAccount }
    );
  } catch (err) {
    assert(
      err.message.indexOf("revert") >= 0,
      "can't transfer value larger than balance"
    );
  }
  //try transferring something larger than approved amount
  try {
    const amount = await tokenInstance.transferFrom(
      fromAccount,
      toAccount,
      20,
      { from: spendingAccount }
    );
  } catch (err) {
    assert(
      err.message.indexOf("revert") >= 0,
      "can't transfer value larger than approved amount"
    );
  }
});
