import Axios from "axios";
import Config from "../config";
const Login = async (address_wallet) => {
  const response = await Axios.post(`${Config.apiBaseURL}/user/save-user`, {
    address_wallet,
  });
  return response.data;
};
const addEnergy = async (address_wallet, meat) => {
  const response = await Axios.post(`${Config.apiBaseURL}/user/add-energy`, {
    address_wallet,
    meat,
  });
  return response.data;
};
const getDataUser = async (address_wallet) => {
  const response = await Axios.get(
    `${Config.apiBaseURL}/user/get-user/${address_wallet}`
  );
  return response.data;
};
module.exports = {
  Login,
  addEnergy,
  getDataUser,
};
