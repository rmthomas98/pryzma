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
      const response = await axios.post("/api/get-company-profile", {
        symbol: symbol[0],
      });
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
      {/* <p className="p-4 pl-0 text-zinc-400 font-medium text-xl flex items-center">
        <Image src={profile} height={30} width={30} />
        <span className="ml-4">Company Profile</span>
      </p> */}
      <div className="rounded-mdoverflow-auto scrollbar-hide">
        <p className="items-center flex p-2 pl-0 text-lg font-medium text-zinc-200 border-b border-zinc-800">
          <span>Company Profile</span>
        </p>
        <div className="flex">
          <div className="mr-12">
            <div className="flex py-2 items-center border-b border-zinc-800 justify-between">
              <p className="font-medium text-zinc-200 text-xs">Symbol</p>
              <p className="text-xs font-medium text-zinc-400 truncate">
                {data.symbol ? data.symbol : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center border-b border-zinc-800 justify-between">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Exchange
              </p>
              <p className="text-xs font-medium text-zinc-400 truncate justify-between">
                {data.exchange ? data.exchange : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Company
              </p>
              <p className="text-xs font-medium text-zinc-400 truncate">
                {data.companyName ? data.companyName : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Industry
              </p>
              <p className="text-xs text-zinc-400 truncate">
                {data.industry ? data.industry : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Sector
              </p>
              <p className="text-xs text-zinc-400 truncate">
                {data.sector ? data.sector : "-"}
              </p>
            </div>
          </div>
          <div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Website
              </p>
              <p className="text-xs font-medium text-zinc-400 truncate">
                {data.website ? data.website : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Employees
              </p>
              <p className="text-xs font-medium text-zinc-400 truncate">
                {data.employees ? data.employees.toLocaleString("en-us") : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Country
              </p>
              <p className="text-xs font-medium text-zinc-400 truncate">
                {data.country ? data.country : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                City
              </p>
              <p className="text-xs font-medium text-zinc-400 truncate">
                {data.city ? data.city : "-"}
              </p>
            </div>
            <div className="flex py-2 items-center justify-between border-b border-zinc-800">
              <p className="font-medium text-zinc-200 text-xs min-w-[96px]">
                Address
              </p>
              <p className="text-xs font-medium text-zinc-400 truncate">
                {data.address ? data.address : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex py-2 mt-4">
          <p className="text-xs text-zinc-400 leading-5">
            {data.description ? data.description : ""}
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
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200 mr-2">Symbol</p><p>{data.symbol}</p></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200 mr-2">Exchange</p><p>{data.exchange}</p></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200 mr-2">Company Name</p><p>{data.companyName}</p></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200 mr-2">Industry</p><p>{data.industry}</p></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200 mr-2">Sector</p><p>{data.sector}</p></div>
    </div>
    <div className="w-full">
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200">Website</p><a href={`https://${data.website}`} target="_blank" rel="noreferrer">{data.website}</a></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200">Employees</p><p>{data.employees}</p></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200">Address</p><p>{data.address}</p></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200">City</p><p>{data.city}</p></div>
      <div className="w-fit flex text-sm"><p className="font-medium text-zinc-200">Country</p><p>{data.country}</p></div>
    </div>
    </div> */
}
