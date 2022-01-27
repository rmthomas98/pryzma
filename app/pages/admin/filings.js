import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SymbolContext from '../SymbolContext';
import UserContext from '../UserContext';
import {withIronSession} from 'next-iron-session';
import clientPromise from '../../lib/mongodb';
import Financials from '../../components/Filings/Financials'
import News from '../../components/Filings/News'

const Filings = ({user}) => {

  const {symbol} = useContext(SymbolContext)
  const {setUser} = useContext(UserContext)

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setUser(user)
  },[])

  useEffect(() => {
    if (!symbol) return 
    setData()
    setIsLoading(true)
    const getData = async () => {
      const response = await axios.post('/api/sec-filings', {symbol: symbol[0]});
      console.log(response.data)

      setData(response.data)
      setIsLoading(false)

    }
    getData()
  },[symbol])

  if (!data || isLoading) return <div>sec filings loading</div>

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <Financials data={data}/>
          <News data={data} />
        </div>
      </div>
    </div>
  )
}

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

export default Filings;