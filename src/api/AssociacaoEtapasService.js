import { API } from "../api/config";
const url = "http://localhost:25151/api";

const getAllAssociacaoEtapa = async function (id) {
  return API.get(`${url}/associacoes/grupo/${id}`).then((response) => {
    return response;
  });
};

const getAssociacaoEtapaByGrupo = async function (xmonId, grupoid, id) {
  console.log("id", id);
  return API.get(
    `${url}/associacoes/getByGrupoId?xmonId=${xmonId}&grupoId=${grupoid}&id=${id}`
  ).then((response) => {
    return response;
  });
};

const updateAssociacao = async function (payload) {
  return API.put(`${url}/associacoes`, payload).then((response) => {
    return response;
  });
};

const createAssociacao = async function (payload) {
  return API.post(`${url}/associacoes`, payload).then((response) => {
    return response;
  });
};

const deleteAssociacao = async function (id) {
  return API.delete(`${url}/associacoes/${id}`).then((response) => {
    return response;
  });
};
export const AssociacaoEtapaService = {
  getAllAssociacaoEtapa,
  updateAssociacao,
  createAssociacao,
  deleteAssociacao,
  getAssociacaoEtapaByGrupo,
};
