import watchList from "../../static/images/watchlist.svg";
import Image from "next/image";
import { CaretDownFill, Router, X } from "react-bootstrap-icons";
import axios from "axios";
import { useState, useContext } from "react";
import millify from "millify";
import SymbolContext from "../../pages/SymbolContext";
import { useRouter } from "next/router";

const WatchList = ({ user, watchListSymbols, setWatchListSymbols }) => {
  const [sortSymbol, setSortSymbol] = useState(true);
  const [sortPrice, setSortPrice] = useState(false);
  const [sortChange, setSortChange] = useState(false);
  const [sortPercent, setSortPercent] = useState(false);
  const [sortVolume, setSortVolume] = useState(false);

  const { setSymbol } = useContext(SymbolContext);
  const router = useRouter();

  console.log(watchListSymbols);

  const handleDeleteSymbol = (e) => {
    // This function deltes symbols from watchlist
    const newArr = [...watchListSymbols];
    // get the index from the target value and remove it from the array
    newArr.splice(e.target.value, 1);
    // set the new array list with the one deleted
    setWatchListSymbols(newArr);
    // create a list without the one that was just deleted
    // send it to backend and delete in mongodb
    const updatedWatchlist = newArr.map((element) => element.quote.symbol);
    // update watchlist in mongodb
    axios.post("/api/update-watchlist", {
      updatedWatchlist,
      email: user.user.email,
    });
    // check if watchlist has any symbols in it
    // if not, display message saying they dont have
    // any stocks in their watchlist
    if (!updatedWatchlist.length) setWatchListSymbols();
  };

  const handleSymbolSort = () => {
    setSortPrice(false);
    setSortChange(false);
    setSortPercent(false);
    setSortVolume(false);
    if (!sortSymbol) {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort((a, b) =>
        a.quote.symbol.toLowerCase() > b.quote.symbol.toLowerCase() ? 1 : -1
      );
      console.log(newArr);
      setWatchListSymbols(newArr);
      setSortSymbol(true);
    } else {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort((a, b) =>
        b.quote.symbol.toLowerCase() > a.quote.symbol.toLowerCase() ? 1 : -1
      );
      console.log(newArr);
      setWatchListSymbols(newArr);
      setSortSymbol(false);
    }
  };

  const handlePriceSort = () => {
    setSortSymbol(true);
    setSortChange(false);
    setSortPercent(false);
    setSortVolume(false);
    if (!sortPrice) {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort(
        (a, b) => a.quote.latestPrice - b.quote.latestPrice
      );
      setWatchListSymbols(newArr);
      setSortPrice(true);
    } else {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort(
        (a, b) => b.quote.latestPrice - a.quote.latestPrice
      );
      setWatchListSymbols(newArr);
      setSortPrice(false);
    }
  };

  const handleChangeSort = () => {
    setSortSymbol(true);
    setSortPrice(false);
    setSortPercent(false);
    setSortVolume(false);
    if (!sortChange) {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort((a, b) => a.quote.change - b.quote.change);
      setWatchListSymbols(newArr);
      setSortChange(true);
    } else {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort((a, b) => b.quote.change - a.quote.change);
      setWatchListSymbols(newArr);
      setSortChange(false);
    }
  };

  const handlePercentSort = () => {
    setSortSymbol(true);
    setSortPrice(false);
    setSortChange(false);
    setSortVolume(false);
    if (!sortPercent) {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort(
        (a, b) => a.quote.changePercent - b.quote.changePercent
      );
      setWatchListSymbols(newArr);
      setSortPercent(true);
    } else {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort(
        (a, b) => b.quote.changePercent - a.quote.changePercent
      );
      setWatchListSymbols(newArr);
      setSortPercent(false);
    }
  };

  const handleVolumeSort = () => {
    setSortSymbol(true);
    setSortPrice(false);
    setSortChange(false);
    setSortPercent(false);
    if (!sortVolume) {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort((a, b) => a.quote.volume - b.quote.volume);
      setWatchListSymbols(newArr);
      setSortVolume(true);
    } else {
      const oldArr = [...watchListSymbols];
      const newArr = oldArr.sort((a, b) => b.quote.volume - a.quote.volume);
      setWatchListSymbols(newArr);
      setSortVolume(false);
    }
  };

  // function that brings the user
  // to the overview page when they click on a stock
  // that is on their watchlist
  const handleWatchlistClick = (symbol) => {
    let searchSymbol;
    // map through the stocks they have on their watchlist
    // and find the symbol they clicked on so we can match
    // up the company name in setsymbol
    watchListSymbols.forEach((element) => {
      if (element.quote.symbol === symbol) {
        searchSymbol = [symbol, element.quote.companyName];
      }
    });
    // we sent the symbol
    setSortSymbol(searchSymbol);
    // then we redirect them to the overview page
    router.push("/admin/overview");
  };

  return (
    <div className="mt-6">
      <p className="p-4 pl-0 text-gray-800 font-semibold text-xl flex items-center">
        <Image src={watchList} height={30} width={30} />
        <span className="ml-4">My Watchlist</span>
      </p>
      <div className="shadow-lg shadow-gray-400/50 rounded-md bg-gray-50 overflow-hidden">
        <div className="flex p-3 bg-gray-800 pl-4 pr-4">
          <p
            onClick={watchListSymbols ? handleSymbolSort : null}
            className="w-full text-xs text-gray-100 flex items-center cursor-pointer"
          >
            Symbol
            <CaretDownFill
              className={`text-sky-400 ml-1 mt-1 transition-all duration-300 ${
                sortSymbol ? "rotate-0" : "rotate-180"
              }`}
            />
          </p>
          <p
            onClick={watchListSymbols ? handlePriceSort : null}
            className="w-full text-xs text-gray-100 flex items-center cursor-pointer"
          >
            Price
            <CaretDownFill
              className={`text-sky-400 ml-1 mt-1 transition-all duration-300 ${
                sortPrice ? "rotate-180" : "rotate-0"
              }`}
            />
          </p>
          <p
            onClick={watchListSymbols ? handleChangeSort : null}
            className="w-full text-xs text-gray-100 flex items-center cursor-pointer"
          >
            Change
            <CaretDownFill
              className={`text-sky-400 ml-1 mt-1 transition-all duration-300 ${
                sortChange ? "rotate-180" : "rotate-0"
              }`}
            />
          </p>
          <p
            onClick={watchListSymbols ? handlePercentSort : null}
            className="w-full text-xs text-gray-100 flex items-center cursor-pointer"
          >
            % Change
            <CaretDownFill
              className={`text-sky-400 ml-1 mt-1 transition-all duration-300 ${
                sortPercent ? "rotate-180" : "rotate-0"
              }`}
            />
          </p>
          <p
            onClick={watchListSymbols ? handleVolumeSort : null}
            className="w-full text-xs text-gray-100 flex items-center cursor-pointer"
          >
            Volume
            <CaretDownFill
              className={`text-sky-400 ml-1 mt-1 transition-all duration-300 ${
                sortVolume ? "rotate-180" : "rotate-0"
              }`}
            />
          </p>
          <span className="w-full max-w-[20px]"></span>
        </div>
        {watchListSymbols ? (
          watchListSymbols.map((element, index) => {
            // get data from object
            const { symbol, volume, change, changePercent, latestPrice } =
              element.quote;
            return (
              <div
                className={`flex items-center p-2 pl-4 pr-4 bg-gray-100 hover:bg-gray-300 cursor-pointer transition-all duration-300 ${
                  index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"
                }`}
                key={symbol}
              >
                <p
                  onClick={() => handleWatchlistClick(symbol)}
                  className="w-full text-xs text-gray-800 font-semibold"
                >
                  {symbol}
                </p>
                <p
                  onClick={() => handleWatchlistClick(symbol)}
                  className="w-full text-xs text-gray-800 font-semibold"
                >
                  <span className="mr-1">$</span>
                  {latestPrice.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p
                  onClick={() => handleWatchlistClick(symbol)}
                  className={`w-full text-xs font-semibold ${
                    Math.sign(change) === -1
                      ? "text-rose-600"
                      : "text-emerald-600"
                  }`}
                >
                  {change.toLocaleString("en-us", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  })}
                </p>
                <p
                  onClick={() => handleWatchlistClick(symbol)}
                  className={`w-full text-xs font-semibold ${
                    Math.sign(changePercent) === -1
                      ? "text-rose-600"
                      : "text-emerald-600"
                  }`}
                >
                  {changePercent.toFixed(2)}%
                </p>
                <p
                  onClick={() => handleWatchlistClick(symbol)}
                  className="w-full text-xs text-gray-800 font-semibold"
                >
                  {millify(volume, { space: true, precision: 2 })}
                </p>
                <button
                  value={index}
                  onClick={handleDeleteSymbol}
                  className="max-w-[20px] w-full cursor-pointer hover:text-rose-600 text-gray-400"
                >
                  <X className="  transition  pointer-events-none " size={20} />
                </button>
              </div>
            );
          })
        ) : (
          <p className="p-8 text-center text-gray-700 leading-7">
            You don't have any stocks in your watchlist at this time.
            <br />
            Search for a stock above to add to your watchlist.
          </p>
        )}
      </div>
    </div>
  );
};

export default WatchList;