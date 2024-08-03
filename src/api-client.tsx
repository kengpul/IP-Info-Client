import axios from "axios";
import { useReducer } from "react";
import authReducer, { initialState } from "./reducers/authReducer";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

class APIClient {
  enpoint: string;

  constructor(endpoint: string) {
    this.enpoint = endpoint;
  }

  login = (email: string, password: string) => {
    return axiosInstance
      .post(this.enpoint, { email, password })
      .then((res) => res)
      .catch((err) => err);
  };

  getOne = (ip: string, token: string) => {
    return axiosInstance
      .get(this.enpoint, {
        params: { ip },
        headers: { Authorization: token },
      })
      .then((res) => res)
      .catch((err) => err);
  };
}

export default APIClient;
