import { useReducer, useState } from "react";
import APIClient from "../api-client";
import authReducer, { initialState } from "../reducers/authReducer";
import { AxiosError } from "axios";

const apiClient = new APIClient("/ip/get");

const useIp = () => {
  const [error, setError] = useState<string>("");
  const [state] = useReducer(authReducer, initialState);
  const getOne = async (ip: string) => {
    setError("");
    const status = await apiClient.getOne(ip, `Bearers ${state.token}`);

    if (status instanceof AxiosError) {
      return setError(status.response?.data.error);
    }

    return status.data.result;
  };

  return { getOne, error };
};

export default useIp;
