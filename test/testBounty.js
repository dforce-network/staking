// A simple test case for the bounty!!!
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { createFixtureLoader } = waffle;

const loadFixture = createFixtureLoader([], ethers.provider);

async function fixtureSetup([wallet, other], provider) {
  [owner, ...users] = await ethers.getSigners();
  user1 = users[0];
  user2 = users[1];

  // Mock an ERC20 contract.
  const ERC20 = await ethers.getContractFactory("MockERC20");
  const stakingToken = await ERC20.deploy(); //"Test Token", "TT"
  await stakingToken.deployed();

  const rewardToken = await ERC20.deploy(); //"Test Token", "TT"
  await rewardToken.deployed();

  const Bounty = await ethers.getContractFactory("Bounty");

  const bounty = await Bounty.deploy(
    rewardToken.address,
    stakingToken.address,
    10000,
    1,
    100
  );
  await bounty.deployed();

  // Mint some token to user1.
  await stakingToken.mint(user1.address, "10000");
  console.log(
    "user1 balance",
    (await stakingToken.balanceOf(user1.address)).toString()
  );
  stakingToken.connect(user1).approve(bounty.address, "999999");

  // Mint some token to user2.
  await stakingToken.mint(user2.address, "10000");
  console.log(
    "user2 balance",
    (await stakingToken.balanceOf(user2.address)).toString()
  );
  stakingToken.connect(user2).approve(bounty.address, "999999");

  // Mint some token to bounty contract.
  await rewardToken.mint(bounty.address, "10000");
  console.log(
    "bounty contract has token: ",
    (await rewardToken.balanceOf(bounty.address)).toString()
  );

  let currentBlock = await getBlock();
  console.log("current block is: ", parseInt(currentBlock.toString()));

  console.log(
    "stake start block number is:",
    (await bounty.rewardStartBlock()).toString()
  );

  return { stakingToken, rewardToken, bounty, users };
}

async function increaseBlock(blockNumber) {
  for (let i = 0; i < blockNumber; i++) {
    await hre.network.provider.request({
      method: "evm_mine",
      params: [],
    });
  }
}

async function increaseTime(time) {
  await hre.network.provider.request({
    method: "evm_increaseTime",
    params: [time],
  });
}

async function increaseBlockAndTime(time) {
  let before = await getBlock();
  await increaseBlock(time);
  await increaseTime(time);
  let after = await getBlock();
  console.log(after - before, " blocks has passed at block ", parseInt(after));
}

async function getBlock() {
  return hre.network.provider.request({
    method: "eth_blockNumber",
    params: [],
  });
}

describe("Bounty", function () {
  let owner, users, user1, user2;
  let stakingToken, rewardToken, bounty;

  beforeEach(async function () {
    ({ stakingToken, rewardToken, bounty, users } = await loadFixture(
      fixtureSetup
    ));
    [user1, user2] = users;
  });

  it("One users stakes and exits", async function () {
    // user1 starts to stake with 500 token.
    console.log("user1 is going to stake 500 token!");
    await bounty.connect(user1).stake("500");

    await increaseBlockAndTime(50);

    const stakedAmount = await bounty.userStakeAmounts(user1.address);
    console.log(
      "user1 is going to withdraw all staked amount: ",
      stakedAmount.toString()
    );

    // user1 unstakes
    console.log("user1 is going to exit");
    await bounty.connect(user1).exit();

    console.log(
      "after exit, user1 balance",
      (await rewardToken.balanceOf(user1.address)).toString()
    );

    user1CurrentRewards = await bounty.rewards(user1.address);
    console.log(
      "after user1 exit, user1 current rewards: ",
      user1CurrentRewards.toString()
    );
  });

  it("Two users stake with the same amount and duration but at different time", async function () {
    // user1 starts to stake with 500 token.
    console.log("user1 is going to stake 500 token!");
    await bounty.connect(user1).stake("500");

    await increaseBlockAndTime(20);

    // user1 unstakes
    await bounty.connect(user1).exit();
    let rewardUser1 = await rewardToken.balanceOf(user1.address);
    console.log("after exit, user1 balance", rewardUser1.toString());

    // user2 waited another 20 blocks to start stake
    await increaseBlockAndTime(20);

    // user2 starts to stake with 500 token.
    console.log("user2 is going to stake!");
    await bounty.connect(user2).stake("500");

    await increaseBlockAndTime(20);

    // user2 unstakes
    await bounty.connect(user2).exit();
    let rewardUser2 = await rewardToken.balanceOf(user2.address);
    console.log("after exit, user2 balance", rewardUser2.toString());

    expect(rewardUser1.toNumber()).to.lessThan(rewardUser2.toNumber());
  });

  it("Two users stake with the same amount but different duration", async function () {
    // user1 starts to stake with 500 token.
    console.log("user1 is going to stake 500 token!");
    await bounty.connect(user1).stake("500");

    // user2 starts to stake with 500 token.
    console.log("user2 is going to stake 500 token!");
    await bounty.connect(user2).stake("500");

    await increaseBlockAndTime(50);

    // user1 unstakes
    await bounty.connect(user1).exit();
    let rewardUser1 = await rewardToken.balanceOf(user1.address);
    console.log("after exit, user1 balance", rewardUser1.toString());

    // user2 stake for anther 2 blocks
    await increaseBlockAndTime(2);

    // user2 unstakes
    await bounty.connect(user2).exit();
    let rewardUser2 = await rewardToken.balanceOf(user2.address);
    console.log("after exit, user2 balance", rewardUser2.toString());
  });
});
