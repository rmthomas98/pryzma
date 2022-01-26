import quote from "../../static/images/check.svg";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";
import millify from "millify";
import { setDate } from "date-fns";

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
  // the price quote and volume stats
  // it is set to run everytime the symbol changes
  useEffect(() => {
    const getData = async () => {
      // check if there is a symbol
      if (!symbol) return;
      setQuote(false);
      setData();
      const quoteData = await getQuote(symbol[0]);
      if (quoteData) {
        // set the data so we can map it out to the user
        setData(quoteData);
        // set the quote to loaded so the main component
        // knows when it can show everything together
        // and stop the skeleton loader
        setQuote(true);
      }
    };
    getData();
  }, [symbol]);

  if (isLoading || !data) return <div>quote is loading</div>;

  return (
    <div className="w-full max-w-[280px] min-w-[280px]">
      {/* <p className="p-4 pl-0 text-gray-800 font-semibold text-xl flex items-center">
        <Image src={quote} height={30} width={30} />
        <span className="ml-4">Price Statistics</span>
      </p> */}
      <div className="rounded-md shadow-lg shadow-gray-400/50 overflow-hidden">
        <p className="flex items-center p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 justify-between">
          <span className="flex items-center">
            <Image src={quote} height={20} width={20} />
            <span className="ml-3">Price & Volume</span>
          </span>{" "}
          {/* <span>
          <span className="mr-4">Last Updated:</span>
            {format(new Date(data.latestUpdate), "MMMM dd, h:mm aa")}
          </span> */}
        </p>
        <div className="flex justify-between bg-gray-300">
          <p className="text-xs font-bold text-gray-900 py-2 px-4">Price</p>
          <p className="text-xs font-semibold text-gray-800 p-2 pl-4">
            {data.latestPrice ? `${data.latestPrice.toFixed(2)}` : "-"}
          </p>
        </div>
        <div className="flex justify-between py-2 px-4 bg-gray-100">
          <p className="text-xs font-bold text-gray-900">Change</p>
          <p
            className={`text-xs font-semibold ${
              data.change
                ? Math.sign(data.change) === -1
                  ? "text-rose-600"
                  : "text-emerald-600"
                : ""
            }`}
          >
            {data.change ? `${data.change.toFixed(2)}` : "-"}
          </p>
        </div>
        <div className="flex justify-between py-2 px-4 bg-gray-300">
          <p className="text-xs font-bold text-gray-900">% Change</p>
          <p
            className={`text-xs font-semibold ${
              data.changePercent
                ? Math.sign(data.changePercent) === -1
                  ? "text-rose-600"
                  : "text-emerald-600"
                : ""
            }`}
          >
            {data.changePercent ? `${data.changePercent.toFixed(2)}%` : "-"}
          </p>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-100">
          <p className="text-xs font-bold text-gray-900">Volume</p>
          <p className="text-xs font-semibold text-gray-800">
            {data.volume
              ? `${millify(data.volume, { precision: 2, space: true })}`
              : "-"}
          </p>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-300">
          <p className="text-xs font-bold text-gray-900">Avg Volume</p>
          <p className="text-xs font-semibold text-gray-800">
            {data.avgTotalVolume
              ? `${millify(data.avgTotalVolume, {
                  precision: 2,
                  space: true,
                })}`
              : "-"}
          </p>
        </div>

        <div className="flex justify-between px-4 py-2 bg-gray-100">
          <p className="text-xs font-bold text-gray-900">Close</p>
          <p className="text-xs font-semibold text-gray-800">
            {data.iexClose
              ? `${data.isUSMarketOpen ? "-" : `${data.iexClose}`}`
              : "-"}
          </p>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-300">
          <p className="text-xs font-bold text-gray-900">Prev Close</p>
          <p className="text-xs font-semibold text-gray-800">
            {data.previousClose ? `${data.previousClose.toFixed(2)}` : "-"}
          </p>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-100">
          <p className="text-xs font-bold text-gray-900">YTD Change</p>
          <p
            className={`text-xs font-semibold ${
              data.ytdChange
                ? Math.sign(data.ytdChange) === -1
                  ? "text-rose-600"
                  : "text-emerald-600"
                : ""
            }`}
          >
            {data.ytdChange ? `${data.ytdChange.toFixed(2)}%` : "-"}
          </p>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-300">
          <p className="text-xs font-bold text-gray-900">52 Week High</p>
          <p className="text-xs font-semibold text-gray-800">
            {data.week52High ? `${data.week52High.toFixed(2)}` : "-"}
          </p>
        </div>
        <div className="flex justify-between px-4 py-2 bg-gray-100">
          <p className="text-xs font-bold text-gray-900">52 Week Low</p>
          <p className="text-xs font-semibold text-gray-800">
            {data.week52Low ? `${data.week52Low.toFixed(2)}` : "-"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Quote;

{
  /* <p className="font-semibold text-gray-900  text-xs">Price</p>
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
          <p className="font-semibold text-gray-900 text-xs">Yp Change</p>
          <p className="text-xs font-medium text-gray-800 truncate">{data.ypChange}</p>
        </div> */
}
