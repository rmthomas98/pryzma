import { CaretDownFill, Router } from "react-bootstrap-icons";
import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import SymbolContext from "../SymbolContext";
import millify from "millify";
import Head from "next/head";
import { useRouter } from "next/router";

const Movers = () => {
  const [direction, setDirection] = useState("gainers");
  const { setSymbol } = useContext(SymbolContext);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const [sortSymbol, setSortSymbol] = useState(false);
  const [sortPrice, setSortPrice] = useState(false);
  const [sortChange, setSortChange] = useState(false);
  const [sortPercent, setSortPercent] = useState(false);
  const [sortVolume, setSortVolume] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const getData = async () => {
      // reset data and is loading
      setData();
      setIsLoading(true);
      // make call to backend to get data
      const response = await axios.post("/api/get-movers", { direction });
      if (response.data.values) {
        setData(response.data.values);
        return setIsLoading(false);
      }
      setData("data not available");
      setIsLoading(false);
    };
    getData();
  }, [direction]);

  const handleSymbolSort = () => {
    setSortPrice(false);
    setSortChange(false);
    setSortPercent(false);
    setSortVolume(false);
    if (!sortSymbol) {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) =>
        a.symbol.toLowerCase() > b.symbol.toLowerCase() ? 1 : -1
      );
      setData(newArr);
      setSortSymbol(true);
    } else {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) =>
        b.symbol.toLowerCase() > a.symbol.toLowerCase() ? 1 : -1
      );
      setData(newArr);
      setSortSymbol(false);
    }
  };

  const handlePriceSort = () => {
    setSortSymbol(false);
    setSortChange(false);
    setSortPercent(false);
    setSortVolume(false);

    if (!sortPrice) {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => a.last - b.last);
      setData(newArr);
      setSortPrice(true);
    } else {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => b.last - a.last);
      setData(newArr);
      setSortPrice(false);
    }
  };

  const handleChangeSort = () => {
    setSortSymbol(false);
    setSortPrice(false);
    setSortPercent(false);
    setSortVolume(false);
    if (!sortChange) {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => a.change - b.change);
      setData(newArr);
      setSortChange(true);
    } else {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => b.change - a.change);
      setData(newArr);
      setSortChange(false);
    }
  };

  const handlePercentSort = () => {
    setSortSymbol(false);
    setSortPrice(false);
    setSortChange(false);
    setSortVolume(false);

    if (!sortPercent) {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => a.percent_change - b.percent_change);
      setData(newArr);
      setSortPercent(true);
    } else {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => b.percent_change - a.percent_change);
      setData(newArr);
      setSortPercent(false);
    }
  };

  const handleVolumeSort = () => {
    setSortSymbol(false);
    setSortPrice(false);
    setSortChange(false);
    setSortPercent(false);

    if (!sortVolume) {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => a.volume - b.volume);
      setData(newArr);
      setSortVolume(true);
    } else {
      const oldArr = [...data];
      const newArr = oldArr.sort((a, b) => b.volume - a.volume);
      setData(newArr);
      setSortVolume(false);
    }
  };

  const handleSymbolClick = (symbol, name) => {
    setSymbol([symbol, name]);
    router.push("/admin/overview");
  };

  if (!data || isLoading)
    return (
      <>
        <Head>
          <title>Pryzma - Top Movers</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Top Movers" />
          <meta name="keywords" content="pryzma, top movers, gainers, losers" />
        </Head>
        <div className="px-4">
          <div className="max-w-7xl mx-auto mt-4">
            <div className="flex items-center justify-between">
              <div className="p-4 max-w-[300px] w-full bg-zinc-800 animate-pulse rounded-md"></div>
              <div className="flex">
                <div className="p-2 rounded-md w-[70px] bg-zinc-800 animate-pulse mr-4"></div>
                <div className="p-2 rounded-md w-[70px] bg-zinc-800 animate-pulse"></div>
              </div>
            </div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
            <div className="w-full p-3 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          </div>
        </div>
      </>
    );

  if (data === "data not available")
    return (
      <>
        <Head>
          <title>Pryzma - Top Movers</title>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <meta name="description" content="Top Movers" />
          <meta name="keywords" content="pryzma, top movers, gainers, losers" />
        </Head>
        <div className="p-4 mx-auto rounded-md border w-fit border-violet-500 bg-zinc-800 mt-16 animate-fadeIn opacity-0">
          <p className="font-medium text-zinc-200 text-sm">
            No data available at this time
          </p>
        </div>
      </>
    );

  return (
    <>
      <Head>
        <title>Pryzma - Top Movers</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Top Movers" />
        <meta name="keywords" content="pryzma, top movers, gainers, losers" />
      </Head>
      <div className="p-4 animate-fadeIn opacity-0">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="font-medium text-zinc-200 text-2xl mb-2 capitalize">
              Top Movers - {direction}
            </p>
            <div className="flex">
              <button
                onClick={() => setDirection("gainers")}
                className={`py-1 px-2 text-xs font-semibold hover:text-violet-500 rounded-md mr-2 transition-all ${
                  direction === "gainers"
                    ? "text-violet-500 bg-white"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                Gainers
              </button>
              <button
                onClick={() => setDirection("losers")}
                className={`py-1 px-2 text-xs font-semibold hover:text-violet-500 rounded-md transition-all ${
                  direction === "losers"
                    ? "text-violet-500 bg-white"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                Losers
              </button>
            </div>
          </div>
          <div className="flex border-b border-zinc-800 pb-2 pl-2">
            <p
              className="w-full text-xs font-medium text-zinc-200 flex items-center cursor-pointer selection:bg-none"
              onClick={handleSymbolSort}
            >
              Symbol{" "}
              <CaretDownFill
                className={`text-violet-500 ml-1 transition-all duration-300`}
              />
            </p>
            <p
              className="w-full text-xs font-medium text-zinc-200 flex items-center cursor-pointer selection:bg-none"
              onClick={handlePriceSort}
            >
              Price{" "}
              <CaretDownFill
                className={`text-violet-500 ml-1 transition-all duration-300`}
              />
            </p>
            <p
              className="w-full text-xs font-medium text-zinc-200 flex items-center cursor-pointer selection:bg-none"
              onClick={handleChangeSort}
            >
              Change{" "}
              <CaretDownFill
                className={`text-violet-500 ml-1 transition-all duration-300`}
              />
            </p>
            <p
              className="w-full text-xs font-medium text-zinc-200 flex items-center cursor-pointer selection:bg-none"
              onClick={handlePercentSort}
            >
              % Change{" "}
              <CaretDownFill
                className={`text-violet-500 ml-1 transition-all duration-300`}
              />
            </p>
            <p
              className="w-full text-xs font-medium text-zinc-200 flex items-center cursor-pointer selection:bg-none"
              onClick={handleVolumeSort}
            >
              Volume{" "}
              <CaretDownFill
                className={`text-violet-500 ml-1 transition-all duration-300`}
              />
            </p>
          </div>
          {data &&
            data.map((element) => {
              if (element.symbol.includes(".")) return;
              return (
                <div
                  onClick={() =>
                    handleSymbolClick(element.symbol, element.name)
                  }
                  className="flex py-2 border-b pl-2 border-zinc-800 cursor-pointer hover:bg-zinc-800 transition-all"
                  key={element.symbol}
                >
                  <p className="w-full text-xs text-zinc-400 font-medium">
                    {element.symbol}
                  </p>
                  <p className="w-full text-xs text-zinc-400 font-medium">
                    {element.last.toFixed(2)}
                  </p>
                  <p
                    className={`w-full text-xs ${
                      direction === "gainers"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {element.change.toFixed(2)}
                  </p>
                  <p
                    className={`w-full text-xs ${
                      direction === "gainers"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {element.percent_change.toFixed(2)}%
                  </p>
                  <p className="w-full text-xs text-zinc-400 font-medium">
                    {millify(element.volume, { precision: 2, space: true })}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </>
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

export default Movers;
