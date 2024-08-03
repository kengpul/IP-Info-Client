import { useReducer, useState } from "react";
import APIClient from "../api-client";
import authReducer, { initialState } from "../reducers/authReducer";
import { AxiosError } from "axios";

const apiClientGetOn = new APIClient("/ip/get");
const apiClientGetInitial = new APIClient("/ip/initial");
const apiClientGetAllHistory = new APIClient("/ip/history");

const useIp = () => {
  const [error, setError] = useState<string>("");
  const [state] = useReducer(authReducer, initialState);

  const token = `Bearers ${state.token}`;

  const getInitialIp = async () => apiClientGetInitial.getInitialIp(token);

  const getOne = async (ip: string) => {
    setError("");
    const status = await apiClientGetOn.getOne(ip, token);

    if (status instanceof AxiosError) {
      return setError(status.response?.data.error);
    }

    return status.data.result;
  };

  const getAllHistory = async () =>
    await apiClientGetAllHistory.getAllHistory(token);

  return { getOne, getInitialIp, getAllHistory, error };
};

export default useIp;
