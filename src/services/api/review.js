import axios from "axios";

import URL from "./api.js";

function config(token) {
  return { headers: { authorization: `Bearer ${token}` } };
}

function insertReview(token, id, body) {
  return axios.post(`${URL}/review/${id}`, body, config(token));
}

const requestReviewApi = {
  insertReview,
};

export default requestReviewApi;
