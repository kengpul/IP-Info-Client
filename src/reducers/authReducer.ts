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

export const initialState: AuthState = {
  isAuthenticated: getInitialLoggedIn(),
  token: getInitialToken(),
};

const authReducer = (state: AuthState, action: authAction) => {
  switch (action.type) {
    case authType.LOGIN: {
      localStorage.setItem(
        import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME,
        action.payload
      );
      return { ...state, isAuthenticated: true, token: action.payload };
    }
    case authType.LOGOUT: {
      localStorage.removeItem(
        import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME
      );
      return { ...state, isAuthenticated: false };
    }
  }
};

export default authReducer;
