// A simple test case for the bounty!!!
const { expect } = require("chai");
const { ethers } = require("hardhat");


async function increaseBlock(blockNumber) {
    await hre.network.provider.request({
        method: "evm_mine",
        params: []
    })
}

async function increaseTime(time) {
    await hre.network.provider.request({
        method: "evm_increaseTime",
        params: [time]
    })
}

async function getBlock() {
    return  hre.network.provider.request({
        method: "eth_blockNumber",
        params: []
    })
}

describe("Bounty", function () {
    it("Two users stake with the same amount but at different time", async function () {
        // test!
        let owner, users, user1, user2;

        [owner, ...users] = await ethers.getSigners();
        user1 = users[0];
        user2 = users[1];

        // Mock an ERC20 contract.
        const ERC20 = await ethers.getContractFactory("MockERC20");
        const token = await ERC20.deploy(); //"Test Token", "TT"
        token.deployed();

        const Bounty = await ethers.getContractFactory(
            "Bounty"
        );

        const bounty = await Bounty.deploy(
            token.address,
            token.address,
            10000,
            3,
            103
        );
        await bounty.deployed();

        // Mint some tokento user1.
        await token.mint(user1.address, "10000");
        console.log("user1 balance", (await token.balanceOf(user1.address)).toString());
        token.connect(user1).approve(bounty.address, "999999");

        // Mint some token to user2.
        await token.mint(user2.address, "10000");
        console.log("user2 balance", (await token.balanceOf(user2.address)).toString());
        token.connect(user2).approve(bounty.address, "999999");

        // Mint some token to bounty contract.
        await token.mint(bounty.address, "10000");
        console.log("bounty contract has token: ", (await token.balanceOf(bounty.address)).toString());

        let currentBlock = await getBlock();
        console.log("current block is: ", parseInt(currentBlock.toString()));

        // user1 starts to stake with 500 token.
        await bounty.connect(user1).stake("500");
        let user1CurrentRewards = await bounty.balanceOf(user1.address);
        console.log("user1 current rewards: ", user1CurrentRewards.toString());

        for (let i = 0; i < 50; i++) {
            await increaseBlock();
        }
        await increaseTime(50);

        user1CurrentRewards = await bounty.balanceOf(user1.address);
        console.log("after 50 blocks, user1 current rewards: ", user1CurrentRewards.toString());

        // user1 starts to stake with 500 token.
        await bounty.connect(user2).stake("500");
        let user2CurrentRewards = await bounty.balanceOf(user2.address);
        console.log("user2 current rewards: ", user2CurrentRewards.toString());

        user1CurrentRewards = await bounty.balanceOf(user1.address);
        console.log("after user2 staking, user1 current rewards: ", user1CurrentRewards.toString());

        // user1 unstakes
        await bounty.connect(user1).unstake();
        console.log("after unstake, user1 balance", (await token.balanceOf(user1.address)).toString());

        // user2 unstakes
        await bounty.connect(user2).unstake();
        console.log("after unstake, user2 balance", (await token.balanceOf(user2.address)).toString());
    });
});
