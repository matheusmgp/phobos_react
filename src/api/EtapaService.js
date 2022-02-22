import { API } from "../api/config";
const url = "http://localhost:25151/api";

const getEtapasById = async function (id) {
  return API.get(`${url}/etapas/${id}`).then((response) => {
    return response;
  });
};
const getAllEtapas = async function () {
  return API.get(`${url}/etapas`).then((response) => {
    return response;
  });
};
const getAllEtapasByGrupo = async function (grupo) {
  return API.get(`${url}/etapas/grupo/${grupo}`).then((response) => {
    return response;
  });
};
const getEtapaByNome = async function (nome, grupo) {
  console.log(nome);
  console.log(grupo);
  return API.get(`${url}/etapas/getByName/${nome}/${grupo}`).then(
    (response) => {
      return response;
    }
  );
};
const updateEtapa = async function (payload) {
  console.log("updateEtapa", payload);
  return API.put(`${url}/etapas`, payload).then((response) => {
    return response;
  });
};
const createEtapa = async function (payload) {
  return API.post(`${url}/etapas`, payload).then((response) => {
    return response;
  });
};
const getAllSituacoes = async function () {
  return API.get(`${url}/tickets/ticket-situacoes`).then((response) => {
    return response;
  });
};
export const EtapaService = {
  getAllEtapas,
  getAllEtapasByGrupo,
  getAllSituacoes,
  getEtapaByNome,
  updateEtapa,
  createEtapa,
  getEtapasById,
};
