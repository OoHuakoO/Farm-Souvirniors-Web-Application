import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
const getContractAddressSteakToken = async () => {
  let { SteakToken } = await getContract();
  return SteakToken._address;
};
const withdrawSteakToken  = async (address_wallet, value) => {
  let { SteakToken } = await getContract();
  await SteakToken.methods._WithdrawToken(address_wallet, value).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};
const depositSteakToken  = async (address_wallet, value) => {
  console.log(address_wallet, value)
  let { SteakToken } = await getContract();
  await SteakToken.methods._DepositToken(address_wallet, value).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};

module.exports = {
  getContractAddressSteakToken,
  withdrawSteakToken,
  depositSteakToken,
};
