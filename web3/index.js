import Web3 from "web3";
let NFT;
let RandomBox;
let SteakToken;
let WineToken;
let FurnitureToken;
import Config from "../config";
import dataFromNFT from "../build/contracts/NFT.json";
import dataRandomBox from "../build/contracts/RandomBox.json";
import dataSteakToken from "../build/contracts/SteakToken.json";
import dataWineToken from "../build/contracts/WineToken.json";
import dataFurnitureToken from "../build/contracts/FurnitureToken.json";
const web3 = new Web3(Web3.givenProvider ||  Config.web3ProviderBscTestnet);
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
  SteakToken = new web3.eth.Contract(
    dataSteakToken.abi,
    dataSteakToken.networks[netId].address
  );
  WineToken = new web3.eth.Contract(
    dataWineToken.abi,
    dataWineToken.networks[netId].address
  );
  FurnitureToken = new web3.eth.Contract(
    dataFurnitureToken.abi,
    dataFurnitureToken.networks[netId].address
  );
  return { NFT, RandomBox, SteakToken, WineToken, FurnitureToken };
};
module.exports = {
  getContract,
};
