import { FormEvent, useState } from "react";
import useAuthenticate from "../hooks/useAuthenticate";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { login, error } = useAuthenticate();


  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    login(email, password);
  };

  return (
      <div className="w-full md:w-1/3 mx-5 md:mx-0 bg-slate-100 p-5 rounded-lg">
        <h2 className="text-4xl font-semibold">Log in to your account</h2>
        {error && <p className="bg-red-300 p-3 mt-5 rounded-md">{error}</p>}
        <form onSubmit={handleLogin} className="mt-5">
          <div>
            <label htmlFor="email" className="font-semibold text-xl">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-slate-900 rounded-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="my-7">
            <label
              htmlFor="password"
              id="password"
              className="font-semibold text-xl"
            >
              Your Password
            </label>
            <input
              type="password"
              className="w-full p-3 border border-slate-900 rounded-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="my-7">
            <button className="w-full bg-blue-500 text-white py-4 hover:bg-blue-700 font-bold rounded-lg">
              Log in
            </button>
          </div>
        </form>
      </div>
  );
};

export default Login;
