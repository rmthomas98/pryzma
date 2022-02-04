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

  // this state will hold the financial data
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
        // if response coming in is from iex cloud
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
        // if response coming in is from twelve data
        if (response.data.message === "twelve") {
          // set the message from where the data was pulled form
          setMessage("twelve");
          // this case is if the data is pulled from
          // financial modeling prep
          // set the data to the response
          setData({
            cashFlow: response.data.cashflow?.cash_flow[0],
            balanceSheet: response.data.balanceSheet?.balance_sheet[0],
          });
          // set the statsitics to leaded so the main
          // component knows its loaded
          return setFinancials(true);
        }
        // if data coming in is from modeling prep
        if (response.data.message === "prep") {
          // set the message from where the data is pulled from
          setMessage("prep");
          // set the data from the response from backend
          setData({
            balanceSheet:
              response.data.balanceSheet && response.data.balanceSheet[0],
            cashFlow: response.data.cashflow && response.data.cashflow[0],
            incomeStatement:
              response.data.incomeStatement && response.data.incomeStatement[0],
          });
          // set the financials to loaded so the main
          // overview component knows
          return setFinancials(true);
        }
        // if no data found
        if (response.data === "data not available") {
          setMessage("data not available");
          setData(true);
          setFinancials(true);
        }
      }
    };
    getData();
  }, [symbol]);

  if (isLoading || !data)
    return (
      <div className="w-full p-10 mt-8 rounded-lg bg-zinc-800 animate-pulse"></div>
    );

  if (message === "data not available")
    return (
      <div className="mt-8 animate-fadeIn opacity-0">
        <div>
          <p className="text-lg font-medium text-zinc-200 py-2 border-b border-zinc-800">
            Financials
          </p>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-200 p-3 pl-4">
                  Cash
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Liabilities
                </td>
                <td className="text-xs font-medium text-zinc-200">Assets</td>
                <td className="text-xs font-medium text-zinc-200">Debt</td>
                <td className="text-xs font-medium text-zinc-200">
                  Net Income
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Operating Expenses
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-200 p-3 pl-4">
                  -
                </td>
                <td className="text-xs font-medium text-zinc-200">-</td>
                <td className="text-xs font-medium text-zinc-200">-</td>
                <td className="text-xs font-medium text-zinc-200">-</td>
                <td className="text-xs font-medium text-zinc-200">-</td>
                <td className="text-xs font-medium text-zinc-200">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

  if (message === "prep")
    return (
      <div className="mt-8 opacity-0 animate-fadeIn">
        <div>
          <p className="font-medium text-zinc-200 text-lg py-2 border-b border-zinc-800">
            Financials
          </p>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-200 p-3 pl-4">
                  Cash
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Liabilities
                </td>
                <td className="text-xs font-medium text-zinc-200">Assets</td>
                <td className="text-xs font-medium text-zinc-200">Debt</td>
                <td className="text-xs font-medium text-zinc-200">
                  Net Income
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Operating Expenses
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-400 p-3 pl-4">
                  {data.cashflow?.cashAtEndOfPeriod
                    ? `$ ${millify(data.cashflow?.cashAtEndOfPeriod, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.balanceSheet?.totalLiabilities
                    ? `$ ${millify(data.balanceSheet?.totalLiabilities, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.balanceSheet?.totalAssets
                    ? `$ ${millify(data.balanceSheet?.totalAssets, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.balanceSheet?.totalDebt ||
                  data.balanceSheet?.totalDebt === 0
                    ? `$ ${millify(data.balanceSheet?.totalDebt, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.incomeStatement?.netIncome
                    ? `$ ${millify(data.incomeStatement?.netIncome, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-300">
                  {data.incomeStatement?.operatingExpenses
                    ? `$ ${millify(data.incomeStatement?.operatingExpenses, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

  if (message === "twelve")
    return (
      <div className="mt-8 animate-fadeIn opacity-0">
        <div>
          <p className="py-2 text-zinc-200 text-lg font-medium border-b border-zinc-800">
            Financials
          </p>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-200 p-3 pl-4">
                  Cash & Equivalents
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Liabilities
                </td>
                <td className="text-xs font-medium text-zinc-200">Assets</td>
                <td className="text-xs font-medium text-zinc-200">Debt</td>
                <td className="text-xs font-medium text-zinc-200">
                  Net Income
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Operating Expenses
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-400 p-3 pl-4">
                  {data.balanceSheet?.assets.current_assets
                    .cash_and_cash_equivalents
                    ? `$ ${millify(
                        data.balanceSheet?.assets.current_assets
                          .cash_and_cash_equivalents,
                        { precision: 2, space: true }
                      )}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.balanceSheet?.liabilities.total_liabilities
                    ? `$ ${millify(
                        data.balanceSheet?.liabilities.total_liabilities,
                        { precision: 2, space: true }
                      )}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.balanceSheet?.assets.total_assets
                    ? `$ ${millify(data.balanceSheet?.assets.total_assets, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-zinc-400">-</td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.cashflow?.operating_activities.net_income
                    ? `$ ${millify(
                        data.cashflow?.operating_activities.net_income,
                        { precision: 2, space: true }
                      )}`
                    : "-"}
                </td>
                <td className="text-zinc-400">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );

  if (message === "iex")
    return (
      <div className="mt-8 animate-fadeIn opacity-0">
        <div>
          <p className="py-2 border-b border-zinc-800 text-lg font-medium text-zinc-200">
            Financials
          </p>
          <table className="w-full table-fixed">
            <thead>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-200 p-3 pl-4">
                  Cash
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Liabilities
                </td>
                <td className="text-xs font-medium text-zinc-200">Assets</td>
                <td className="text-xs font-medium text-zinc-200">Debt</td>
                <td className="text-xs font-medium text-zinc-200">
                  Net Income
                </td>
                <td className="text-xs font-medium text-zinc-200">
                  Operating Expenses
                </td>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-zinc-800">
                <td className="text-xs font-medium text-zinc-400 p-3 pl-4">
                  {data.totalCash
                    ? `$ ${millify(data.totalCash, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.totalLiabilities
                    ? `$ ${millify(data.totalLiabilities, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.totalAssets
                    ? `$ ${millify(data.totalAssets, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.totalDebt
                    ? `$ ${millify(data.totalDebt, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.netIncome
                    ? `$ ${millify(data.netIncome, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
                <td className="text-xs font-medium text-zinc-400">
                  {data.operatingExpense
                    ? `$ ${millify(data.operatingExpense, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
};

export default Financials;
