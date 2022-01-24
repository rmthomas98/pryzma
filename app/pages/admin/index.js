import { withIronSession } from "next-iron-session";
import clientPromise from "../../lib/mongodb";
import Time from "../../components/AdminHome/Time";
import WatchList from "../../components/AdminHome/Watchlist";
import axios from "axios";
import { useState } from "react";
import News from "../../components/AdminHome/News";

const AdminHome = ({user, watchlist, news}) => {

  const [watchListSymbols, setWatchListSymbols] = useState(watchlist && Object.values(watchlist).sort((a, b) => a.quote.symbol > b.quote.symbol));

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex items-center justify-between border-b border-gray-300 pb-4">
      <p className="font-semibold text-2xl text-gray-800">Welcome, {user.user.firstName}</p>
      <Time />
      </div>
      <WatchList watchListSymbols={watchListSymbols} setWatchListSymbols={setWatchListSymbols} user={user}/>
      <News news={news} watchListSymbols={watchListSymbols}/>
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
      watchlist = await axios.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${user.user.watchlist.join(',')}&types=quote&displayPercent=true&token=pk_ca6a1d7ec33745b1bfeb585df0bbf978`);
      news = await axios.get(`https://cloud.iexapis.com/stable/stock/market/batch?symbols=${user.user.watchlist.join(',')}&types=news&last=3&token=pk_ca6a1d7ec33745b1bfeb585df0bbf978`);
    }
    // parse user to pass as props
    user = JSON.parse(JSON.stringify(user));
    // return watchlist if it exists, and user
    return { props: {user, watchlist: watchlist?.data ? watchlist.data : null, news: news ? news.data : null }};
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
