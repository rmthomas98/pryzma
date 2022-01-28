import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SymbolContext from "../SymbolContext";

const Income = ({ user }) => {
  const { symbol } = useContext(SymbolContext);
  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

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

  console.log(data);

  if (!data || isLoading) return <div>income statement is loading</div>;

  if (data === "data not available") return <div>Data not available</div>;

  return (
    <div className="p-4">
      <div className="mx-auto max-w-7xl">
        <p className="font-bold text-gray-900 text-2xl mb-2">
          Income Statement
        </p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <td className="text-sm font-semibold text-gray-800 p-2">
                Break Down
              </td>
              <td className="text-sm font-semibold text-gray-800">
                {data[0] ? data[0].fiscal_date : ""}
              </td>
              {data[1] ? (
                <td className="text-sm font-semibold text-gray-800">
                  {data[1].fiscal_date}
                </td>
              ) : (
                ""
              )}
              {data[2] ? (
                <td className="text-sm font-semibold text-gray-800">
                  {data[2].fiscal_date}
                </td>
              ) : (
                ""
              )}
              {data[3] ? (
                <td className="text-sm font-semibold text-gray-800">
                  {data[3].fiscal_date}
                </td>
              ) : (
                ""
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">Sales</td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].sales ? data[0].sales : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].sales ? data[1].sales : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].sales ? data[2].sales : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].sales ? data[3].sales : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Cost of Goods
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].cost_of_goods ? data[0].cost_of_goods : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].cost_of_goods ? data[1].cost_of_goods : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].cost_of_goods ? data[2].cost_of_goods : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].cost_of_goods ? data[3].cost_of_goods : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 p-2 text-xs">
                Gross Profit
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].gross_profit ? data[0].gross_profit : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].cost_of_goods ? data[1].cost_of_goods : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].cost_of_goods ? data[2].cost_of_goods : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].cost_of_goods ? data[3].cost_of_goods : "-"}
                </td>
              )}
            </tr>
            <tr>
              <td className="text-sm font-semibold text-gray-800 p-2 pt-6">
                Operating Expenses
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2 pl-6">
                Research & Development
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].operating_expense.research_and_development
                    ? data[0].operating_expense.research_and_development
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].operating_expense.research_and_development
                    ? data[1].operating_expense.research_and_development
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].operating_expense.research_and_development
                    ? data[2].operating_expense.research_and_development
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].operating_expense.research_and_development
                    ? data[3].operating_expense.research_and_development
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2 pl-6">
                Selling General & Administrative
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].operating_expense.selling_general_and_administrative
                    ? data[0].operating_expense
                        .selling_general_and_administrative
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].operating_expense.selling_general_and_administrative
                    ? data[1].operating_expense
                        .selling_general_and_administrative
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].operating_expense.selling_general_and_administrative
                    ? data[2].operating_expense
                        .selling_general_and_administrative
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].operating_expense.selling_general_and_administrative
                    ? data[3].operating_expense
                        .selling_general_and_administrative
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2 pl-6">
                Other Operating Expenses
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].operating_expense.other_operating_expenses
                    ? data[0].operating_expense.other_operating_expenses
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].operating_expense.other_operating_expenses
                    ? data[1].operating_expense.other_operating_expenses
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].operating_expense.other_operating_expenses
                    ? data[2].operating_expense.other_operating_expenses
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].operating_expense.other_operating_expenses
                    ? data[3].operating_expense.other_operating_expenses
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2">
                Operating Income
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].operating_income ? data[0].operating_income : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].operating_income ? data[1].operating_income : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].operating_income ? data[2].operating_income : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].operating_income ? data[3].operating_income : "-"}
                </td>
              )}
            </tr>
            <tr>
              <td className="text-sm font-semibold text-gray-800 p-2 pt-6">
                Non Operating Interest
              </td>
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2 pl-6">
                Income
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].non_operating_interest.income
                    ? data[0].non_operating_interest.income
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].non_operating_interest.income
                    ? data[1].non_operating_interest.income
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].non_operating_interest.income
                    ? data[2].non_operating_interest.income
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].non_operating_interest.income
                    ? data[3].non_operating_interest.income
                    : "-"}
                </td>
              )}
            </tr>
            <tr className="border-b border-gray-300">
              <td className="font-medium text-gray-800 text-xs p-2 pl-6">
                Expense
              </td>
              {data[0] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[0].non_operating_interest.expense
                    ? data[0].non_operating_interest.expense
                    : "-"}
                </td>
              )}
              {data[1] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[1].non_operating_interest.expense
                    ? data[1].non_operating_interest.expense
                    : "-"}
                </td>
              )}
              {data[2] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[2].non_operating_interest.expense
                    ? data[2].non_operating_interest.expense
                    : "-"}
                </td>
              )}
              {data[3] && (
                <td className="font-medium text-gray-800 text-xs">
                  {data[3].non_operating_interest.expense
                    ? data[3].non_operating_interest.expense
                    : "-"}
                </td>
              )}
            </tr>
          </thead>
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
