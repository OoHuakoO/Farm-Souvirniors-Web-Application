import Axios from "axios";
import Config from "../config";
const getInfoNFT = async () => {
  const response = await Axios.get(`${Config.apiBaseURL}/in-game/info-nft`);
  return response.data;
};
const CraftNFT = async (
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
module.exports = {
  getInfoNFT,
  CraftNFT,
};
