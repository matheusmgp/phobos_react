import { API } from "../api/config";
const url = "http://localhost:25151/api";

const getUserAD = async function () {
  return API.get(`${url}/user/usuario-logado`).then((response) => {
    return response;
  });
};

export const UserService = {
  getUserAD,
};
