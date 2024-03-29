import Axios from "axios";
import Config from "../config";
const getOwnerNFTAPI = async (address_wallet) => {
  const response = await Axios.get(
    `${Config.apiBaseURL}/owner-nft/get-owner-nft/${address_wallet}`
  );
  return response.data;
};

module.exports = {
  getOwnerNFTAPI,
};
