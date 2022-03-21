import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
const getContractAddressFurnitureToken = async () => {
  let { FurnitureToken } = await getContract();
  return FurnitureToken._address;
};
const withdrawFurnitureToken = async (address_wallet, value) => {
  let { FurnitureToken } = await getContract();
  await FurnitureToken.methods._WithdrawToken(address_wallet, value).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};
const depositFurnitureToken = async (address_wallet, value) => {
  let { FurnitureToken } = await getContract();
  await FurnitureToken.methods._DepositToken(address_wallet, value).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};

module.exports = {
  getContractAddressFurnitureToken,
  withdrawFurnitureToken,
  depositFurnitureToken,
};
