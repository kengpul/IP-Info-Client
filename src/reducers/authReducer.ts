import { Reducer } from "react";

export enum authType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

type authAction =
  | { type: authType.LOGIN; payload: string }
  | { type: authType.LOGOUT };

const getInitialLoggedIn = () => {
  if (localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME))
    return true;
  return false;
};

const getInitialToken = () => {
  if (localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME))
    return localStorage.getItem(
      import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME
    );
  return null;
};

export const AuthInitialState: AuthState = {
  isAuthenticated: getInitialLoggedIn(),
  token: getInitialToken(),
};

const authReducer: Reducer<AuthState, authAction> = (state, action) => {
  switch (action.type) {
    case authType.LOGIN: {
      window.location.href = '/'
      localStorage.setItem(
        import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME,
        action.payload
      );
      return { ...state, isAuthenticated: true, token: action.payload };
    }
    case authType.LOGOUT: {
      window.location.href = '/'
      localStorage.removeItem(
        import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME
      );
      return { ...state, isAuthenticated: false, token: null };
    }
  }
};

export default authReducer;
