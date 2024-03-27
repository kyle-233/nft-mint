async function main() {
  // Grab the contract factory
  const NFTMint = await ethers.getContractFactory("NFTMint");

  // Start deployment, returning a promise that resolves to a contract object
  const nftMint = await NFTMint.deploy(); // Instance of the contract
  console.log("Contract deployed to address:", nftMint.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
