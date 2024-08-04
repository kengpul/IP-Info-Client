import { useEffect } from "react";
import useIp from "../hooks/useIp";
import { IpInfoAction, IpInfoMethod } from "../reducers/ipInfoReducer";
import IpInfoType from "../types/IpInfo";

interface Props {
  setIpInfo: React.Dispatch<React.SetStateAction<IpInfoType | null>>;
  state: IpInfoType[];
  dispatch: React.Dispatch<IpInfoAction>;
}

const IpHistoryCard = ({ setIpInfo, state, dispatch }: Props) => {
  const { getAllHistory, getOneFromDB, error } = useIp();

  const handleGetIpDetails = async (ip: string) => {
    const status = await getOneFromDB(ip);
    setIpInfo(status.data.result);
  };

  useEffect(() => {
    const getHistories = async () => {
      const status = await getAllHistory();
      if (!error) {
        dispatch({ type: IpInfoMethod.GET, payload: status.data.result });
      }
    };
    getHistories();
  }, []);

  return (
    <div className="w-full md:w-1/5 h-96 bg-slate-700 p-5 rounded-lg xl:max-w-max">
      <h3 className="text-2xl text-white font-semibold mb-5">History</h3>
      <div className="overflow-y-scroll h-72">
        <ul>
          {state.length &&
            state.map((history) => (
              <li
                className="text-green-500 cursor-pointer hover:text-green-700"
                key={history.ip}
                onClick={() => handleGetIpDetails(history.ip)}
              >
                {history.ip}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default IpHistoryCard;
