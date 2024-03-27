require("dotenv").config();
const ethers = require("ethers");

const contract = require("../artifacts/contracts/Mint.sol/NFTMint.json");

const API_KEY = process.env.API_KEY;
// Create a signer
const privateKey = process.env.PRIVATE_KEY;
const provider = new ethers.AlchemyProvider("sepolia", API_KEY);
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const contractAddress = CONTRACT_ADDRESS;
// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer);
// Get the NFT Metadata IPFS URL
const METADATA_HASH_CODE = process.env.METADATA_HASH_CODE;
const tokenUri = `https://gateway.pinata.cloud/ipfs/${METADATA_HASH_CODE}`;

// Call mintNFT function
const mintNFT = async () => {
  let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri);
  await nftTxn.wait();
  console.log(
    `NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
  );
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
