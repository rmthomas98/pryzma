import { withIronSession } from "next-iron-session";
import clientPromise from "../../lib/mongodb";
import Time from "../../components/AdminHome/Time";
import WatchList from "../../components/AdminHome/Watchlist";
import axios from "axios";
import { useState, useContext, useEffect } from "react";
import News from "../../components/AdminHome/News";
import UserContext from "../../pages/UserContext";
import Head from "next/head";

const AdminHome = ({ user, watchlist, news }) => {
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(user.user);
  }, []);

  const [watchListSymbols, setWatchListSymbols] = useState(
    watchlist &&
      Object.values(watchlist).sort((a, b) =>
        a.quote.symbol.toLowerCase() > b.quote.symbol.toLowerCase() ? 1 : -1
      )
  );

  return (
    <div className="p-4">
      <Head>
        <title>Pryzma - Admin Home</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Admin Home" />
        <meta name="keywords" content="pryzma, admin, home" />
      </Head>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4 animate-fadeIn">
          <p className="font-semibold text-2xl text-zinc-200">
            Welcome, {user.user.firstName}
          </p>
          <Time />
        </div>
        <WatchList
          watchListSymbols={watchListSymbols}
          setWatchListSymbols={setWatchListSymbols}
          user={user}
        />
        <News news={news} watchListSymbols={watchListSymbols} />
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
    }
    // get user watchlist
    let watchlist;
    let news;
    // if user has a watchlist, fetch and pass it as props
    if (user.user.watchlist.length) {
      watchlist = await axios.get(
        `https://cloud.iexapis.com/stable/stock/market/batch?symbols=${user.user.watchlist.join(
          ","
        )}&types=quote&displayPercent=true&token=${
          process.env.IEX_CLOUD_API_KEY
        }`
      );
      news = await axios.get(
        `https://stocknewsapi.com/api/v1?tickers=${user.user.watchlist.join(
          ","
        )}&items=50&token=${process.env.STOCK_NEWS_API_KEY}`
      );
    }
    // parse user to pass as props
    user = JSON.parse(JSON.stringify(user));
    // return watchlist if it exists, and user
    return {
      props: {
        user,
        watchlist: watchlist?.data ? watchlist.data : null,
        news: news ? news.data : null,
      },
    };
  },
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "user",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

export default AdminHome;
