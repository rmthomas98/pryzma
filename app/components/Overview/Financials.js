import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from "../../pages/SymbolContext";
import financialsImage from "../../static/images/financials.svg";
import Image from "next/image";
import millify from "millify";

const Financials = ({ setFinancials, isLoading }) => {
  // get symbol from context provider
  const { symbol } = useContext(SymbolContext);

  // message so we know what to return
  const [message, setMessage] = useState();

  // tdis state will hold tde company profile data
  // tde data that we will map through and display to the user
  const [data, setData] = useState();

  // this will run everytime symbol changes
  useEffect(() => {
    const getData = async () => {
      // check if tdere is a symbol
      if (!symbol) return;
      // reset stats and data
      // to show skeleton loading
      setFinancials(false);
      setData();
      // hit backend api call to get data
      const response = await axios.post("/api/get-financials", {
        symbol: symbol[0],
      });
      if (response) {
        if (response.data.message === "iex") {
          // set the message from where the data was pulled from
          setMessage("iex");
          // if there is stats response, set the data
          setData(response.data.data.financials[0]);
          // set the statistics to loaded so the main component
          // knows when it can show everytding together
          // and stop the skeleton loader
          return setFinancials(true);
        }
        if (response.data.message === "twelve") {
          // set the message from where the data was pulled form
          setMessage("twelve");
          // this case is if the data is pulled from
          // financial modeling prep
          // set the data to the response
          setData({cashFlow: response.data.cashFlow.cash_flow[0], balanceSheet: response.data.balanceSheet.balance_sheet[0]});
          // set the statsitics to leaded so the main
          // component knows its loaded
          return setFinancials(true);
        }
        if (response.data === 'data not available') {
          setMessage('data not available')
          setData(true)
          setFinancials(true)
        }
      }
    };
    getData();
  }, [symbol]);

  console.log(data)

  if (isLoading || !data) return <div>financials are loading</div>;

  if (message === 'data not available') return (
    <p>Data not available for {symbol[0]}</p>
  )

  if (message === "twelve")
    return (
      <div className="mt-8">
        <div className="rounded-md shadow-lg shadow-gray-400/50 overflow-hidden">
          <p className="items-center flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
            <Image src={financialsImage} height={20} width={20} />
            <span className="ml-3">Financials</span>
          </p>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-300">
                <td className="text-xs font-bold text-gray-900 p-3 pl-4">Cash</td>
                <td className="text-xs font-bold text-gray-900">Liabilities</td>
                <td className="text-xs font-bold text-gray-900">Assets</td>
                <td className="text-xs font-bold text-gray-900">Debt</td>
                <td className="text-xs font-bold text-gray-900">Net Income</td>
                <td className="text-xs font-bold text-gray-900">Operating Expenses</td>
              </tr>
            </thead>
            <tbody>
            <td className="text-xs font-semibold text-gray-800">{data.balanceSheet.assets.current_assets.cash}</td>
            <td className="text-xs font-semibold text-gray-800">{data.balanceSheet.liabilities.total_liabilities}</td>
            <td className="text-xs font-semibold text-gray-800">{data.balanceSheet.assets.total_assets}</td>
            <td>-</td>
            <td className="text-xs font-semibold text-gray-800">{data.cashFlow.operating_activities.net_income}</td>
            </tbody>
          </table>
        </div>
      </div>
    );

  if (message === "iex")
    return (
      <div className="mt-8">
        <div className="rounded-md shadow-lg shadow-gray-400/50 overflow-hidden">
          <p className="items-center flex p-3 bg-gray-800 pl-4 pr-4 text-sm text-gray-100 sticky top-0">
            <Image src={financialsImage} height={20} width={20} />
            <span className="ml-3">Financials</span>
          </p>
          <table className="w-full table-fixed">
            <thead>
              <tr className="bg-gray-300">
                <td className="text-xs font-bold text-gray-900 p-3 pl-4">
                  Cash
                </td>
                <td className="text-xs font-bold text-gray-900">Liabilities</td>
                <td className="text-xs font-bold text-gray-900">Assets</td>
                <td className="text-xs font-bold text-gray-900">Debt</td>
                <td className="text-xs font-bold text-gray-900">Net Income</td>
                <td className="text-xs font-bold text-gray-900">
                  Operating Expenses
                </td>
              </tr>
            </thead>
            <tbody>
              <td className="text-xs font-semibold text-gray-800 p-3 pl-4">
                {data.totalCash
                  ? `$ ${millify(data.totalCash, { precision: 2, space: true })}`
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.totalLiabilities
                  ? `$ ${millify(data.totalLiabilities, {
                      precision: 2,
                      space: true,
                    })}`
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.totalAssets
                  ? `$ ${millify(data.totalAssets, { precision: 2, space: true })}`
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.totalDebt
                  ? `$ ${millify(data.totalDebt, { precision: 2, space: true })}`
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.netIncome
                  ? `$ ${millify(data.netIncome, { precision: 2, space: true })}`
                  : "-"}
              </td>
              <td className="text-xs font-semibold text-gray-800">
                {data.operatingExpense
                  ? `$ ${millify(data.operatingExpense, {
                      precision: 2,
                      space: true,
                    })}`
                  : "-"}
              </td>
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Financials;
