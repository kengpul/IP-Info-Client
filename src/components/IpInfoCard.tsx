import { FormEvent, useEffect, useState } from "react";
import IpInfoType from "../types/IpInfo";
import { IpInfoAction, IpInfoMethod } from "../reducers/ipInfoReducer";
import useIp from "../hooks/useIp";
import ErrorFlash from "./ErrorFlash";

interface Props {
  ipInfo: IpInfoType | null;
  setIpInfo: React.Dispatch<React.SetStateAction<IpInfoType | null>>;
  state: IpInfoType[];
  dispatch: React.Dispatch<IpInfoAction>;
}

const IpInfoCard = ({ ipInfo, setIpInfo, state, dispatch }: Props) => {
  const [ip, setIp] = useState<string>("");

  const { getOne, getInitialIp, getOneFromDB, error } = useIp();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const status = await getOne(ip);
    if (state.some((item) => item.ip === status.ip)) {
      return handleGetIpDetails(ip);
    }

    if (!error) {
      setIpInfo(status);
      dispatch({
        type: IpInfoMethod.ADD,
        payload: status,
      });
    }
  };

  const handleGetIpDetails = async (ip: string) => {
    const status = await getOneFromDB(ip);
    setIpInfo(status.data.result);
  };

  useEffect(() => {
    const getMyIp = async () => {
      const status = await getInitialIp();
      if (!error) {
        setIp(status.data.result.ip);
        setIpInfo(status.data.result);
      }
    };

    getMyIp();
  }, []);

  return (
    <div className="w-full xl:max-w-max lg:w-1/3 h-auto md:h-96 bg-slate-700 p-5 rounded-lg">
      <form className="flex gap-1" onSubmit={handleSearch}>
        <input
          type="text"
          className="w-full p-3 border border-slate-900 rounded-lg bg-slate-700 text-white text-xl font-bold"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button className="bg-green-700 px-4 py-2 font-semibold rounded-md hover:bg-green-800 hover:text-slate-400 text-white">
          Lookup
        </button>
      </form>

      {error && <ErrorFlash message={error} />}

      {!error && (
        <ul className="my-5 leading-7 text-xl">
          <li className="font-semibold text-white">
            ip: <span className="text-green-600"> {ipInfo?.ip}</span>
          </li>
          <li className="font-semibold text-white">
            City: <span className="text-green-600"> {ipInfo?.city} </span>
          </li>
          <li className="font-semibold text-white">
            country: <span className="text-green-600"> {ipInfo?.country} </span>
          </li>
          <li className="font-semibold text-white">
            hostname:{" "}
            <span className="text-green-600"> {ipInfo?.hostname} </span>
          </li>
          <li className="font-semibold text-white">
            loc: <span className="text-green-600"> {ipInfo?.loc} </span>
          </li>
          <li className="font-semibold text-white">
            org: <span className="text-green-600"> {ipInfo?.org} </span>
          </li>
          <li className="font-semibold text-white">
            postal: <span className="text-green-600"> {ipInfo?.postal} </span>
          </li>
          <li className="font-semibold text-white">
            region: <span className="text-green-600"> {ipInfo?.region} </span>
          </li>
          <li className="font-semibold text-white">
            timezone:{" "}
            <span className="text-green-600"> {ipInfo?.timezone} </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default IpInfoCard;
