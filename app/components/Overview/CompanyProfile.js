import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";
import Image from "next/image";
import profile from "../../static/images/profile.svg";

const CompanyProfile = ({ setCompanyProfile, isLoading }) => {
  // get symbol from context provider
  const { symbol } = useContext(SymbolContext);

  // this state will hold the company profile data
  // the data that we will map through and display to the user
  const [data, setData] = useState();

  // this will call the function above on component load to fetch
  // the company profile data
  // it is set to run everytime the symbol changes
  useEffect(() => {
    const getData = async () => {
      // check if there is a symbol
      if (!symbol) return;
      // we set the company profile to false
      // so we can show they skeleton loading
      setCompanyProfile(false);
      setData();
      const response = await axios.post('/api/get-company-profile', {symbol: symbol[0]});
      if (response) {
        // set the data so we can map it out to the user
        setData(response.data);
        // set the company profile to loaded so the main component
        // knows when it can show everything together
        // and stop the skeleton loader
        setCompanyProfile(true);
      }
    };
    getData();
  }, [symbol]);

  if (isLoading || !data) return <div>profile is loading</div>;

  return (
    <div className="w-full mr-8">
      {/* <p className="p-4 pl-0 text-gray-800 font-semibold text-xl flex items-center">
        <Image src={profile} height={30} width={30} />
        <span className="ml-4">Company Profile</span>
      </p> */}
      <div className="rounded-md shadow-lg shadow-gray-400/50 bg-gray-100 max-h-[364px] h-screen overflow-auto scrollbar-hide">
        <p className="items-center flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
          <Image src={profile} height={20} width={20} />
          <span className="ml-3">Company Profile</span>
        </p>
        <div className="flex bg-gray-300 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24">Symbol</p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.symbol}
          </p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Exchange
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.exchange}
          </p>
        </div>
        <div className="flex bg-gray-300 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Company
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.companyName}
          </p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Industry
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.industry}
          </p>
        </div>
        <div className="flex bg-gray-300 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Sector
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.sector}
          </p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Website
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.website}
          </p>
        </div>
        <div className="flex bg-gray-300 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Employees
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.employees ? data.employees.toLocaleString("en-us") : "-"}
          </p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Country
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.country}
          </p>
        </div>
        <div className="flex bg-gray-300 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            City
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.city}
          </p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Address
          </p>
          <p className="text-xs font-semibold text-gray-800 truncate">
            {data.address}
          </p>
        </div>
        <div className="flex bg-gray-300 p-3 pl-4">
          <p className="font-bold text-gray-900 text-xs w-24 min-w-[96px]">
            Description
          </p>
          <p className="text-xs font-semibold text-gray-800 leading-5">
            {data.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;

{
  /* <div className="flex p-4">
    <div className="w-full">
      <div></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900 mr-2">Symbol</p><p>{data.symbol}</p></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900 mr-2">Exchange</p><p>{data.exchange}</p></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900 mr-2">Company Name</p><p>{data.companyName}</p></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900 mr-2">Industry</p><p>{data.industry}</p></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900 mr-2">Sector</p><p>{data.sector}</p></div>
    </div>
    <div className="w-full">
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900">Website</p><a href={`https://${data.website}`} target="_blank" rel="noreferrer">{data.website}</a></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900">Employees</p><p>{data.employees}</p></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900">Address</p><p>{data.address}</p></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900">City</p><p>{data.city}</p></div>
      <div className="w-fit flex text-sm"><p className="font-semibold text-gray-900">Country</p><p>{data.country}</p></div>
    </div>
    </div> */
}