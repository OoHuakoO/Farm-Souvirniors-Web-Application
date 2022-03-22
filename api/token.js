import Axios from "axios";
import Config from "../config";
const withdrawTokenAPI = async (address_wallet, value, type) => {
  const response = await Axios.post(
    `${Config.apiBaseURL}/token/withdrawToken`,
    {
      address_wallet,
      value,
      type,
    }
  );
  return response.data;
};
const depositTokenAPI = async (address_wallet, value, type) => {
  const response = await Axios.post(`${Config.apiBaseURL}/token/depositToken`, {
    address_wallet,
    value,
    type,
  });
  return response.data;
};
const checkResource = async (address_wallet, value, type) => {
  const response = await Axios.post(
    `${Config.apiBaseURL}/token/check-resource`,
    {
      address_wallet,
      value,
      type,
    }
  );
  return response.data;
};
module.exports = {
  withdrawTokenAPI,
  depositTokenAPI,
  checkResource,
};
