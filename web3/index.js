import Web3 from "web3";
import NFTContractBuild from "contracts/NFT.json";
import RandomBoxContractBuild from "contracts/NFT.json";
let NFT;
let RandomBox;
// Development
// const web3 = new Web3("http://127.0.0.1:7545");
// Testnet Ropsten
const web3 = new Web3(
  Web3.givenProvider ||
    "https://ropsten.infura.io/v3/b0f95459c5a149cc9032a56d32fd1bdf"
);

const getContract = async () => {
  const netId = await web3.eth.net.getId();
  NFT = new web3.eth.Contract(
    NFTContractBuild.abi,
    NFTContractBuild.networks[netId].address
  );
  RandomBox = new web3.eth.Contract(
    RandomBoxContractBuild.abi,
    RandomBoxContractBuild.networks[netId].address
  );
};
getContract();
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
    .send({ from: address_wallet, gas: 5500000 });
  return { status: "success" };
};

const getDetailNFT = async (pid) => {
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
const getOwnerNft = async (address) => {
  let jsonOnwerNFT = [];
  const listOwnerNFT = await NFT.methods.getNFTByOwner(address).call();
  for (const [index, id] of listOwnerNFT.entries()) {
    await getDetailNFT(id.toString()).then((data) => {
      jsonOnwerNFT.push({ ...data.data, indexNFT: id.toString() });
    });
    if (index === listOwnerNFT.length - 1) {
      return jsonOnwerNFT;
    }
  }
};

const sellNFT = async (address_wallet, indexNFT, price) => {
  await NFT.methods
    .sellNFT(indexNFT, price)
    .send({ from: address_wallet, gas: 5500000 });
  return { status: "success" };
};

const cancleNFT = async (address_wallet, indexNFT) => {
  await NFT.methods
    .cancleNFT(indexNFT)
    .send({ from: address_wallet, gas: 5500000 });
  return { status: "success" };
};

const buyNFT = async (
  buyer_address_wallet,
  seller_address_wallet,
  indexNFT,
  price
) => {
  await NFT.methods.buyNFT(indexNFT, price, seller_address_wallet).send({
    from: buyer_address_wallet,
    gas: 5500000,
    value: web3.utils.toWei(price, "ether"),
  });
  return { status: "success" };
};

const getContractAddress = async () => {
  return NFT._address;
};

const mintRandomBox = async (address_wallet, name, price, count, picture) => {
  await RandomBox.methods._mintRandomBox(name, price, count, picture).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};

const getDetailRandomBox = async (pid) => {
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
  await RandomBox.methods._addCountRandomBox(indexNFT, count).send({
    from: address_wallet,
    gas: 5500000,
  });
  return { status: "success" };
};
module.exports = {
  getContract,
  craftNFTWeb3,
  getDetailNFT,
  getOwnerNft,
  sellNFT,
  buyNFT,
  getContractAddress,
  cancleNFT,
  mintRandomBox,
  getRandomBox,
  addCountRandomBox,
};