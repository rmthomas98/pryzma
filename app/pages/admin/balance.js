import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SymbolContext from "../SymbolContext";

const Balance = ({ user }) => {
  const { symbol } = useContext(SymbolContext);
  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  const [period, setPeriod] = useState("quarterly");

  useEffect(() => {
    setUser(user);
  }, []);

  const handleSwitchPeriod = async (e) => {
    setData();
    setIsLoading(true);
    setPeriod(e.target.value);
    const response = await axios.post("/api/balance-sheet", {
      symbol: symbol[0],
      period: e.target.value,
    });
    console.log(response.data);
    if (response.data.balance_sheet) {
      setData(response.data.balance_sheet);
      return setIsLoading(false);
    }
    setIsLoading(false);
    setData("data not available");
  };

  useEffect(() => {
    if (!symbol) return;

    // reset data
    // and loader
    setData();
    setIsLoading(true);

    // create function to hit backend endpoint
    const getData = async () => {
      if (!symbol) return;
      const response = await axios.post("/api/balance-sheet", {
        symbol: symbol[0],
        period: period,
      });
      if (response.data.balance_sheet) {
        setData(response.data.balance_sheet);
        return setIsLoading(false);
      }
      setIsLoading(false);
      setData("data not available");
    };
    getData();
  }, [symbol]);

  console.log(data);

  if (!data || isLoading) return <div>balance sheet is loading</div>;

  if (data === "data not available" || !data.length)
    return <div>Data not available</div>;

  return (
    <div className="p-4 mb-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center">
          <p className="font-medium text-zinc-200 text-2xl mb-2">
            Balance Sheet
          </p>
          <div className="flex">
            <button
              onClick={handleSwitchPeriod}
              value="quarterly"
              className={`rounded-md text-xs font-medium px-2 py-1 mr-2 hover:text-violet-500 ${
                period === "quarterly"
                  ? "bg-white text-violet-500"
                  : "bg-zinc-800 text-zinc-200"
              } transition-all`}
            >
              Quarterly
            </button>
            <button
              onClick={handleSwitchPeriod}
              value="annual"
              className={`rounded-md text-xs font-medium hover:text-violet-500 px-2 py-1 ${
                period === "annual"
                  ? "bg-white text-violet-500"
                  : "bg-zinc-800 text-zinc-200"
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
              <td className="font-medium text-zinc-200 p-2 text-xs">
                Total Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.total_current_assets
                    ? data[0].assets.current_assets.total_current_assets
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.total_current_assets
                    ? data[1].assets.current_assets.total_current_assets
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.total_current_assets
                    ? data[2].assets.current_assets.total_current_assets
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.total_current_assets
                    ? data[3].assets.current_assets.total_current_assets
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">Cash</td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.cash
                    ? data[0].assets.current_assets.cash
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.cash
                    ? data[1].assets.current_assets.cash
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.cash
                    ? data[2].assets.current_assets.cash
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.cash
                    ? data[3].assets.current_assets.cash
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Cash Equivalents
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.cash_equivalents
                    ? data[0].assets.current_assets.cash_equivalents
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.cash_equivalents
                    ? data[1].assets.current_assets.cash_equivalents
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.cash_equivalents
                    ? data[2].assets.current_assets.cash_equivalents
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.cash_equivalents
                    ? data[3].assets.current_assets.cash_equivalents
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Cash & Cash Equivalents
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.cash_and_cash_equivalents
                    ? data[0].assets.current_assets.cash_and_cash_equivalents
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.cash_and_cash_equivalents
                    ? data[1].assets.current_assets.cash_and_cash_equivalents
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.cash_and_cash_equivalents
                    ? data[2].assets.current_assets.cash_and_cash_equivalents
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.cash_and_cash_equivalents
                    ? data[3].assets.current_assets.cash_and_cash_equivalents
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Short Term Investments
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.other_short_term_investments
                    ? data[0].assets.current_assets.other_short_term_investments
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.other_short_term_investments
                    ? data[1].assets.current_assets.other_short_term_investments
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.other_short_term_investments
                    ? data[2].assets.current_assets.other_short_term_investments
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.other_short_term_investments
                    ? data[3].assets.current_assets.other_short_term_investments
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Accounts Receivable
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.accounts_receivable
                    ? data[0].assets.current_assets.accounts_receivable
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.accounts_receivable
                    ? data[1].assets.current_assets.accounts_receivable
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.accounts_receivable
                    ? data[2].assets.current_assets.accounts_receivable
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.accounts_receivable
                    ? data[3].assets.current_assets.accounts_receivable
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Other Receivables
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.other_receivables
                    ? data[0].assets.current_assets.other_receivables
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.other_receivables
                    ? data[1].assets.current_assets.other_receivables
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.other_receivables
                    ? data[2].assets.current_assets.other_receivables
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.other_receivables
                    ? data[3].assets.current_assets.other_receivables
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Inventory
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.inventory
                    ? data[0].assets.current_assets.inventory
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.inventory
                    ? data[1].assets.current_assets.inventory
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.inventory
                    ? data[2].assets.current_assets.inventory
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.inventory
                    ? data[3].assets.current_assets.inventory
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Prepaid Assets
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.prepaid_assets
                    ? data[0].assets.prepaid_assets
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.prepaid_assets
                    ? data[1].assets.prepaid_assets
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.prepaid_assets
                    ? data[2].assets.prepaid_assets
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.prepaid_assets
                    ? data[3].assets.prepaid_assets
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Other Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.current_assets.other_current_assets
                    ? data[0].assets.current_assets.other_current_assets
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.current_assets.other_current_assets
                    ? data[1].assets.current_assets.other_current_assets
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.current_assets.other_current_assets
                    ? data[2].assets.current_assets.other_current_assets
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.current_assets.other_current_assets
                    ? data[3].assets.current_assets.other_current_assets
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300 bg-gray-100">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Total Non Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.total_non_current_assets
                    ? data[0].assets.non_current_assets.total_non_current_assets
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.total_non_current_assets
                    ? data[1].assets.non_current_assets.total_non_current_assets
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.total_non_current_assets
                    ? data[2].assets.non_current_assets.total_non_current_assets
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.total_non_current_assets
                    ? data[3].assets.non_current_assets.total_non_current_assets
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Properties
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.properties
                    ? data[0].assets.non_current_assets.properties
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.properties
                    ? data[1].assets.non_current_assets.properties
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.properties
                    ? data[2].assets.non_current_assets.properties
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.properties
                    ? data[3].assets.non_current_assets.properties
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Land & Improvements
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.land_and_improvements
                    ? data[0].assets.non_current_assets.land_and_improvements
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.land_and_improvements
                    ? data[1].assets.non_current_assets.land_and_improvements
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.land_and_improvements
                    ? data[2].assets.non_current_assets.land_and_improvements
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.land_and_improvements
                    ? data[3].assets.non_current_assets.land_and_improvements
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Machinery Equipment
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? data[0].assets.non_current_assets
                        .machinery_furniture_equipment
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? data[1].assets.non_current_assets
                        .machinery_furniture_equipment
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? data[2].assets.non_current_assets
                        .machinery_furniture_equipment
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? data[3].assets.non_current_assets
                        .machinery_furniture_equipment
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">Leases</td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.leases
                    ? data[0].assets.non_current_assets.leases
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.leases
                    ? data[1].assets.non_current_assets.leases
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.leases
                    ? data[2].assets.non_current_assets.leases
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.leases
                    ? data[3].assets.non_current_assets.leases
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Accumulated Depreciation
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.accumulated_depreciation
                    ? data[0].assets.non_current_assets.accumulated_depreciation
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.accumulated_depreciation
                    ? data[1].assets.non_current_assets.accumulated_depreciation
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.accumulated_depreciation
                    ? data[2].assets.non_current_assets.accumulated_depreciation
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.accumulated_depreciation
                    ? data[3].assets.non_current_assets.accumulated_depreciation
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Intangible Assets
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.intangible_assets
                    ? data[0].assets.non_current_assets.intangible_assets
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.intangible_assets
                    ? data[1].assets.non_current_assets.intangible_assets
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.intangible_assets
                    ? data[2].assets.non_current_assets.intangible_assets
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.intangible_assets
                    ? data[3].assets.non_current_assets.intangible_assets
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Investments & Advances
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.investments_and_advances
                    ? data[0].assets.non_current_assets.investments_and_advances
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.investments_and_advances
                    ? data[1].assets.non_current_assets.investments_and_advances
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.investments_and_advances
                    ? data[2].assets.non_current_assets.investments_and_advances
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.investments_and_advances
                    ? data[3].assets.non_current_assets.investments_and_advances
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Other Non Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.non_current_assets.other_non_current_assets
                    ? data[0].assets.non_current_assets.other_non_current_assets
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.non_current_assets.other_non_current_assets
                    ? data[1].assets.non_current_assets.other_non_current_assets
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.non_current_assets.other_non_current_assets
                    ? data[2].assets.non_current_assets.other_non_current_assets
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.non_current_assets.other_non_current_assets
                    ? data[3].assets.non_current_assets.other_non_current_assets
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300 bg-gray-200">
              <td className="font-semibold text-gray-800 p-2 text-xs">
                Total Assets
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].assets.total_assets
                    ? data[0].assets.total_assets
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].assets.total_assets
                    ? data[1].assets.total_assets
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].assets.total_assets
                    ? data[2].assets.total_assets
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].assets.total_assets
                    ? data[3].assets.total_assets
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300 bg-gray-100">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Total Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.current_liabilities
                    .total_current_liabilities
                    ? data[0].liabilities.current_liabilities
                        .total_current_liabilities
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.current_liabilities
                    .total_current_liabilities
                    ? data[1].liabilities.current_liabilities
                        .total_current_liabilities
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.current_liabilities
                    .total_current_liabilities
                    ? data[2].liabilities.current_liabilities
                        .total_current_liabilities
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.current_liabilities
                    .total_current_liabilities
                    ? data[3].liabilities.current_liabilities
                        .total_current_liabilities
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Accounts Payable
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.current_liabilities.accounts_payable
                    ? data[0].liabilities.current_liabilities.accounts_payable
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.current_liabilities.accounts_payable
                    ? data[1].liabilities.current_liabilities.accounts_payable
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.current_liabilities.accounts_payable
                    ? data[2].liabilities.current_liabilities.accounts_payable
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.current_liabilities.accounts_payable
                    ? data[3].liabilities.current_liabilities.accounts_payable
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Accrued Expenses
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.current_liabilities.accrued_expenses
                    ? data[0].liabilities.current_liabilities.accrues_expenses
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.current_liabilities.accrued_expenses
                    ? data[1].liabilities.current_liabilities.accrues_expenses
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.current_liabilities.accrued_expenses
                    ? data[2].liabilities.current_liabilities.accrues_expenses
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.current_liabilities.accrued_expenses
                    ? data[3].liabilities.current_liabilities.accrues_expenses
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Short Term Debt
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.current_liabilities.short_term_debt
                    ? data[0].liabilities.current_liabilities.short_term_debt
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.current_liabilities.short_term_debt
                    ? data[1].liabilities.current_liabilities.short_term_debt
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.current_liabilities.short_term_debt
                    ? data[2].liabilities.current_liabilities.short_term_debt
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.current_liabilities.short_term_debt
                    ? data[3].liabilities.current_liabilities.short_term_debt
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Deferred Revenue
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.current_liabilities.deferred_revenue
                    ? data[0].liabilities.current_liabilities.deferred_revenue
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.current_liabilities.deferred_revenue
                    ? data[1].liabilities.current_liabilities.deferred_revenue
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.current_liabilities.deferred_revenue
                    ? data[2].liabilities.current_liabilities.deferred_revenue
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.current_liabilities.deferred_revenue
                    ? data[3].liabilities.current_liabilities.deferred_revenue
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Other Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.current_liabilities
                    .other_current_liabilities
                    ? data[0].liabilities.current_liabilities
                        .other_current_liabilities
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.current_liabilities
                    .other_current_liabilities
                    ? data[1].liabilities.current_liabilities
                        .other_current_liabilities
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.current_liabilities
                    .other_current_liabilities
                    ? data[2].liabilities.current_liabilities
                        .other_current_liabilities
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.current_liabilities
                    .other_current_liabilities
                    ? data[3].liabilities.current_liabilities
                        .other_current_liabilities
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Tax Payable
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.current_liabilities.tax_payable
                    ? data[0].liabilities.current_liabilities.tax_payable
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.current_liabilities.tax_payable
                    ? data[1].liabilities.current_liabilities.tax_payable
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.current_liabilities.tax_payable
                    ? data[2].liabilities.current_liabilities.tax_payable
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.current_liabilities.tax_payable
                    ? data[3].liabilities.current_liabilities.tax_payable
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300 bg-gray-100">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Total Non Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? data[0].liabilities.non_current_liabilities
                        .total_non_current_liabilities
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? data[1].liabilities.non_current_liabilities
                        .total_non_current_liabilities
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? data[2].liabilities.non_current_liabilities
                        .total_non_current_liabilities
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? data[3].liabilities.non_current_liabilities
                        .total_non_current_liabilities
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Long Term Debt
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.non_current_liabilities.long_term_debt
                    ? data[0].liabilities.non_current_liabilities.long_term_debt
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.non_current_liabilities.long_term_debt
                    ? data[1].liabilities.non_current_liabilities.long_term_debt
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.non_current_liabilities.long_term_debt
                    ? data[2].liabilities.non_current_liabilities.long_term_debt
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.non_current_liabilities.long_term_debt
                    ? data[3].liabilities.non_current_liabilities.long_term_debt
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Provision for Risks & Charges
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? data[0].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? data[1].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? data[2].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? data[3].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Deferred Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? data[0].liabilities.non_current_liabilities
                        .deferred_liabilities
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? data[1].liabilities.non_current_liabilities
                        .deferred_liabilities
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? data[2].liabilities.non_current_liabilities
                        .deferred_liabilities
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? data[3].liabilities.non_current_liabilities
                        .deferred_liabilities
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Other Non Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? data[0].liabilities.non_current_liabilities
                        .other_non_current_liabilities
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? data[1].liabilities.non_current_liabilities
                        .other_non_current_liabilities
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? data[2].liabilities.non_current_liabilities
                        .other_non_current_liabilities
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? data[3].liabilities.non_current_liabilities
                        .other_non_current_liabilities
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Long Term Provisions
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? data[0].liabilities.non_current_liabilities
                        .long_term_provisions
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? data[1].liabilities.non_current_liabilities
                        .long_term_provisions
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? data[2].liabilities.non_current_liabilities
                        .long_term_provisions
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? data[3].liabilities.non_current_liabilities
                        .long_term_provisions
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300 bg-gray-200">
              <td className="font-semibold text-gray-800 p-2 text-xs">
                Total Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].liabilities.total_liabilities
                    ? data[0].liabilities.total_liabilities
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].liabilities.total_liabilities
                    ? data[1].liabilities.total_liabilities
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].liabilities.total_liabilities
                    ? data[2].liabilities.total_liabilities
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].liabilities.total_liabilities
                    ? data[3].liabilities.total_liabilities
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300 bg-gray-100">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Total Shareholder Equity
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].shareholders_equity.total_shareholders_equity
                    ? data[0].shareholders_equity.total_shareholders_equity
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].shareholders_equity.total_shareholders_equity
                    ? data[1].shareholders_equity.total_shareholders_equity
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].shareholders_equity.total_shareholders_equity
                    ? data[2].shareholders_equity.total_shareholders_equity
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].shareholders_equity.total_shareholders_equity
                    ? data[3].shareholders_equity.total_shareholders_equity
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Common Stock
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].shareholders_equity.common_stock
                    ? data[0].shareholders_equity.common_stock
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].shareholders_equity.common_stock
                    ? data[1].shareholders_equity.common_stock
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].shareholders_equity.common_stock
                    ? data[2].shareholders_equity.common_stock
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].shareholders_equity.common_stock
                    ? data[3].shareholders_equity.common_stock
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Retained Eearnings
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].shareholders_equity.retained_earnings
                    ? data[0].shareholders_equity.retained_earnings
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].shareholders_equity.retained_earnings
                    ? data[1].shareholders_equity.retained_earnings
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].shareholders_equity.retained_earnings
                    ? data[2].shareholders_equity.retained_earnings
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].shareholders_equity.retained_earnings
                    ? data[3].shareholders_equity.retained_earnings
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Other Shareholder Equity
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].shareholders_equity.other_shareholders_equity
                    ? data[0].shareholders_equity.other_shareholders_equity
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].shareholders_equity.other_shareholders_equity
                    ? data[1].shareholders_equity.other_shareholders_equity
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].shareholders_equity.other_shareholders_equity
                    ? data[2].shareholders_equity.other_shareholders_equity
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].shareholders_equity.other_shareholders_equity
                    ? data[3].shareholders_equity.other_shareholders_equity
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Additional Paid in Capital
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].shareholders_equity.additional_paid_in_capital
                    ? data[0].shareholders_equity.additional_paid_in_capital
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].shareholders_equity.additional_paid_in_capital
                    ? data[1].shareholders_equity.additional_paid_in_capital
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].shareholders_equity.additional_paid_in_capital
                    ? data[2].shareholders_equity.additional_paid_in_capital
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].shareholders_equity.additional_paid_in_capital
                    ? data[3].shareholders_equity.additional_paid_in_capital
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Treasury Stock
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].shareholders_equity.treasury_stock
                    ? data[0].shareholders_equity.treasury_stock
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].shareholders_equity.treasury_stock
                    ? data[1].shareholders_equity.treasury_stock
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].shareholders_equity.treasury_stock
                    ? data[2].shareholders_equity.treasury_stock
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].shareholders_equity.treasury_stock
                    ? data[3].shareholders_equity.treasury_stock
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Minority Interest
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].shareholders_equity.minority_interest
                    ? data[0].shareholders_equity.minority_interest
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].shareholders_equity.minority_interest
                    ? data[1].shareholders_equity.minority_interest
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].shareholders_equity.minority_interest
                    ? data[2].shareholders_equity.minority_interest
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].shareholders_equity.minority_interest
                    ? data[3].shareholders_equity.minority_interest
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

export default Balance;
