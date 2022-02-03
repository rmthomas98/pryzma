import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SymbolContext from "../SymbolContext";
import millify from "millify";

const Income = ({ user }) => {
  const { symbol } = useContext(SymbolContext);
  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const [period, setPeriod] = useState("quarterly");

  const handleSwitchPeriod = async (e) => {
    setData();
    setIsLoading(true);
    setPeriod(e.target.value);
    const response = await axios.post("/api/income-statement", {
      symbol: symbol[0],
      period: e.target.value,
    });
    console.log(response.data);
    if (response.data.income_statement) {
      setData(response.data.income_statement);
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
      const response = await axios.post("/api/income-statement", {
        symbol: symbol[0],
        period: period,
      });
      if (response.data.income_statement) {
        setData(response.data.income_statement);
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
            Income Statement
          </p>
          <div className="flex">
            <button
              onClick={handleSwitchPeriod}
              value="quarterly"
              className={`rounded-md text-xs font-medium bg-zinc-800 px-2 py-1 mr-2 ${
                period === "quarterly"
                  ? "text-violet-500 bg-white"
                  : "text-zinc-200"
              } ${
                period === "quarterly"
                  ? "hover:text-violet-500"
                  : "hover:text-violet-500"
              } transition-all`}
            >
              Quarterly
            </button>
            <button
              onClick={handleSwitchPeriod}
              value="annual"
              className={`rounded-md text-xs font-medium bg-zinc-800 px-2 py-1 ${
                period === "annual"
                  ? "text-violet-500 bg-white"
                  : "text-zinc-200"
              } ${
                period === "annual"
                  ? "hover:text-violet-500"
                  : "hover:text-violet-500"
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
                Total Revenue
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].sales
                    ? millify(data[0].sales, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].sales
                    ? millify(data[1].sales, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].sales
                    ? millify(data[2].sales, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].sales
                    ? millify(data[3].sales, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Cost of Goods
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].cost_of_goods
                    ? millify(data[0].cost_of_goods, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].cost_of_goods
                    ? millify(data[1].cost_of_goods, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].cost_of_goods
                    ? millify(data[2].cost_of_goods, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].cost_of_goods
                    ? millify(data[3].cost_of_goods, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Gross Profit
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].gross_profit
                    ? millify(data[0].gross_profit, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].cost_of_goods
                    ? millify(data[1].cost_of_goods, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].cost_of_goods
                    ? millify(data[2].cost_of_goods, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].cost_of_goods
                    ? millify(data[3].cost_of_goods, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className=" border-b border-zinc-800">
              <td className="text-xs font-medium text-zinc-400 p-2">
                Operating Expenses
              </td>
              {data[0] && <td></td>}
              {data[1] && <td></td>}
              {data[2] && <td></td>}
              {data[3] && <td></td>}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2 pl-6">
                Research & Development
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_expense.research_and_development
                    ? millify(
                        data[0].operating_expense.research_and_development,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_expense.research_and_development
                    ? millify(
                        data[1].operating_expense.research_and_development,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_expense.research_and_development
                    ? millify(
                        data[2].operating_expense.research_and_development,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_expense.research_and_development
                    ? millify(
                        data[3].operating_expense.research_and_development,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2 pl-6">
                Selling General & Administrative
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_expense.selling_general_and_administrative
                    ? millify(
                        data[0].operating_expense
                          .selling_general_and_administrative,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_expense.selling_general_and_administrative
                    ? millify(
                        data[1].operating_expense
                          .selling_general_and_administrative,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_expense.selling_general_and_administrative
                    ? millify(
                        data[2].operating_expense
                          .selling_general_and_administrative,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_expense.selling_general_and_administrative
                    ? millify(
                        data[3].operating_expense
                          .selling_general_and_administrative,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2 pl-6">
                Other Operating Expenses
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_expense.other_operating_expenses
                    ? millify(
                        data[0].operating_expense.other_operating_expenses,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_expense.other_operating_expenses
                    ? millify(
                        data[1].operating_expense.other_operating_expenses,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_expense.other_operating_expenses
                    ? millify(
                        data[2].operating_expense.other_operating_expenses,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_expense.other_operating_expenses
                    ? millify(
                        data[3].operating_expense.other_operating_expenses,
                        { precision: 2, space: true }
                      )
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Operating Income
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].operating_income
                    ? millify(data[0].operating_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].operating_income
                    ? millify(data[1].operating_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].operating_income
                    ? millify(data[2].operating_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].operating_income
                    ? millify(data[3].operating_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className=" border-b border-zinc-800">
              <td className="text-xs font-medium text-zinc-400 p-2">
                Non Operating Interest
              </td>
              {data[0] && <td></td>}
              {data[1] && <td></td>}
              {data[2] && <td></td>}
              {data[3] && <td></td>}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2 pl-6">
                Income
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].non_operating_interest.income
                    ? millify(data[0].non_operating_interest.income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].non_operating_interest.income
                    ? millify(data[1].non_operating_interest.income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].non_operating_interest.income
                    ? millify(data[2].non_operating_interest.income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].non_operating_interest.income
                    ? millify(data[3].non_operating_interest.income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2 pl-6">
                Expense
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].non_operating_interest.expense
                    ? millify(data[0].non_operating_interest.expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].non_operating_interest.expense
                    ? millify(data[1].non_operating_interest.expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].non_operating_interest.expense
                    ? millify(data[2].non_operating_interest.expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].non_operating_interest.expense
                    ? millify(data[3].non_operating_interest.expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Other Income Expense
              </td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].other_income_expense
                    ? millify(data[0].other_income_expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].other_income_expense
                    ? millify(data[1].other_income_expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].other_income_expense
                    ? millify(data[2].other_income_expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].other_income_expense
                    ? millify(data[3].other_income_expense, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Pretax Income
              </td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].pretax_income
                    ? millify(data[0].pretax_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].pretax_income
                    ? millify(data[1].pretax_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].pretax_income
                    ? millify(data[2].pretax_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].pretax_income
                    ? millify(data[3].pretax_income, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Income Tax
              </td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].income_tax
                    ? millify(data[0].income_tax, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].income_tax
                    ? millify(data[1].income_tax, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].income_tax
                    ? millify(data[2].income_tax, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].income_tax
                    ? millify(data[3].income_tax, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Net Income
              </td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].net_income
                    ? millify(data[0].net_income, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].net_income
                    ? millify(data[1].net_income, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].net_income
                    ? millify(data[2].net_income, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].net_income
                    ? millify(data[3].net_income, { precision: 2, space: true })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">EPS</td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].eps_basic ? data[0].eps_basic : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].eps_basic ? data[1].eps_basic : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].eps_basic ? data[2].eps_basic : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].eps_basic ? data[3].eps_basic : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                EPS Diluted
              </td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].eps_diluted ? data[0].eps_diluted : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].eps_diluted ? data[1].eps_diluted : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].eps_diluted ? data[2].eps_diluted : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].eps_diluted ? data[3].eps_diluted : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Shares Outstanding
              </td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].basic_shares_outstanding
                    ? millify(data[0].basic_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].basic_shares_outstanding
                    ? millify(data[1].basic_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].basic_shares_outstanding
                    ? millify(data[2].basic_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].basic_shares_outstanding
                    ? millify(data[3].basic_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Diluted Shares Outstanding
              </td>
              {data[0] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].diluted_shares_outstanding
                    ? millify(data[0].diluted_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].diluted_shares_outstanding
                    ? millify(data[1].diluted_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].diluted_shares_outstanding
                    ? millify(data[2].diluted_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].diluted_shares_outstanding
                    ? millify(data[3].diluted_shares_outstanding, {
                        precision: 2,
                        space: true,
                      })
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

export default Income;
