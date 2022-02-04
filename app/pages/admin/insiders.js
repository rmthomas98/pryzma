import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SymbolContext from "../SymbolContext";
import millify from "millify";
import { format } from "date-fns";
import Head from "next/head";

const Insiders = ({ user }) => {
  const { symbol } = useContext(SymbolContext);
  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    setUser(user);
  }, []);

  useEffect(() => {
    if (!symbol) return;
    setData();
    setIsLoading(true);

    const getData = async () => {
      const response = await axios.post("/api/get-insiders", {
        symbol: symbol[0],
      });
      const price = await axios.post("/api/get-quote", { symbol: symbol[0] });
      if (response.data.length && price.data.latestPrice) {
        setData(response.data);
        setPrice(price.data.latestPrice);
        return setIsLoading(false);
      }
      setIsLoading(false);
      setData("data not available");
    };
    getData();
  }, [symbol]);

  if (!symbol)
    return (
      <div className="p-4 opacity-0 animate-fadeIn">
        <Head>
          <title>Pryzma - Insider Ownership</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Insider Ownership" />
          <meta name="keywords" content="pryzma, insider ownership" />
        </Head>
        <div className="max-w-7xl mx-auto">
          <div className="mx-auto w-fit p-4 border border-violet-500 rounded-md bg-zinc-800 mt-10">
            <p className="text-zinc-300 font-medium text-sm text-center">
              Search for a stock above to view info
            </p>
          </div>
        </div>
      </div>
    );

  if (!data || isLoading)
    return (
      <div className="px-4">
        <Head>
          <title>Pryzma - Insider Ownership - {symbol[0]}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Insider Ownership" />
          <meta name="keywords" content="pryzma, insider ownership" />
        </Head>
        <div className="max-w-7xl mx-auto mt-4">
          <div className="p-4 max-w-[300px] w-full bg-zinc-800 animate-pulse rounded-md"></div>
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
      <div className="p-4 mx-auto rounded-md border w-fit border-violet-500 bg-zinc-800 mt-10 opacity-0 animate-fadeIn">
        <Head>
          <title>Pryzma - Insider Ownership - {symbol[0]}</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Insider Ownership" />
          <meta name="keywords" content="pryzma, insider ownership" />
        </Head>
        <p className="font-medium text-zinc-200 text-sm">
          No data available for {symbol[0]}
        </p>
      </div>
    );

  return (
    <div className="p-4 opacity-0 animate-fadeIn">
      <Head>
        <title>Pryzma - Insider Ownership - {symbol[0]}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Insider Ownership" />
        <meta name="keywords" content="pryzma, insider ownership" />
      </Head>
      <div className="max-w-7xl mx-auto">
        <p className="font-medium text-zinc-200 text-2xl mb-2">Top Insiders</p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <td className="text-xs font-medium text-zinc-200 p-2">Holder</td>
              <td className="text-xs font-medium text-zinc-200">Shares</td>
              <td className="text-xs font-medium text-zinc-200">
                Date Reported
              </td>
              <td className="text-xs font-medium text-zinc-200">
                Current Value
              </td>
            </tr>
          </thead>
          <tbody>
            {data[0] && data[0].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[0].entityName
                    ? data[0].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].position
                    ? millify(data[0].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].reportDate
                    ? format(new Date(data[0].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[0].position
                    ? `$ ${millify(data[0].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[1] && data[1].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[1].entityName
                    ? data[1].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].position
                    ? millify(data[1].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].reportDate
                    ? format(new Date(data[1].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[1].position
                    ? `$ ${millify(data[1].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[2] && data[2].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[2].entityName
                    ? data[2].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].position
                    ? millify(data[2].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].reportDate
                    ? format(new Date(data[2].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[2].position
                    ? `$ ${millify(data[2].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[3] && data[3].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[3].entityName
                    ? data[3].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].position
                    ? millify(data[3].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].reportDate
                    ? format(new Date(data[3].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[3].position
                    ? `$ ${millify(data[3].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[4] && data[4].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[4].entityName
                    ? data[4].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[4].position
                    ? millify(data[4].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[4].reportDate
                    ? format(new Date(data[4].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[4].position
                    ? `$ ${millify(data[4].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[5] && data[5].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[5].entityName
                    ? data[5].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[5].position
                    ? millify(data[5].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[5].reportDate
                    ? format(new Date(data[5].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[5].position
                    ? `$ ${millify(data[5].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[6] && data[6].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[6].entityName
                    ? data[6].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[6].position
                    ? millify(data[6].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[6].reportDate
                    ? format(new Date(data[6].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[6].position
                    ? `$ ${millify(data[6].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[7] && data[7].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[7].entityName
                    ? data[7].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[7].position
                    ? millify(data[7].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[7].reportDate
                    ? format(new Date(data[7].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[7].position
                    ? `$ ${millify(data[7].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[8] && data[8].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[8].entityName
                    ? data[8].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[8].position
                    ? millify(data[8].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[8].reportDate
                    ? format(new Date(data[8].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[8].position
                    ? `$ ${millify(data[8].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
            {data[9] && data[9].position > 0 && (
              <tr className="border-b border-zinc-800">
                <td className="text-zinc-400 font-medium text-xs p-2 capitalize">
                  {data[9].entityName
                    ? data[9].entityName
                        .split(" ")
                        .slice(0, 2)
                        .reverse()
                        .join(" ")
                        .toLowerCase()
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[9].position
                    ? millify(data[9].position, {
                        precision: 2,
                        space: true,
                      })
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[9].reportDate
                    ? format(new Date(data[9].reportDate), "MMM dd, yyyy")
                    : "-"}
                </td>
                <td className="text-zinc-400 font-medium text-xs">
                  {data[9].position
                    ? `$ ${millify(data[9].position * price, {
                        precision: 2,
                        space: true,
                      })}`
                    : "-"}
                </td>
              </tr>
            )}
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

export default Insiders;
