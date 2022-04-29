import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || Config.web3ProviderBscTestnet);
const getContractAddressRandomBox = async () => {
  let { RandomBox } = await getContract();
  return RandomBox._address;
};
const mintRandomBox = async (address_wallet, name, price, count, picture) => {
  console.log(address_wallet, name, price, count, picture);
  let { RandomBox } = await getContract();
  await RandomBox.methods._mintRandomBox(name, price, count, picture).send({
    from: address_wallet,
  });
  return { status: "success" };
};

const getDetailRandomBox = async (pid) => {
  let { RandomBox } = await getContract();
  const { name, price, count, picture } = await RandomBox.methods
    .box(pid)
    .call();
  return {
    data: {
      name: name.toString(),
      picture: picture.toString(),
      count: count.toString(),
      price: price.toString(),
    },
  };
};
const getRandomBox = async () => {
  let { RandomBox } = await getContract();
  let jsonRandomBox = [];
  const listRandombox = await RandomBox.methods._getRandomBox().call();
  for (const [index, id] of listRandombox.entries()) {
    await getDetailRandomBox(id.toString()).then((data) => {
      jsonRandomBox.push({ ...data.data, indexNFT: id.toString() });
    });
    if (index === listRandombox.length - 1) {
      return jsonRandomBox;
    }
  }
};
const addCountRandomBox = async (indexNFT, count, address_wallet) => {
  let { RandomBox } = await getContract();
  await RandomBox.methods._addCountRandomBox(indexNFT, count).send({
    from: address_wallet,
  });
  return { status: "success" };
};
const buyRandomBox = async (
  pid,
  price,
  indexNFT,
  name,
  picture,
  address_wallet
) => {
  let { RandomBox } = await getContract();
  await RandomBox.methods._buyRandomBox(pid, indexNFT, name, picture).send({
    from: address_wallet,
    value: web3.utils.toWei(price, "ether"),
  });
  return { status: "success" };
};
const getDetailOwnerRandombox = async (pid) => {
  let { RandomBox } = await getContract();
  const {
    nft_id,
    name,
    picture,
    reward,
    type_nft,
    price,
    cost_wood,
    cost_fruit,
    energy_consumed,
    amount_food,
    seller,
  } = await RandomBox.methods.nft(pid).call();
  return {
    data: {
      nft_id: nft_id.toString(),
      name: name.toString(),
      picture: picture.toString(),
      reward: reward.toString(),
      type_nft: type_nft.toString(),
      price: price.toString(),
      cost_wood: cost_wood.toString(),
      cost_fruit: cost_fruit.toString(),
      energy_consumed: energy_consumed.toString(),
      amount_food: amount_food.toString(),
      seller: seller.toString(),
    },
  };
};
const getOwnerNFTWeb3InstanceRandombox = async (address) => {
  let { RandomBox } = await getContract();
  let jsonOwnerNFT = [];
  const listOwnerNFT = await RandomBox.methods.getNFTByOwner(address).call();
  for (const [index, id] of listOwnerNFT.entries()) {
    await getDetailOwnerRandombox(id.toString()).then((data) => {
      jsonOwnerNFT.push({ ...data.data, indexNFT: id.toString() });
    });
    if (index === listOwnerNFT.length - 1) {
      return jsonOwnerNFT;
    }
  }
};
const sellNFTWeb3InstanceRandombox = async (
  address_wallet,
  indexNFT,
  price
) => {
  let { RandomBox } = await getContract();
  await RandomBox.methods
    .sellNFT(indexNFT, price)
    .send({ from: address_wallet });
  return { status: "success" };
};

const cancleNFTWeb3InstanceRandombox = async (address_wallet, indexNFT) => {
  let { RandomBox } = await getContract();
  await RandomBox.methods.cancleNFT(indexNFT).send({ from: address_wallet });
  return { status: "success" };
};

const buyNFTWeb3InstanceRandombox = async (
  buyer_address_wallet,
  seller_address_wallet,
  indexNFT,
  price
) => {
  let { RandomBox } = await getContract();
  await RandomBox.methods.buyNFT(indexNFT, price, seller_address_wallet).send({
    from: buyer_address_wallet,

    value: web3.utils.toWei(price, "ether"),
  });
  return { status: "success" };
};
const openRandomBoxWeb3 = async (
  pid,
  name,
  picture,
  reward,
  type_nft,
  cost_wood,
  cost_fruit,
  energy_consumed,
  amount_food,
  address_wallet,
  indexNFT
) => {
  let { RandomBox } = await getContract();
  await RandomBox.methods
    ._openRandomBox(
      pid,
      name,
      picture,
      reward,
      type_nft,
      cost_wood,
      cost_fruit,
      energy_consumed,
      amount_food,
      indexNFT
    )
    .send({
      from: address_wallet,
    });
  return { status: "success" };
};
module.exports = {
  mintRandomBox,
  getRandomBox,
  addCountRandomBox,
  buyRandomBox,
  getOwnerNFTWeb3InstanceRandombox,
  sellNFTWeb3InstanceRandombox,
  getContractAddressRandomBox,
  buyNFTWeb3InstanceRandombox,
  cancleNFTWeb3InstanceRandombox,
  openRandomBoxWeb3,
};
