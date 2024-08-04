import { useReducer } from "react";
import authReducer, {
    AuthInitialState,
    authType,
} from "../reducers/authReducer";

const LogoutButton = () => {
  const [, authDispatch] = useReducer(authReducer, AuthInitialState);
  return (
    <div className="absolute bottom-5 md:top-5 right-5">
      <button
        className="bg-red-500 py-2 px-5 rounded-md text-white font-semibold hover:bg-red-600 hover:text-slate-200"
        onClick={() => authDispatch({ type: authType.LOGOUT })}
      >
        Log out
      </button>
    </div>
  );
};

export default LogoutButton;
