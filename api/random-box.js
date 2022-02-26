import Axios from "axios";
import Config from "../config";
const openRandomBox = async (address_wallet) => {
  const response = await Axios.post(
    `${Config.apiBaseURL}/random-box/open-randombox`
  );
  return response.data;
};

module.exports = {
  openRandomBox
};
