import { useReducer } from "react";
import Home from "./pages/Home";
import authReducer, { AuthInitialState } from "./reducers/authReducer";
import Login from "./pages/Login";

function App() {
  const [state] = useReducer(authReducer, AuthInitialState);
  return (
    <>
      <div className="w-screen h-screen flex justify-center items-center">
        {state.isAuthenticated ? <Home /> : <Login />}
      </div>
    </>
  );
}

export default App;
