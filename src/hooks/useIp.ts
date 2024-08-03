import { useReducer, useState } from "react";
import APIClient from "../api-client";
import authReducer, { initialState } from "../reducers/authReducer";
import { AxiosError } from "axios";

const apiClientGetOne = new APIClient("/ip/get");
const apiClientGetOneFromDB = new APIClient("/ip/history");
const apiClientGetInitial = new APIClient("/ip/initial");
const apiClientGetAllHistory = new APIClient("/ip/history");

const useIp = () => {
  const [error, setError] = useState<string>("");
  const [state] = useReducer(authReducer, initialState);
  const token = `Bearers ${state.token}`;

  const getInitialIp = async () => apiClientGetInitial.getInitialIp(token);

  const getOne = async (ip: string) => {
    setError("");
    const status = await apiClientGetOne.getOne(ip, token);
    if (status instanceof AxiosError) {
      return setError(status.response?.data.error);
    }
    return status.data.result;
  };

  const getAllHistory = async () =>
    await apiClientGetAllHistory.getAllHistory(token);

  const getOneFromDB = async (ip: string) =>
    await apiClientGetOneFromDB.getOneFromDB(ip, token);

  return { getOne, getInitialIp, getAllHistory, getOneFromDB, error };
};

export default useIp;
