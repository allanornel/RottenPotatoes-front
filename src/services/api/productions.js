import axios from "axios";

import URL from "./api.js";

function config(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

function list(token) {
  return axios.get(`${URL}/productions/`, config(token));
}

function getProductionById(token, id) {
  return axios.get(`${URL}/productions/${id}`, config(token));
}

function watchedList(token) {
  return axios.get(`${URL}/watched/productions`, config(token));
}

const requestProductionsApi = {
  list,
  watchedList,
  getProductionById,
};

export default requestProductionsApi;
