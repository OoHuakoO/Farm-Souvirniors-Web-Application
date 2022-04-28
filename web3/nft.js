import { getContract } from "./index.js";
import Config from "../config";
import Web3 from "web3";
const web3 = new Web3(Web3.givenProvider || Config.web3ProviderGanache);
const craftNFTWeb3 = async (
  pid,
  name,
  picture,
  reward,
  type_nft,
  cost_wood,
  cost_fruit,
  energy_consumed,
  amount_food,
  address_wallet
) => {
  let { NFT } = await getContract();
  await NFT.methods
    ._craftNFT(
      pid,
      name,
      picture,
      reward,
      type_nft,
      cost_wood,
      cost_fruit,
      energy_consumed,
      amount_food
    )
    .send({ from: address_wallet });

  return { status: "success" };
};

const getDetailNFT = async (pid) => {
  let { NFT } = await getContract();
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
  } = await NFT.methods.nft(pid).call();
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
const getOwnerNftWeb3 = async (address) => {
  let { NFT } = await getContract();
  let jsonOwnerNFT = [];
  const listOwnerNFT = await NFT.methods.getNFTByOwner(address).call();
  for (const [index, id] of listOwnerNFT.entries()) {
    await getDetailNFT(id.toString()).then((data) => {
      jsonOwnerNFT.push({ ...data.data, indexNFT: id.toString() });
    });
    if (index === listOwnerNFT.length - 1) {
      return jsonOwnerNFT;
    }
  }
};

const sellNFTWeb3 = async (address_wallet, indexNFT, price) => {
  let { NFT } = await getContract();
  await NFT.methods
    .sellNFT(indexNFT, price)
    .send({ from: address_wallet});
  return { status: "success" };
};

const cancleNFTWeb3 = async (address_wallet, indexNFT) => {
  let { NFT } = await getContract();
  await NFT.methods
    .cancleNFT(indexNFT)
    .send({ from: address_wallet });
  return { status: "success" };
};

const buyNFTWeb3 = async (
  buyer_address_wallet,
  seller_address_wallet,
  indexNFT,
  price
) => {
  let { NFT } = await getContract();
  await NFT.methods.buyNFT(indexNFT, price, seller_address_wallet).send({
    from: buyer_address_wallet,
    value: web3.utils.toWei(price, "ether"),
  });
  return { status: "success" };
};

const getContractAddressNFT = async () => {
  let { NFT } = await getContract();
  return NFT._address;
};

module.exports = {
  getContract,
  craftNFTWeb3,
  getOwnerNftWeb3,
  sellNFTWeb3,
  buyNFTWeb3,
  getContractAddressNFT,
  cancleNFTWeb3,
};
