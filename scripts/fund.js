const { ethers } = require("hardhat")

async function main() {
    const myContract = await deployments.get("FundMe")

    const fundMe = await ethers.getContractAt(
        myContract.abi,
        myContract.address,
    )
    console.log(`Got contract FundMe at ${fundMe.target}`)
    console.log("Funding contract...")

    const transactionResponse = await fundMe.fund({
        value: ethers.parseEther("0.1"),
    })
    await transactionResponse.wait()
    console.log("Funded!")
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
