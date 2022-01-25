import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";
import Image from "next/image";
import statsImage from '../../static/images/stats.svg';
import millify from 'millify'

// function to get outstanding shares and float
const getStatistics = async (symbol) => {
  const response = await axios.get(`https://api.twelvedata.com/statistics?symbol=${symbol}&apikey=617aa1ead02b4e8c92b9f06bc5af8754`);
  const customData = {stats: response.data.statistics.stock_statistics, marketCap: response.data.statistics.valuations_metrics}
  return customData
}

const Stats = ({isLoading, setStats}) => {

  // get symbol from context provider
  const { symbol } = useContext(SymbolContext);

  // this state will hold the company profile data
  // the data that we will map through and display to the user
  const [data, setData] = useState();

  // this will call the function above on component load to fetch
  // the price quote and volume stats
  // it is set to run everytime the symbol changes
  useEffect(() => {
    const getData = async () => {
      if (!symbol) return
      const statsData = await getStatistics(symbol[0]);
      if (statsData) {
        // if there is stats response, set the data
        setData(statsData)
        // set the statistics to loaded so the main component
        // knows when it can show everything together
        // and stop the skeleton loader
        setStats(true);
      }
    }
    getData()
  },[symbol])

  console.log(data)

  if (!data) return ''

  return <div className="mt-8">
      <div className="rounded-sm shadow-lg shadow-gray-400/75 overflow-hidden">
      <p className="items-center flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
        <Image src={statsImage} height={20} width={20} /><span className="ml-3">Basic Statistics</span>
        </p>
        <table className="w-full table-fixed">
            <tr className="bg-gray-300">
              <td className="text-xs font-bold text-gray-900 p-3 pl-4">Market Cap</td>
              <td className="text-xs font-bold text-gray-900">Shares Outs</td>
              <td className="text-xs font-bold text-gray-900">Float</td>
              <td className="text-xs font-bold text-gray-900">Shares Short</td>
              <td className="text-xs font-bold text-gray-900">Short Float %</td>
              <td className="text-xs font-bold text-gray-900">Insider Own</td>
              <td className="text-xs font-bold text-gray-900">Inst Own</td>
            </tr>
            <tr className="bg-gray-100">
              <td className="text-xs font-medium text-gray-800 p-3 pl-4">{data.marketCap.market_capitalization ? millify(data.marketCap.market_capitalization, {precision: 2, space: true}) : '-'}</td>
              <td className="text-xs font-medium text-gray-800">{data.stats.shares_outstanding ? millify(data.stats.shares_outstanding, {precision: 2, space: true}) : ''}</td>
              <td className="text-xs font-medium text-gray-800">{data.stats.float_shares ? millify(data.stats.float_shares, {precision: 2, space: true}) : ''}</td>
              <td className="text-xs font-medium text-gray-800">{data.stats.shares_short ? millify(data.stats.shares_short, {precision: 2, space: true}) : ''}</td>
              <td className="text-xs font-medium text-gray-800">{data.stats.shares_short && data.stats.float_shares ? `${((data.stats.shares_short / data.stats.float_shares) * 100).toFixed(2)}%` : ''}</td>
              <td className="text-xs font-medium text-gray-800">{data.stats.percent_held_by_insiders}</td>
              <td className="text-xs font-medium text-gray-800">{data.stats.percent_held_by_institutions}</td>
            </tr>
            </table>
      </div>
  </div>
}

export default Stats;