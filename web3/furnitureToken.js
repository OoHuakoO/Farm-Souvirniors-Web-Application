import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
const getContractAddressFurnitureToken = async () => {
  let { FurnitureToken } = await getContract();
  return FurnitureToken._address;
};
const withdrawFurnitureToken = async (address_wallet, value, taxValue) => {
  let { FurnitureToken } = await getContract();
  let amount;
  let amountTax;
  amount = value.toString();
  amount = web3.utils.toWei(amount, "Ether");
  amountTax = taxValue.toString();
  amountTax = web3.utils.toWei(amountTax, "Ether");
  await FurnitureToken.methods
    ._WithdrawToken(address_wallet, amount, amountTax)
    .send({
      from: address_wallet,
      gas: 5500000,
    });
  return { status: "success" };
};
const depositFurnitureToken = async (address_wallet, value) => {
  let { FurnitureToken } = await getContract();
  let amount;
  amount = value.toString();
  amount = web3.utils.toWei(amount, "Ether");
  await FurnitureToken.methods._DepositToken(address_wallet, amount).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};
const balanceOfFurniture = async (address_wallet) => {
  let { FurnitureToken } = await getContract();
  const response = await FurnitureToken.methods
    ._BalanceOf(address_wallet)
    .call();
  return web3.utils.fromWei(response, "Ether");
};

module.exports = {
  getContractAddressFurnitureToken,
  withdrawFurnitureToken,
  depositFurnitureToken,
  balanceOfFurniture,
};
