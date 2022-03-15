import Axios from "axios";
import Config from "../config";
const openRandomBoxAPI = async (pid, address_wallet, name) => {
  const response = await Axios.post(
    `${Config.apiBaseURL}/randombox/open-randombox`,
    {
      pid,
      address_wallet,
      name,
    }
  );
  return response.data;
};
const getOneInfoNFT = async (name) => {
  const response = await Axios.get(
    `${Config.apiBaseURL}/randombox/get-one-info-nft/${name}`
  );
  return response.data;
};
module.exports = {
  openRandomBoxAPI,
  getOneInfoNFT,
};
