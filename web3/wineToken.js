import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
const getContractAddressWineToken = async () => {
  let { WineToken } = await getContract();
  return WineToken._address;
};
const withdrawWineToken = async (address_wallet, value) => {
  let { WineToken } = await getContract();
  await WineToken.methods._WithdrawToken(address_wallet, value).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};
const depositWineToken = async (address_wallet, value) => {
  let { WineToken } = await getContract();
  await WineToken.methods._DepositToken(address_wallet, value).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};

module.exports = {
  getContractAddressWineToken,
  withdrawWineToken,
  depositWineToken,
};
