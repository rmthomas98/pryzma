import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SymbolContext from "../SymbolContext";
import millify from "millify";

const Cash = ({ user }) => {
  const { symbol } = useContext(SymbolContext);
  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const [period, setPeriod] = useState("quarterly");

  const handleSwitchPeriod = async (e) => {
    setData();
    setIsLoading(true);
    setPeriod(e.target.value);
    const response = await axios.post("/api/cash-flow", {
      symbol: symbol[0],
      period: e.target.value,
    });
    console.log(response.data);
    if (response.data.cash_flow) {
      setData(response.data.cash_flow);
      return setIsLoading(false);
    }
    setIsLoading(false);
    setData("data not available");
  };

  useEffect(() => {
    setUser(user);
  }, []);

  useEffect(() => {
    if (!symbol) return;

    // reset data
    // and loader
    setData();
    setIsLoading(true);

    // create function to hit backend endpoint
    const getData = async () => {
      const response = await axios.post("/api/cash-flow", {
        symbol: symbol[0],
        period: period,
      });
      if (response.data.cash_flow) {
        setData(response.data.cash_flow);
        return setIsLoading(false);
      }
      setIsLoading(false);
      setData("data not available");
    };
    getData();
  }, [symbol]);

  if (!data || isLoading)
    return (
      <div className="px-4">
        <div className="max-w-7xl mx-auto mt-4">
          <div className="flex items-center justify-between">
            <div className="p-4 max-w-[300px] w-full bg-zinc-800 animate-pulse rounded-md"></div>
            <div className="flex">
              <div className="p-2 rounded-md w-[70px] bg-zinc-800 animate-pulse mr-4"></div>
              <div className="p-2 rounded-md w-[70px] bg-zinc-800 animate-pulse"></div>
            </div>
          </div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
        </div>
      </div>
    );

  if (data === "data not available" || !data.length)
    return (
      <div className="p-4 mx-auto rounded-md border w-fit border-violet-500 bg-zinc-800 mt-10">
        <p className="font-medium text-zinc-200 text-sm">
          No data available for {symbol[0]}
        </p>
      </div>
    );

  return (
    <div className="p-4 mb-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-zinc-200 text-2xl mb-2">
            Cash Flow Statement
          </p>
          <div className="flex">
            <button
              onClick={handleSwitchPeriod}
              value="quarterly"
              className={`rounded-md text-xs font-medium hover:text-violet-500 px-2 py-1 mr-2 ${
                period === "quarterly"
                  ? "text-violet-500 bg-white"
                  : "bg-zinc-800 text-white"
              } transition-all`}
            >
              Quarterly
            </button>
            <button
              onClick={handleSwitchPeriod}
              value="annual"
              className={`rounded-md text-xs font-medium hover:text-violet-500 px-2 py-1 ${
                period === "annual"
                  ? "text-violet-500 bg-white"
                  : "bg-zinc-800 text-white"
              } transition-all`}
            >
              Annual
            </button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <td className="text-xs font-medium text-zinc-200 p-2">
                Break Down
              </td>
              <td className="text-xs font-medium text-zinc-200">
                {data[0] ? data[0].fiscal_date : ""}
              </td>
              {data[1] ? (
                <td className="text-xs font-medium text-zinc-200">
                  {data[1].fiscal_date}
                </td>
              ) : (
                ""
              )}
              {data[2] ? (
                <td className="text-xs font-medium text-zinc-200">
                  {data[2].fiscal_date}
                </td>
              ) : (
                ""
              )}
              {data[3] ? (
                <td className="text-xs font-medium text-zinc-200">
                  {data[3].fiscal_date}
                </td>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                End Cash Position
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].end_cash_position
                    ? millify(data[0].end_cash_position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].end_cash_position
                    ? millify(data[1].end_cash_position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].end_cash_position
                    ? millify(data[2].end_cash_position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].end_cash_position
                    ? millify(data[3].end_cash_position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Income Tax Paid
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].income_tax_paid
                    ? millify(data[0].income_tax_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].income_tax_paid
                    ? millify(data[1].income_tax_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].income_tax_paid
                    ? millify(data[2].income_tax_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].income_tax_paid
                    ? millify(data[3].income_tax_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Interest Paid
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].interest_paid
                    ? millify(data[0].interest_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].interest_paid
                    ? millify(data[1].interest_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].interest_paid
                    ? millify(data[2].interest_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].interest_paid
                    ? millify(data[3].interest_paid, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Free Cash Flow
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].free_cash_flow
                    ? millify(data[0].free_cash_flow, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].free_cash_flow
                    ? millify(data[1].free_cash_flow, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].free_cash_flow
                    ? millify(data[2].free_cash_flow, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].free_cash_flow
                    ? millify(data[3].free_cash_flow, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800 bg-zinc-800">
              <td className="font-medium text-zinc-200 p-2 text-xs">
                Operating Activities
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Net Income
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.net_income
                    ? millify(data[0].operating_activities.net_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.net_income
                    ? millify(data[1].operating_activities.net_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.net_income
                    ? millify(data[2].operating_activities.net_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.net_income
                    ? millify(data[3].operating_activities.net_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Depreciation
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.depreciation
                    ? millify(data[0].operating_activities.depreciation, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.depreciation
                    ? millify(data[1].operating_activities.depreciation, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.depreciation
                    ? millify(data[2].operating_activities.depreciation, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.depreciation
                    ? millify(data[3].operating_activities.depreciation, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Deferred Taxes
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.deferred_taxes
                    ? millify(data[0].operating_activities.deferred_taxes, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.deferred_taxes
                    ? millify(data[1].operating_activities.deferred_taxes, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.deferred_taxes
                    ? millify(data[2].operating_activities.deferred_taxes, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.deferred_taxes
                    ? millify(data[3].operating_activities.deferred_taxes, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Stock Based Compensation
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.stock_based_compensation
                    ? millify(
                        data[0].operating_activities.stock_based_compensation,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.stock_based_compensation
                    ? millify(
                        data[1].operating_activities.stock_based_compensation,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.stock_based_compensation
                    ? millify(
                        data[2].operating_activities.stock_based_compensation,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.stock_based_compensation
                    ? millify(
                        data[3].operating_activities.stock_based_compensation,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Non Cash Items
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.other_non_cash_items
                    ? millify(
                        data[0].operating_activities.other_non_cash_items,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.other_non_cash_items
                    ? millify(
                        data[1].operating_activities.other_non_cash_items,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.other_non_cash_items
                    ? millify(
                        data[2].operating_activities.other_non_cash_items,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.other_non_cash_items
                    ? millify(
                        data[3].operating_activities.other_non_cash_items,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Accounts Receivable
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.accounts_receivable
                    ? millify(
                        data[0].operating_activities.accounts_receivable,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.accounts_receivable
                    ? millify(
                        data[1].operating_activities.accounts_receivable,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.accounts_receivable
                    ? millify(
                        data[2].operating_activities.accounts_receivable,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.accounts_receivable
                    ? millify(
                        data[3].operating_activities.accounts_receivable,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Accounts Payable
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.accounts_payable
                    ? millify(data[0].operating_activities.accounts_payable, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.accounts_payable
                    ? millify(data[1].operating_activities.accounts_payable, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.accounts_payable
                    ? millify(data[2].operating_activities.accounts_payable, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.accounts_payable
                    ? millify(data[3].operating_activities.accounts_payable, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Changes
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.other_assets_liabilities
                    ? millify(
                        data[0].operating_activities.other_assets_liabilities,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.other_assets_liabilities
                    ? millify(
                        data[1].operating_activities.other_assets_liabilities,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.other_assets_liabilities
                    ? millify(
                        data[2].operating_activities.other_assets_liabilities,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.other_assets_liabilities
                    ? millify(
                        data[3].operating_activities.other_assets_liabilities,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Operating Cash Flow
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_activities.operating_cash_flow
                    ? millify(
                        data[0].operating_activities.operating_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_activities.operating_cash_flow
                    ? millify(
                        data[1].operating_activities.operating_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_activities.operating_cash_flow
                    ? millify(
                        data[2].operating_activities.operating_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_activities.operating_cash_flow
                    ? millify(
                        data[3].operating_activities.operating_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800 bg-zinc-800">
              <td className="font-medium text-zinc-200 p-2 text-xs">
                Investing Activities
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Capital Expenditures
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].investing_activities.capital_expenditures
                    ? millify(
                        data[0].investing_activities.capital_expenditures,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].investing_activities.capital_expenditures
                    ? millify(
                        data[1].investing_activities.capital_expenditures,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].investing_activities.capital_expenditures
                    ? millify(
                        data[2].investing_activities.capital_expenditures,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].investing_activities.capital_expenditures
                    ? millify(
                        data[3].investing_activities.capital_expenditures,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Net Intangibles
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].investing_activities.net_intangibles
                    ? millify(data[0].investing_activities.net_intangibles, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].investing_activities.net_intangibles
                    ? millify(data[1].investing_activities.net_intangibles, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].investing_activities.net_intangibles
                    ? millify(data[2].investing_activities.net_intangibles, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].investing_activities.net_intangibles
                    ? millify(data[3].investing_activities.net_intangibles, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Net Acquisitions
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].investing_activities.net_acquisitions
                    ? millify(data[0].investing_activities.net_acquisitions, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].investing_activities.net_acquisitions
                    ? millify(data[1].investing_activities.net_acquisitions, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].investing_activities.net_acquisitions
                    ? millify(data[2].investing_activities.net_acquisitions, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].investing_activities.net_acquisitions
                    ? millify(data[3].investing_activities.net_acquisitions, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Purchase of Investments
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].investing_activities.purchase_of_investments
                    ? millify(
                        data[0].investing_activities.purchase_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].investing_activities.purchase_of_investments
                    ? millify(
                        data[1].investing_activities.purchase_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].investing_activities.purchase_of_investments
                    ? millify(
                        data[2].investing_activities.purchase_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].investing_activities.purchase_of_investments
                    ? millify(
                        data[3].investing_activities.purchase_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Sale of Investments
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].investing_activities.sale_of_investments
                    ? millify(
                        data[0].investing_activities.sale_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].investing_activities.sale_of_investments
                    ? millify(
                        data[1].investing_activities.sale_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].investing_activities.purchase_of_investments
                    ? millify(
                        data[2].investing_activities.purchase_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].investing_activities.purchase_of_investments
                    ? millify(
                        data[3].investing_activities.purchase_of_investments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Investing Activity
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].investing_activities.other_investing_activity
                    ? millify(
                        data[0].investing_activities.other_investing_activity,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].investing_activities.other_investing_activity
                    ? millify(
                        data[1].investing_activities.other_investing_activity,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].investing_activities.other_investing_activity
                    ? millify(
                        data[2].investing_activities.other_investing_activity,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].investing_activities.other_investing_activity
                    ? millify(
                        data[3].investing_activities.other_investing_activity,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Investing Cash Flow
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].investing_activities.investing_cash_flow
                    ? millify(
                        data[0].investing_activities.investing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].investing_activities.investing_cash_flow
                    ? millify(
                        data[1].investing_activities.investing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].investing_activities.investing_cash_flow
                    ? millify(
                        data[2].investing_activities.investing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].investing_activities.investing_cash_flow
                    ? millify(
                        data[3].investing_activities.investing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800 bg-zinc-800">
              <td className="font-medium text-zinc-200 p-2 text-xs">
                Financing Activities
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Long Term Debt Issuance
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.long_term_debt_issuance
                    ? millify(
                        data[0].financing_activities.long_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.long_term_debt_issuance
                    ? millify(
                        data[1].financing_activities.long_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.long_term_debt_issuance
                    ? millify(
                        data[2].financing_activities.long_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.long_term_debt_issuance
                    ? millify(
                        data[3].financing_activities.long_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Long Term Debt Payments
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.long_term_debt_payments
                    ? millify(
                        data[0].financing_activities.long_term_debt_payments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.long_term_debt_payments
                    ? millify(
                        data[1].financing_activities.long_term_debt_payments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.long_term_debt_payments
                    ? millify(
                        data[2].financing_activities.long_term_debt_payments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.long_term_debt_payments
                    ? millify(
                        data[3].financing_activities.long_term_debt_payments,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Short Term Debt Issuance
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.short_term_debt_issuance
                    ? millify(
                        data[0].financing_activities.short_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.short_term_debt_issuance
                    ? millify(
                        data[1].financing_activities.short_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.short_term_debt_issuance
                    ? millify(
                        data[2].financing_activities.short_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.short_term_debt_issuance
                    ? millify(
                        data[3].financing_activities.short_term_debt_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Common Stock Issuance
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.common_stock_issuance
                    ? millify(
                        data[0].financing_activities.common_stock_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.common_stock_issuance
                    ? millify(
                        data[1].financing_activities.common_stock_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.common_stock_issuance
                    ? millify(
                        data[2].financing_activities.common_stock_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.common_stock_issuance
                    ? millify(
                        data[3].financing_activities.common_stock_issuance,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Common Stock Repurchase
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.common_stock_repurchase
                    ? millify(
                        data[0].financing_activities.common_stock_repurchase,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.common_stock_repurchase
                    ? millify(
                        data[1].financing_activities.common_stock_repurchase,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.common_stock_repurchase
                    ? millify(
                        data[2].financing_activities.common_stock_repurchase,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.common_stock_repurchase
                    ? millify(
                        data[3].financing_activities.common_stock_repurchase,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Common Dividends
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.common_dividends
                    ? millify(data[0].financing_activities.common_dividends, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.common_dividends
                    ? millify(data[1].financing_activities.common_dividends, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.common_dividends
                    ? millify(data[2].financing_activities.common_dividends, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.common_dividends
                    ? millify(data[3].financing_activities.common_dividends, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Financing Charges
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.other_financing_charges
                    ? millify(
                        data[0].financing_activities.other_financing_charges,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.other_financing_charges
                    ? millify(
                        data[1].financing_activities.other_financing_charges,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.other_financing_charges
                    ? millify(
                        data[2].financing_activities.other_financing_charges,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.other_financing_charges
                    ? millify(
                        data[3].financing_activities.other_financing_charges,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Financing Cash Flow
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].financing_activities.financing_cash_flow
                    ? millify(
                        data[0].financing_activities.financing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].financing_activities.financing_cash_flow
                    ? millify(
                        data[1].financing_activities.financing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].financing_activities.financing_cash_flow
                    ? millify(
                        data[2].financing_activities.financing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].financing_activities.financing_cash_flow
                    ? millify(
                        data[3].financing_activities.financing_cash_flow,
                        {
                          precision: 2,
                          space: true,
                        }
                      )
                    : "-"}
                </td>
              )}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    let user = req.session.get("user");

    // IF NO USER IN SESSION, REDIRECT TO LOGIN PAGE
    if (!user) {
      return {
        redirect: {
          permanant: false,
          destination: "/login",
        },
        props: {},
      };
    }

    // if user in sessoin, fetch from mongodb
    if (user) {
      // connect to mongodb
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("users");

      // find user in db
      user = await collection.findOne({
        stripeCustomerId: user.user.stripeCustomerId,
      });

      // set session
      req.session.set("user", {
        id: user._id,
        user: user,
      });
      await req.session.save();
    }

    // retrieve updated session
    user = req.session.get("user");

    // if user subscription is canceled, redirect to manage acccount page to update payment method
    if (
      user.user.isCanceled ||
      user.user.paymentStatus === "failed" ||
      user.user.subscriptionType === null ||
      !user.user.defaultPaymentMethod
    ) {
      return {
        redirect: {
          permanant: false,
          destination: "/admin/manage-account",
        },
        props: {},
      };
    }

    // parse user to pass as props
    user = JSON.parse(JSON.stringify(user));

    // return user as props
    return { props: user };
  },
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "user",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

export default Cash;
