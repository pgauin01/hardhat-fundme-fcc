const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
// const { verify } = require("../utils/verify")
require("dotenv").config()

const DECIMALS = "8"
const INITIAL_PRICE = "200000000000"

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId === 31337) {
        console.log("local network deteted...deploying mocks!!!")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })
    }
    log("Mocks Deployed!")
    log("------------------------------------------------")
    log(
        "You are deploying to a local network, you'll need a local network running to interact",
    )
}

module.exports.tags = ["all", "mocks"]
