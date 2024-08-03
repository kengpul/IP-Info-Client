import axios from "axios";
import IpInfo from "./types/IpInfo";

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
      .get<IpInfo>(this.endpoint, { headers: { Authorization: token } })
      .then((res) => res)
      .catch((err) => err);
  };

  getOne = (ip: string, token: string) => {
    return axiosInstance
      .get<IpInfo>(this.endpoint, {
        params: { ip },
        headers: { Authorization: token },
      })
      .then((res) => res)
      .catch((err) => err);
  };

  getOneFromDB = (ip: string, token: string) => {
    return axiosInstance
      .get<IpInfo>(this.endpoint + "/" + ip, {
        headers: { Authorization: token },
      })
      .then((res) => res)
      .catch((err) => err);
  };

  getAllHistory = (token: string) => {
    return axiosInstance
      .get<IpInfo[]>(this.endpoint, {
        headers: { Authorization: token },
      })
      .then((res) => res)
      .catch((err) => err);
  };
}

export default APIClient;
