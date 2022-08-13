import axios from "axios";

import URL from "./api.js";

function config(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

function toggleWatched(token, id) {
  return axios.post(`${URL}/watched/${id}`, {}, config(token));
}

const requestWatchedApi = {
  toggleWatched,
};

export default requestWatchedApi;
