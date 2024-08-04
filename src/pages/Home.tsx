import { useReducer, useState } from "react";
import IpHistoryCard from "../components/IpHistoryCard";
import IpInfoCard from "../components/IpInfoCard";
import ipInfoReducer from "../reducers/ipInfoReducer";
import IpInfo from "../types/IpInfo";
import LogoutButton from "../components/LogoutButton";

const Home = () => {
  const initialState: IpInfo[] = [];
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [state, dispatch] = useReducer(ipInfoReducer, initialState);

  return (
    <div className="w-full flex justify-center flex-col md:flex-row gap-2 mt-14 mx-5 lg:mx-0">
      <IpInfoCard
        state={state}
        dispatch={dispatch}
        ipInfo={ipInfo}
        setIpInfo={setIpInfo}
      />

      <IpHistoryCard
        state={state}
        dispatch={dispatch}
        setIpInfo={setIpInfo}
      />

      <LogoutButton />
    </div>
  );
};

export default Home;
