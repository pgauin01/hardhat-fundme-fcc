const { ethers, getNamedAccounts, deployments } = require("hardhat")

async function main() {
    // const { deployer } = await getNamedAccounts()
    const myContract = await deployments.get("FundMe")

    const fundMe = await ethers.getContractAt(
        myContract.abi,
        myContract.address,
    )
    console.log("Withdrawing from contract...")
    const transactionResponse = await fundMe.withdraw()
    await transactionResponse.wait()
    console.log("Got it back!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
