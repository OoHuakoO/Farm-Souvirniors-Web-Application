import Axios from "axios";
import Config from "../config";
const getInfoNFT = async () => {
  const response = await Axios.get(`${Config.apiBaseURL}/in-game/info-nft`);
  return response.data;
};
const craftNFTAPI = async (
  pid,
  name,
  picture,
  reward,
  type,
  cost,
  energy_consumed,
  amount_food,
  address_wallet
) => {
  const response = await Axios.post(`${Config.apiBaseURL}/in-game/craft-nft`, {
    pid,
    name,
    picture,
    reward,
    type,
    cost,
    energy_consumed,
    amount_food,
    address_wallet,
  });
  return response.data;
};

const checkResource = async (cost, address_wallet) => {
  const response = await Axios.post(`${Config.apiBaseURL}/in-game/check-resource`, {
    cost,
    address_wallet,
  });
  return response.data;
};

module.exports = {
  getInfoNFT,
  craftNFTAPI,
  checkResource
};
