import Axios from "axios";
import Config from "../config";
const buyNFT = async (buyer_address_wallet, seller_address_wallet, nft_id) => {
  const response = await Axios.post(
    `${Config.apiBaseURL}/marketplace/buy-nft`,
    {
      buyer_address_wallet,
      seller_address_wallet,
      nft_id,
    }
  );
  return response.data;
};
const sellNFT = async (price, nft_id) => {
  const response = await Axios.post(
    `${Config.apiBaseURL}/marketplace/sell-nft`,
    {
      price,
      nft_id,
    }
  );
  return response.data;
};
const cancleNFT = async (nft_id) => {
  const response = await Axios.post(
    `${Config.apiBaseURL}/marketplace/cancle-nft`,
    {
      nft_id,
    }
  );
  return response.data;
};

module.exports = {
  buyNFT,
  sellNFT,
  cancleNFT
};
