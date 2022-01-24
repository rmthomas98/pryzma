import { useContext, useEffect, useState } from "react";
import SymbolContext from "../SymbolContext";
import {withIronSession} from 'next-iron-session';
import clientPromise from '../../lib/mongodb';
import axios from "axios";
import {useRouter} from 'next/router';
import UserContext from '../UserContext';

// function to get company profile
const getCompanyProfile = (symbol) => {}

// function to get stock quote and price stats
const getQuote = (symbol) => {}

// function to get statistics like float and market cap
const getStatistics = (symbol) => {}

// function to get basic financials
const getFinancials = (symbol) => {}

// function to get news
const getNews = (symbol) => {}

const Overview = ({user}) => {
  const {symbol} = useContext(SymbolContext)
  const {setUser} = useContext(UserContext);

  useEffect(() => {
    setUser(user)
  },[])

  if (!symbol) return <p>Search a stock above to see an overview on it.</p>

  return (
    <div className="max-w-7xl p-4 mx-auto">
    </div>
  )
}

export const getServerSideProps = withIronSession(async ({req, res}) => {
  let user = req.session.get('user');

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
  return {props: user}
},
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "user",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  })

export default Overview;