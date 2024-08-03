import axios from "axios";
import { useReducer } from "react";
import authReducer, { initialState } from "./reducers/authReducer";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

class APIClient {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  login = (email: string, password: string) => {
    return axiosInstance
      .post(this.endpoint, { email, password })
      .then((res) => res)
      .catch((err) => err);
  };

  getInitialIp = (token: string) => {
    return axiosInstance
      .get(this.endpoint, { headers: { Authorization: token } })
      .then((res) => res)
      .catch((err) => err);
  };

  getOne = (ip: string, token: string) => {
    return axiosInstance
      .get(this.endpoint, {
        params: { ip },
        headers: { Authorization: token },
      })
      .then((res) => res)
      .catch((err) => err);
  };
}

export default APIClient;
