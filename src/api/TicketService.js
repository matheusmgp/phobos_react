import { API } from "./config";
const url = "http://localhost:25151/api";

const getAllTickets = async function (group, onlyProjects) {
  return API.get(
    `${url}/tickets/tickets-by-group/${group}/onlyProjects/${onlyProjects}`
  ).then((response) => {
    return response;
  });
};

export const TicketService = {
  getAllTickets,
};
