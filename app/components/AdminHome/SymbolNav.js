import SymbolContext from "../../pages/SymbolContext";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import UserContext from "../../pages/UserContext";

const SymbolNav = () => {
  const { symbol } = useContext(SymbolContext);
  const { user, setUser } = useContext(UserContext);

  // keep track of whether or not the watchlist is updating
  const [isSubmitting, setIsSubmitting] = useState(false);

  // update user watchlist
  // either add or remove symbol from watchlist
  const handleWatchlistButton = async () => {
    setIsSubmitting(true);
    const action = user.watchlist.indexOf(symbol[0]) === -1 ? "add" : "remove";
    const response = await axios.post("/api/add-remove-symbol", {
      symbol: symbol[0],
      action,
      email: user.email,
    });
    if (response?.data) setUser(response.data);
    setIsSubmitting(false);
  };

  if (!user || !symbol) return <div></div>;

  return (
    <div className="p-4 pb-0 animate-fadeIn opacity-0">
      <div className="flex items-center justify-between border-b pb-4 border-zinc-800 max-w-7xl mx-auto">
        <p>
          <span className="font-semibold text-xl text-zinc-200">{`${symbol[0]} - `}</span>
          <span className="font-medium text-zinc-200">{symbol[1]}</span>
        </p>
        <button
          disabled={isSubmitting ? true : false}
          onClick={handleWatchlistButton}
          className={`text-xs bg-zinc-200 hover:bg-white font-semibold p-2 rounded-md transition-all duration-300 ${
            user.watchlist.indexOf(symbol[0]) !== -1
              ? "text-red-500"
              : "text-violet-500"
          } ${isSubmitting ? "opacity-70" : "opacity-100"}`}
        >{`${
          user.watchlist.indexOf(symbol[0]) === -1
            ? `Add ${symbol[0]} to watchlist`
            : `Remove ${symbol[0]} from watchlist`
        }`}</button>
      </div>
    </div>
  );
};

export default SymbolNav;
