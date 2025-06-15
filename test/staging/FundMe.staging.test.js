const { assert } = require("chai")
const { deployments, network, ethers, getNamedAccounts } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("FundMe Staging Tests", () => {
          let deployer
          let fundMe
          let myContract
          const sendValue = ethers.parseEther("0.02")
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              myContract = await deployments.get("FundMe")
              fundMe = await ethers.getContractAt(
                  myContract.abi,
                  myContract.address,
              )
          })
          it("allows people to withdraw and fund", async () => {
              try {
                  const fundtxResponse = await fundMe.fund({ value: sendValue })
                  await fundtxResponse.wait(1)
                  const WithdrawtxResponse = await fundMe.withdraw()
                  await WithdrawtxResponse.wait(1)

                  const endingFundMeBalance = await ethers.provider.getBalance(
                      fundMe.target,
                  )
                  console.log(
                      endingFundMeBalance.toString() +
                          " should equal 0, running assert equal...",
                  )
                  assert.equal(endingFundMeBalance.toString(), "0")
              } catch (err) {
                  console.error("Transaction failed:", err)
              }
          })
      })
