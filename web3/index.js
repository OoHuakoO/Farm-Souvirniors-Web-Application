import Web3 from "web3";
let NFT;
let RandomBox;
import dataFromNFT from "../build/contracts/NFT.json";
import dataRandomBox from "../build/contracts/RandomBox.json";
// Development
const web3 = new Web3(Web3.givenProvider || "http://127.0.0.1:7545");
// Testnet Ropsten
// const web3 = new Web3(
//   Web3.givenProvider || "https://data-seed-prebsc-1-s1.binance.org:8545"
// );
const getContract = async () => {
  const netId = await web3.eth.net.getId();

  NFT = new web3.eth.Contract(
    dataFromNFT.abi,
    dataFromNFT.networks[netId].address
  );
  RandomBox = new web3.eth.Contract(
    dataRandomBox.abi,
    dataRandomBox.networks[netId].address
  );
  return { NFT, RandomBox };
};
module.exports = {
  getContract,
};
