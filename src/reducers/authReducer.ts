export enum authType {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface AuthState {
  isAuthenticated: boolean;
}

type authAction =
  | { type: authType.LOGIN; payload: string }
  | { type: authType.LOGOUT };

const getInitialLoggedIn = () => {
  if (localStorage.getItem(import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME))
    return true;
  return false;
};

export const initialState: AuthState = {
  isAuthenticated: getInitialLoggedIn(),
};

const authReducer = (state: AuthState, action: authAction) => {
  switch (action.type) {
    case authType.LOGIN: {
      localStorage.setItem(
        import.meta.env.VITE_LOCAL_STORAGE_USER_TOKEN_NAME,
        action.payload
      );
      return { ...state, isAuthenticated: true };
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
