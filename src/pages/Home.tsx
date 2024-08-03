import { FormEvent, useEffect, useState } from "react";
import useIp from "../hooks/useIp";
import IpInfo from "../types/IpInfo";

const Home = () => {
  const [ipInfo, setIpInfo] = useState<IpInfo | null>(null);
  const [ip, setIp] = useState<string>("");

  useEffect(() => {
    // call get initial IP
  }, [])

  const { getOne, error } = useIp();

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    const status = await getOne(ip);
    if (!error) setIpInfo(status);
  };

  return (
    <div className="w-full md:w-1/3 mx-5 md:mx-0 bg-slate-100 p-5 rounded-lg">
      <form className="flex gap-1" onSubmit={handleSearch}>
        <input
          type="text"
          className="w-full p-3 border border-slate-900 rounded-lg"
          value={ip}
          onChange={(e) => setIp(e.target.value)}
        />
        <button className="bg-blue-500 px-5 py-2 font-semibold rounded-md hover:bg-blue-700">
          Search
        </button>
      </form>

      {error && <p className="bg-red-300 p-3 mt-5 rounded-md">{error}</p>}

      <ul className="my-5 leading-7 text-xl">
        <li className="font-semibold">
          ip: <span className="text-green-600"> {ipInfo?.ip}</span>
        </li>
        <li className="font-semibold">
          City: <span className="text-green-600"> {ipInfo?.city} </span>
        </li>
        <li className="font-semibold">
          country: <span className="text-green-600"> {ipInfo?.country} </span>
        </li>
        <li className="font-semibold">
          hostname: <span className="text-green-600"> {ipInfo?.hostname} </span>
        </li>
        <li className="font-semibold">
          loc: <span className="text-green-600"> {ipInfo?.loc} </span>
        </li>
        <li className="font-semibold">
          org: <span className="text-green-600"> {ipInfo?.org} </span>
        </li>
        <li className="font-semibold">
          postal: <span className="text-green-600"> {ipInfo?.postal} </span>
        </li>
        <li className="font-semibold">
          region: <span className="text-green-600"> {ipInfo?.region} </span>
        </li>
        <li className="font-semibold">
          timezone: <span className="text-green-600"> {ipInfo?.timezone} </span>
        </li>
      </ul>
    </div>
  );
};

export default Home;
