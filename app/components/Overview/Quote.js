import quote from "../../static/images/check.svg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";

// this function is what will fetch the data
const getQuote = async (symbol) => {
  const response = await axios.get(
    `https://cloud.iexapis.com/stable/stock/${symbol}/quote?displayPercent=true&token=pk_ca6a1d7ec33745b1bfeb585df0bbf978`
  );
  return response.data;
};

const Quote = ({ setQuote, isLoading }) => {
  // get symbol from context provider
  const { symbol } = useContext(SymbolContext);

  // this state will hold the price data
  // the data that we will map through and display to the user
  const [data, setData] = useState();

  // this will call the function above on component load to fetch
  // the company profile data
  // it is set to run everytime the symbol changes
  useEffect(() => {
    const getData = async () => {
      // check if there is a symbol
      if (!symbol) return;
      const quoteData = await getQuote(symbol[0]);
      if (quoteData) {
        // set the data so we can map it out to the user
        setData(quoteData);
        // set the company profile to loaded so the main component
        // knows when it can show everything together
        // and stop the skeleton loader
        setQuote(true);
      }
    };
    getData();
  }, [symbol]);

  console.log(data);

  if (!data) return "";

  return (
    <div className="w-full max-w-[280px] h-full">
      <p className="p-4 pl-0 text-gray-800 font-semibold text-xl flex items-center">
        <Image src={quote} height={30} width={30} />
        <span className="ml-4">Price Statistics</span>
      </p>
      <div className="rounded-lg shadow-lg shadow-gray-400/75 overflow-hidden">
        <p className="flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100">
          Price & Volume statistics
        </p>
        <div className="flex bg-gray-200 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">Price</p>
          <p className="text-xs font-medium text-gray-800 truncate">
            ${" "}
            {data.latestPrice
              ? data.latestPrice.toLocaleString("en-us", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                })
              : ""}
          </p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">% Change</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.changePercent}</p>
        </div>
        <div className="flex bg-gray-200 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">Change</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.change}</p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">High</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.high}</p>
        </div>
        <div className="flex bg-gray-200 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">Low</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.low}</p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">Close</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.close}</p>
        </div>
        <div className="flex bg-gray-200 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">Previous Close</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.previousClose}</p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">Volume</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.volume}</p>
        </div>
        <div className="flex bg-gray-200 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">Avg Volume</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.avgTotalVolume}</p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">52 Wk High</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.week52High}</p>
        </div>
        <div className="flex bg-gray-200 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900  text-xs">52 Wk Low</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.week52Low}</p>
        </div>
        <div className="flex bg-gray-100 p-3 pl-4 items-center justify-between">
          <p className="font-semibold text-gray-900 text-xs">YTD Change</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.ytdChange}</p>
        </div>
      </div>
    </div>
  );
};

export default Quote;
