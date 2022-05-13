import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider ||  Config.web3ProviderGanache);
const getContractAddressWineToken = async () => {
  let { WineToken } = await getContract();
  return WineToken._address;
};
const withdrawWineToken = async (address_wallet, value, taxValue) => {
  let { WineToken } = await getContract();
  let amount;
  let amountTax;
  amount = value.toString();
  amount = web3.utils.toWei(amount, "Ether");
  amountTax = taxValue.toString();
  amountTax = web3.utils.toWei(amountTax, "Ether");
  await WineToken.methods
    ._WithdrawToken(address_wallet, amount, amountTax)
    .send({
      from: address_wallet,
    });
  return { status: "success" };
};
const depositWineToken = async (address_wallet, value) => {
  let { WineToken } = await getContract();
  let amount;
  amount = value.toString();
  amount = web3.utils.toWei(amount, "Ether");
  await WineToken.methods._DepositToken(address_wallet, amount).send({
    from: address_wallet,
  });
  return { status: "success" };
};
const balanceOfWine = async (address_wallet) => {
  let { WineToken } = await getContract();
  const response = await WineToken.methods._BalanceOf(address_wallet).call();
  return web3.utils.fromWei(response, "Ether");
};

module.exports = {
  getContractAddressWineToken,
  withdrawWineToken,
  depositWineToken,
  balanceOfWine,
};
