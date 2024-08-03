import { AxiosError } from "axios";
import APIClient from "../api-client";
import { useReducer, useState } from "react";
import authReducer, { authType, initialState } from "../reducers/authReducer";

const apiClient = new APIClient("/user/login");

const useAuthenticate = () => {
  const [error, setError] = useState<string>("");
  const [state, dispatch] = useReducer(authReducer, initialState);

  const login = async (email: string, password: string) => {
    setError("");
    const status = await apiClient.login(email, password);

    if (status instanceof AxiosError) {
      setError(status.response?.data);
    } else {
      dispatch({
        type: authType.LOGIN,
        payload: status.data.token,
      });
    }
  };

  const logout = () => {
    dispatch({ type: authType.LOGOUT });
  };

  return { login, logout, error, isAuthenticated: state.isAuthenticated };
};

export default useAuthenticate;
