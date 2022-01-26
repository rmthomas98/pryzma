import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";
import Image from "next/image";
import statsImage from "../../static/images/stats.svg";
import millify from "millify";

const Stats = ({ isLoading, setStats }) => {
  // get symbol from context provider
  const { symbol } = useContext(SymbolContext);

  // tdis state will hold tde company profile data
  // tde data tdat we will map tdrough and display to tde user
  const [data, setData] = useState();

  // tdis will call tde function above on component load to fetch
  // tde price quote and volume stats
  // it is set to run everytime tde symbol changes
  useEffect(() => {
    const getData = async () => {
      // check if tdere is a symbol
      if (!symbol) return;
      // reset stats and data
      // to show skeleton loading
      setStats(false);
      setData();
      // hit backend api call to get data
      const response = await axios.post("/api/get-share-structure", {
        symbol: symbol[0],
      });
      if (response) {
        // if there is stats response, set the data
        setData(response.data);
        // set tde statistics to loaded so tde main component
        // knows when it can show everytding togetder
        // and stop tde skeleton loader
        setStats(true);
      }
    };
    getData();
  }, [symbol]);

  if (isLoading || !data) return <div>stats is loading</div>;

  return (
    <div className="mt-8">
      <div className="rounded-md shadow-lg shadow-gray-400/50 overflow-hidden">
        <p className="items-center flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
          <Image src={statsImage} height={20} width={20} />
          <span className="ml-3">Statistics</span>
        </p>
        {data.message === "twelve" ? (
          <table className="w-full table-fixed">
          <thead>
            <tr className="bg-gray-300">
              <td className="text-xs font-bold text-gray-900 p-3 pl-4">
                Market Cap
              </td>
              <td className="text-xs font-bold text-gray-900">Shares Outs</td>
              <td className="text-xs font-bold text-gray-900">Float</td>
              <td className="text-xs font-bold text-gray-900">Shares Short</td>
              <td className="text-xs font-bold text-gray-900">Short Float %</td>
              <td className="text-xs font-bold text-gray-900">Insider Own</td>
              <td className="text-xs font-bold text-gray-900">Inst Own</td>
            </tr>
            </thead>
            <tbody>
            <tr className="bg-gray-100">
              <td className="text-xs font-semibold text-gray-800 p-3 pl-4">
                {data.marketCap.market_capitalization
                  ? millify(data.marketCap.market_capitalization, {
                      precision: 2,
                      space: true,
                    })
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.stats.shares_outstanding
                  ? millify(data.stats.shares_outstanding, {
                      precision: 2,
                      space: true,
                    })
                  : ""}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.stats.float_shares
                  ? millify(data.stats.float_shares, {
                      precision: 2,
                      space: true,
                    })
                  : ""}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.stats.shares_short
                  ? millify(data.stats.shares_short, {
                      precision: 2,
                      space: true,
                    })
                  : ""}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.stats.shares_short && data.stats.float_shares
                  ? `${(
                      (data.stats.shares_short / data.stats.float_shares) *
                      100
                    ).toFixed(2)}%`
                  : ""}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.stats.percent_held_by_insiders
                  ? `${(data.stats.percent_held_by_insiders * 100).toFixed(2)}%`
                  : ""}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.stats.percent_held_by_institutions
                  ? `${(data.stats.percent_held_by_institutions * 100).toFixed(
                      2
                    )}%`
                  : ""}
              </td>
            </tr>
            </tbody>
          </table>
        ) : (
          <table className="w-full table-fixed">
            <tr className="bg-gray-300">
              <td className="text-xs font-bold text-gray-900 p-3 pl-4">
                Market Cap
              </td>
              <td className="text-xs font-bold text-gray-900">Shares Outs</td>
              <td className="text-xs font-bold text-gray-900">Float</td>
              <td className="text-xs font-bold text-gray-900">Shares Short</td>
              <td className="text-xs font-bold text-gray-900">Short Float %</td>
              <td className="text-xs font-bold text-gray-900">Insider Own</td>
              <td className="text-xs font-bold text-gray-900">Inst Own</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="text-xs font-semibold text-gray-800 p-3 pl-4">
                {data.marketCap
                  ? millify(data.marketCap, { precision: 2, space: true })
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.sharesOutstanding
                  ? millify(data.sharesOutstanding, {
                      precision: 2,
                      space: true,
                    })
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">-</td>
              <td className="text-xs font-semibold text-gray-800">-</td>
              <td className="text-xs font-semibold text-gray-800">-</td>
              <td className="text-xs font-semibold text-gray-800">-</td>
              <td className="text-xs font-semibold text-gray-800">-</td>
            </tr>
          </table>
        )}
      </div>
    </div>
  );
};

export default Stats;
