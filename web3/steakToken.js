import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
const getContractAddressSteakToken = async () => {
  let { SteakToken } = await getContract();
  return SteakToken._address;
};
const withdrawSteakToken = async (address_wallet, value, taxValue) => {
  let { SteakToken } = await getContract();
  let amount;
  let amountTax;
  amount = value.toString();
  amount = web3.utils.toWei(amount, "Ether");
  amountTax = taxValue.toString();
  amountTax = web3.utils.toWei(amountTax, "Ether");
  await SteakToken.methods._WithdrawToken(address_wallet, amount,amountTax).send({
    from: address_wallet,
  });
  return { status: "success" };
};
const depositSteakToken = async (address_wallet, value) => {
  let { SteakToken } = await getContract();
  let amount;
  amount = value.toString();
  amount = web3.utils.toWei(amount, "Ether");
  await SteakToken.methods._DepositToken(address_wallet, amount).send({
    from: address_wallet,
  });
  return { status: "success" };
};
const balanceOfSteak = async (address_wallet) => {
  let { SteakToken } = await getContract();
  const response = await SteakToken.methods._BalanceOf(address_wallet).call();
  return web3.utils.fromWei(response, "Ether");
};
module.exports = {
  getContractAddressSteakToken,
  withdrawSteakToken,
  depositSteakToken,
  balanceOfSteak,
};
