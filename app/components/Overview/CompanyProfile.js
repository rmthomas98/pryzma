import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";
import Image from "next/image";
import profile from "../../static/images/profile.svg";

// this function is what will fetch the data
const getCompanyProfile = async (symbol) => {
  const response = await axios.get(
    `https://cloud.iexapis.com/stable/stock/${symbol}/company?token=pk_ca6a1d7ec33745b1bfeb585df0bbf978`
  );
  return response.data;
};

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
      const profileData = await getCompanyProfile(symbol[0]);
      if (profileData) {
        // set the data so we can map it out to the user
        setData(profileData);
        // set the company profile to loaded so the main component
        // knows when it can show everything together
        // and stop the skeleton loader
        setCompanyProfile(true);
      }
    };
    getData();
  }, [symbol]);



  if (!data) return "";

  return (
    <div className="w-full mr-4">
      <p className="p-4 pl-0 text-gray-800 font-semibold text-xl flex items-center">
        <Image src={profile} height={30} width={30} />
        <span className="ml-4">Company Profile</span>
      </p>
      <div className="rounded-lg shadow-lg shadow-gray-400/75 bg-gray-100 max-h-[524px] h-screen overflow-auto scrollbar-hide">
        <p className="flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
          Basic company information
        </p>
        <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900  text-xs w-24">Symbol</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.symbol}</p>
          </div>
          <div className="flex bg-gray-200 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Exchange</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.exchange}</p>
          </div>
          <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Company</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.companyName}</p>
          </div>
          <div className="flex bg-gray-200 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Industry</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.industry}</p>
          </div>
          <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Sector</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.sector}</p>
          </div>
          <div className="flex bg-gray-200 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Website</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.website}</p>
          </div>
          <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Employees</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.employees ? data.employees.toLocaleString('en-us') : '-'}</p>
          </div>
          <div className="flex bg-gray-200 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Country</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.country}</p>
          </div>
          <div className="flex bg-gray-100 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">City</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.city}</p>
          </div>
          <div className="flex bg-gray-200 p-3 pl-4 items-center">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Address</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.address}</p>
          </div>
          <div className="flex bg-gray-100 p-3 pl-4">
          <p className="font-semibold text-gray-900 text-xs w-24 min-w-[96px]">Description</p>
          <p className="text-xs font-medium text-gray-800 leading-5">{data.description}</p>
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
