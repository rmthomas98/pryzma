import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SymbolContext from "../SymbolContext";
import millify from "millify";

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
              <td className="font-medium text-violet-500 p-2 text-xs">
                Total Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.total_current_assets
                    ? millify(data[0].assets.current_assets.total_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.total_current_assets
                    ? millify(data[1].assets.current_assets.total_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.total_current_assets
                    ? millify(data[2].assets.current_assets.total_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.total_current_assets
                    ? millify(data[3].assets.current_assets.total_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">Cash</td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.cash
                    ? millify(data[0].assets.current_assets.cash, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.cash
                    ? millify(data[1].assets.current_assets.cash, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.cash
                    ? millify(data[2].assets.current_assets.cash, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.cash
                    ? millify(data[3].assets.current_assets.cash, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Cash Equivalents
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.cash_equivalents
                    ? millify(data[0].assets.current_assets.cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.cash_equivalents
                    ? millify(data[1].assets.current_assets.cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.cash_equivalents
                    ? millify(data[2].assets.current_assets.cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.cash_equivalents
                    ? millify(data[3].assets.current_assets.cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Cash & Cash Equivalents
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.cash_and_cash_equivalents
                    ? millify(data[0].assets.current_assets.cash_and_cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.cash_and_cash_equivalents
                    ? millify(data[1].assets.current_assets.cash_and_cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.cash_and_cash_equivalents
                    ? millify(data[2].assets.current_assets.cash_and_cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.cash_and_cash_equivalents
                    ? millify(data[3].assets.current_assets.cash_and_cash_equivalents, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Short Term Investments
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.other_short_term_investments
                    ? millify(data[0].assets.current_assets.other_short_term_investments, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.other_short_term_investments
                    ? millify(data[1].assets.current_assets.other_short_term_investments, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.other_short_term_investments
                    ? millify(data[2].assets.current_assets.other_short_term_investments, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.other_short_term_investments
                    ? millify(data[3].assets.current_assets.other_short_term_investments, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Accounts Receivable
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.accounts_receivable
                    ? millify(data[0].assets.current_assets.accounts_receivable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.accounts_receivable
                    ? millify(data[1].assets.current_assets.accounts_receivable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.accounts_receivable
                    ? millify(data[2].assets.current_assets.accounts_receivable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.accounts_receivable
                    ? millify(data[3].assets.current_assets.accounts_receivable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Other Receivables
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.other_receivables
                    ? millify(data[0].assets.current_assets.other_receivables, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.other_receivables
                    ? millify(data[1].assets.current_assets.other_receivables, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.other_receivables
                    ? millify(data[2].assets.current_assets.other_receivables, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.other_receivables
                    ? millify(data[3].assets.current_assets.other_receivables, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Inventory
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.inventory
                    ? millify(data[0].assets.current_assets.inventory, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.inventory
                    ? millify(data[1].assets.current_assets.inventory, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.inventory
                    ? millify(data[2].assets.current_assets.inventory, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.inventory
                    ? millify(data[3].assets.current_assets.inventory, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Prepaid Assets
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.prepaid_assets
                    ? millify(data[0].assets.current_assets.prepaid_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.prepaid_assets
                    ? millify(data[1].assets.current_assets.prepaid_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.prepaid_assets
                    ? millify(data[2].assets.current_assets.prepaid_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.prepaid_assets
                    ? millify(data[3].assets.current_assets.prepaid_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 text-xs p-2">
                Other Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.current_assets.other_current_assets
                    ? millify(data[0].assets.current_assets.other_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.current_assets.other_current_assets
                    ? millify(data[1].assets.current_assets.other_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.current_assets.other_current_assets
                    ? millify(data[2].assets.current_assets.other_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.current_assets.other_current_assets
                    ? millify(data[3].assets.current_assets.other_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-violet-500 p-2 text-xs">
                Total Non Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.total_non_current_assets
                    ? millify(data[0].assets.non_current_assets.total_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.total_non_current_assets
                    ? millify(data[1].assets.non_current_assets.total_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.total_non_current_assets
                    ? millify(data[2].assets.non_current_assets.total_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.total_non_current_assets
                    ? millify(data[3].assets.non_current_assets.total_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Properties
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.properties
                    ? millify(data[0].assets.non_current_assets.properties, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.properties
                    ? millify(data[1].assets.non_current_assets.properties, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.properties
                    ? millify(data[2].assets.non_current_assets.properties, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.properties
                    ? millify(data[3].assets.non_current_assets.properties, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Land & Improvements
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.land_and_improvements
                    ? millify(data[0].assets.non_current_assets.land_and_improvements, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.land_and_improvements
                    ? millify(data[1].assets.non_current_assets.land_and_improvements, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.land_and_improvements
                    ? millify(data[2].assets.non_current_assets.land_and_improvements, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.land_and_improvements
                    ? millify(data[3].assets.non_current_assets.land_and_improvements, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Machinery Equipment
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? millify(data[0].assets.non_current_assets
                        .machinery_furniture_equipment, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? millify(data[1].assets.non_current_assets
                        .machinery_furniture_equipment, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? millify(data[2].assets.non_current_assets
                        .machinery_furniture_equipment, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets
                    .machinery_furniture_equipment
                    ? millify(data[3].assets.non_current_assets
                        .machinery_furniture_equipment, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">Leases</td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.leases
                    ? millify(data[0].assets.non_current_assets.leases, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.leases
                    ? millify(data[1].assets.non_current_assets.leases, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.leases
                    ? millify(data[2].assets.non_current_assets.leases, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.leases
                    ? millify(data[3].assets.non_current_assets.leases, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Accumulated Depreciation
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.accumulated_depreciation
                    ? millify(data[0].assets.non_current_assets.accumulated_depreciation, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.accumulated_depreciation
                    ? millify(data[1].assets.non_current_assets.accumulated_depreciation, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.accumulated_depreciation
                    ? millify(data[2].assets.non_current_assets.accumulated_depreciation, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.accumulated_depreciation
                    ? millify(data[3].assets.non_current_assets.accumulated_depreciation, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Intangible Assets
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.intangible_assets
                    ? millify(data[0].assets.non_current_assets.intangible_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.intangible_assets
                    ? millify(data[1].assets.non_current_assets.intangible_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.intangible_assets
                    ? millify(data[2].assets.non_current_assets.intangible_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.intangible_assets
                    ? millify(data[3].assets.non_current_assets.intangible_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Investments & Advances
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.investments_and_advances
                    ? millify(data[0].assets.non_current_assets.investments_and_advances, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.investments_and_advances
                    ? millify(data[1].assets.non_current_assets.investments_and_advances, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.investments_and_advances
                    ? millify(data[2].assets.non_current_assets.investments_and_advances, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.investments_and_advances
                    ? millify(data[3].assets.non_current_assets.investments_and_advances, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Non Current Assets
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].assets.non_current_assets.other_non_current_assets
                    ? millify(data[0].assets.non_current_assets.other_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].assets.non_current_assets.other_non_current_assets
                    ? millify(data[1].assets.non_current_assets.other_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].assets.non_current_assets.other_non_current_assets
                    ? millify(data[2].assets.non_current_assets.other_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].assets.non_current_assets.other_non_current_assets
                    ? millify(data[3].assets.non_current_assets.other_non_current_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800 bg-zinc-800">
              <td className="font-medium text-white p-2 text-xs">
                Total Assets
              </td>
              {data[0] && (
                <td className="font-medium text-white text-xs">
                  {data[0].assets.total_assets
                    ? millify(data[0].assets.total_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-white text-xs">
                  {data[1].assets.total_assets
                    ? millify(data[1].assets.total_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-white text-xs">
                  {data[2].assets.total_assets
                    ? millify(data[2].assets.total_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-white text-xs">
                  {data[3].assets.total_assets
                    ? millify(data[3].assets.total_assets, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-violet-500 p-2 text-xs">
                Total Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.current_liabilities
                    .total_current_liabilities
                    ? millify(data[0].liabilities.current_liabilities
                        .total_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.current_liabilities
                    .total_current_liabilities
                    ? millify(data[1].liabilities.current_liabilities
                        .total_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.current_liabilities
                    .total_current_liabilities
                    ? millify(data[2].liabilities.current_liabilities
                        .total_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.current_liabilities
                    .total_current_liabilities
                    ? millify(data[3].liabilities.current_liabilities
                        .total_current_liabilities, {precision: 2, space: true})
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
                  {data[0].liabilities.current_liabilities.accounts_payable
                    ? millify(data[0].liabilities.current_liabilities.accounts_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.current_liabilities.accounts_payable
                    ? millify(data[1].liabilities.current_liabilities.accounts_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.current_liabilities.accounts_payable
                    ? millify(data[2].liabilities.current_liabilities.accounts_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.current_liabilities.accounts_payable
                    ? millify(data[3].liabilities.current_liabilities.accounts_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Accrued Expenses
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.current_liabilities.accrued_expenses
                    ? millify(data[0].liabilities.current_liabilities.accrued_expenses, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.current_liabilities.accrued_expenses
                    ? millify(data[1].liabilities.current_liabilities.accrued_expenses, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.current_liabilities.accrued_expenses
                    ? millify(data[2].liabilities.current_liabilities.accrued_expenses, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.current_liabilities.accrued_expenses
                    ? millify(data[3].liabilities.current_liabilities.accrued_expenses, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Short Term Debt
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.current_liabilities.short_term_debt
                    ? millify(data[0].liabilities.current_liabilities.short_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.current_liabilities.short_term_debt
                    ? millify(data[1].liabilities.current_liabilities.short_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.current_liabilities.short_term_debt
                    ? millify(data[2].liabilities.current_liabilities.short_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.current_liabilities.short_term_debt
                    ? millify(data[3].liabilities.current_liabilities.short_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Deferred Revenue
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.current_liabilities.deferred_revenue
                    ? millify(data[0].liabilities.current_liabilities.deferred_revenue, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.current_liabilities.deferred_revenue
                    ? millify(data[1].liabilities.current_liabilities.deferred_revenue, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.current_liabilities.deferred_revenue
                    ? millify(data[2].liabilities.current_liabilities.deferred_revenue, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.current_liabilities.deferred_revenue
                    ? millify(data[3].liabilities.current_liabilities.deferred_revenue, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.current_liabilities
                    .other_current_liabilities
                    ? millify(data[0].liabilities.current_liabilities
                        .other_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.current_liabilities
                    .other_current_liabilities
                    ? millify(data[1].liabilities.current_liabilities
                        .other_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.current_liabilities
                    .other_current_liabilities
                    ? millify(data[2].liabilities.current_liabilities
                        .other_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.current_liabilities
                    .other_current_liabilities
                    ? millify(data[3].liabilities.current_liabilities
                        .other_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Tax Payable
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.current_liabilities.tax_payable
                    ? millify(data[0].liabilities.current_liabilities.tax_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.current_liabilities.tax_payable
                    ? millify(data[1].liabilities.current_liabilities.tax_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.current_liabilities.tax_payable
                    ? millify(data[2].liabilities.current_liabilities.tax_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.current_liabilities.tax_payable
                    ? millify(data[3].liabilities.current_liabilities.tax_payable, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-violet-500 p-2 text-xs">
                Total Non Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? millify(data[0].liabilities.non_current_liabilities
                        .total_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? millify(data[1].liabilities.non_current_liabilities
                        .total_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? millify(data[2].liabilities.non_current_liabilities
                        .total_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .total_non_current_liabilities
                    ? millify(data[3].liabilities.non_current_liabilities
                        .total_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Long Term Debt
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.non_current_liabilities.long_term_debt
                    ? millify(data[0].liabilities.non_current_liabilities.long_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.non_current_liabilities.long_term_debt
                    ? millify(data[1].liabilities.non_current_liabilities.long_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.non_current_liabilities.long_term_debt
                    ? millify(data[2].liabilities.non_current_liabilities.long_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.non_current_liabilities.long_term_debt
                    ? millify(data[3].liabilities.non_current_liabilities.long_term_debt, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Provision for Risks & Charges
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? millify(data[0].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? millify(data[1].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? millify(data[2].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .provision_for_risks_and_charges
                    ? millify(data[3].liabilities.non_current_liabilities
                        .provision_for_risks_and_charges, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Deferred Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? millify(data[0].liabilities.non_current_liabilities
                        .deferred_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? millify(data[1].liabilities.non_current_liabilities
                        .deferred_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? millify(data[2].liabilities.non_current_liabilities
                        .deferred_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .deferred_liabilities
                    ? millify(data[3].liabilities.non_current_liabilities
                        .deferred_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Non Current Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? millify(data[0].liabilities.non_current_liabilities
                        .other_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? millify(data[1].liabilities.non_current_liabilities
                        .other_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? millify(data[2].liabilities.non_current_liabilities
                        .other_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .other_non_current_liabilities
                    ? millify(data[3].liabilities.non_current_liabilities
                        .other_non_current_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Long Term Provisions
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? millify(data[0].liabilities.non_current_liabilities
                        .long_term_provisions, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? millify(data[1].liabilities.non_current_liabilities
                        .long_term_provisions, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? millify(data[2].liabilities.non_current_liabilities
                        .long_term_provisions, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].liabilities.non_current_liabilities
                    .long_term_provisions
                    ? millify(data[3].liabilities.non_current_liabilities
                        .long_term_provisions, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800 bg-zinc-800">
              <td className="font-medium text-white p-2 text-xs">
                Total Liabilities
              </td>
              {data[0] && (
                <td className="font-medium text-white text-xs">
                  {data[0].liabilities.total_liabilities
                    ? millify(data[0].liabilities.total_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-white text-xs">
                  {data[1].liabilities.total_liabilities
                    ? millify(data[1].liabilities.total_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-white text-xs">
                  {data[2].liabilities.total_liabilities
                    ? millify(data[2].liabilities.total_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-white text-xs">
                  {data[3].liabilities.total_liabilities
                    ? millify(data[3].liabilities.total_liabilities, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Common Stock
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].shareholders_equity.common_stock
                    ? millify(data[0].shareholders_equity.common_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].shareholders_equity.common_stock
                    ? millify(data[1].shareholders_equity.common_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].shareholders_equity.common_stock
                    ? millify(data[2].shareholders_equity.common_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].shareholders_equity.common_stock
                    ? millify(data[3].shareholders_equity.common_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Retained Eearnings
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].shareholders_equity.retained_earnings
                    ? millify(data[0].shareholders_equity.retained_earnings, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].shareholders_equity.retained_earnings
                    ? millify(data[1].shareholders_equity.retained_earnings, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].shareholders_equity.retained_earnings
                    ? millify(data[2].shareholders_equity.retained_earnings, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].shareholders_equity.retained_earnings
                    ? millify(data[3].shareholders_equity.retained_earnings, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Other Shareholder Equity
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].shareholders_equity.other_shareholders_equity
                    ? millify(data[0].shareholders_equity.other_shareholders_equity, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].shareholders_equity.other_shareholders_equity
                    ? millify(data[1].shareholders_equity.other_shareholders_equity, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].shareholders_equity.other_shareholders_equity
                    ? millify(data[2].shareholders_equity.other_shareholders_equity, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].shareholders_equity.other_shareholders_equity
                    ? millify(data[3].shareholders_equity.other_shareholders_equity, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Additional Paid in Capital
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].shareholders_equity.additional_paid_in_capital
                    ? millify(data[0].shareholders_equity.additional_paid_in_capital, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].shareholders_equity.additional_paid_in_capital
                    ? millify(data[1].shareholders_equity.additional_paid_in_capital, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].shareholders_equity.additional_paid_in_capital
                    ? millify(data[2].shareholders_equity.additional_paid_in_capital, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].shareholders_equity.additional_paid_in_capital
                    ? millify(data[3].shareholders_equity.additional_paid_in_capital, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Treasury Stock
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].shareholders_equity.treasury_stock
                    ? millify(data[0].shareholders_equity.treasury_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].shareholders_equity.treasury_stock
                    ? millify(data[1].shareholders_equity.treasury_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].shareholders_equity.treasury_stock
                    ? millify(data[2].shareholders_equity.treasury_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].shareholders_equity.treasury_stock
                    ? millify(data[3].shareholders_equity.treasury_stock, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-400 p-2 text-xs">
                Minority Interest
              </td>
              {data[0] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[0].shareholders_equity.minority_interest
                    ? millify(data[0].shareholders_equity.minority_interest, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[1].shareholders_equity.minority_interest
                    ? millify(data[1].shareholders_equity.minority_interest, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[2].shareholders_equity.minority_interest
                    ? millify(data[2].shareholders_equity.minority_interest, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-zinc-400 text-xs">
                  {data[3].shareholders_equity.minority_interest
                    ? millify(data[3].shareholders_equity.minority_interest, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-zinc-800 bg-zinc-800">
              <td className="font-medium text-white p-2 text-xs">
                Total Shareholder Equity
              </td>
              {data[0] && (
                <td className="font-medium text-white text-xs">
                  {data[0].shareholders_equity.total_shareholders_equity
                    ? millify(data[0].shareholders_equity.total_shareholders_equity, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-white text-xs">
                  {data[1].shareholders_equity.total_shareholders_equity
                    ? millify(data[1].shareholders_equity.total_shareholders_equity, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-white text-xs">
                  {data[2].shareholders_equity.total_shareholders_equity
                    ? millify(data[2].shareholders_equity.total_shareholders_equity, {precision: 2, space: true})
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-white text-xs">
                  {data[3].shareholders_equity.total_shareholders_equity
                    ? millify(data[3].shareholders_equity.total_shareholders_equity, {precision: 2, space: true})
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
