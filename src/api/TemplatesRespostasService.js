import { API } from "./config";
const url = "http://localhost:25151/api";

const getAllTemplatesResposta = async function () {
  return API.get(`${url}/templates`).then((response) => {
    return response;
  });
};

const updateTemplate = async function (payload) {
  return API.put(`${url}/templates`, payload).then((response) => {
    return response;
  });
};

const createTemplate = async function (payload) {
  return API.post(`${url}/templates`, payload).then((response) => {
    return response;
  });
};

const deleteTemplate = async function (id) {
  return API.delete(`${url}/templates/${id}`).then((response) => {
    return response;
  });
};
export const TemplateRespostaService = {
  getAllTemplatesResposta,
  updateTemplate,
  createTemplate,
  deleteTemplate,
};
