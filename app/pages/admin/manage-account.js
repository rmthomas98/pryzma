import { withIronSession } from "next-iron-session";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import AccountInformation from "../../components/ManageAccount/AccountInformation";
import Password from "../../components/ManageAccount/Password";
import SubscriptionInformation from "../../components/ManageAccount/SubscriptionInformation";
import clientPromise from "../../lib/mongodb";


const ManageAccount = ({ user }) => {
  const router = useRouter();

  const [page, setPage] = useState("account");
  const [accountMessage, setAccountMessage] = useState(false);

  useEffect(() => {
    const getRouter = async () => {
      if (router.query.paymentMethodUpdated) {
        await router.replace(router.asPath);
        setAccountMessage(false);
        setPage('subscription')
      }
      if (router.query.subscriptionCreated) {
        await router.replace(router.asPath);
        setAccountMessage(false);
        setPage('subscription')
      }
    }
    getRouter();
  },[router.pathname])

  useEffect(() => {
    if (!router.query.paymentMethodUpdated && !router.query.subscriptionCreated) {
      if (user.paymentStatus === 'failed') {
        if (router.query.paymentMethodUpdated) return setAccountMessage(false);
        setAccountMessage('You payment has failed. Please update your payment method.')
        return setPage('subscription')
      }
      if (user.isCanceled) {
        setAccountMessage('Please select a subscription plan in order to use Prizm Pro.')
        setPage('subscription')
      }
      if (user.subscriptionType === null || !user.defaultPaymentMethod) {
        setAccountMessage('Please select a subscription plan in order to use Prizm Pro.')
        setPage('subscription')
      }
    }
  },[])
  

  return (
    <div className="pr-4 pl-4">
      <div className="max-w-screen-sm w-full mx-auto mt-40 mb-20">
        <div className="flex justify-between mb-10">
          <p className={`w-full text-center cursor-pointer pb-3 border-b-2 text-gray-900 transition-all duration-300 hover:opacity-100 ${page === 'account' ? 'border-indigo-600 opacity-100' : 'border-transparent opacity-50'}`} onClick={() => setPage('account')}>Account</p>
          <p className={`w-full text-center cursor-pointer pb-3 border-b-2 text-gray-900 transition-all duration-300 hover:opacity-100 ${page === 'password' ? 'border-indigo-600 opacity-100' : 'border-transparent opacity-50'}`} onClick={() => setPage('password')}>Password</p>
          <p className={`w-full text-center cursor-pointer pb-3 border-b-2 text-gray-900 transition-all duration-300 hover:opacity-100 ${page === 'subscription' ? 'border-indigo-600 opacity-100' : 'border-transparent opacity-50'}`} onClick={() => setPage('subscription')}>Subscription</p>
        </div>
        {page === "account" && <AccountInformation user={user} />}
        {page === "password" && <Password user={user}/>}
        {page === "subscription" && <SubscriptionInformation user={user} accountMessage={accountMessage}/>}
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
    let user = req.session.get("user");

    if (!user) {
      return {
        redirect: {
          permanant: false,
          destination: '/login'
        }
      }
    }

    if (user) {

      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection('users');

      user = await collection.findOne({stripeCustomerId: user.user.stripeCustomerId});
      req.session.set('user', {
        id: user._id,
        user: user
      })
      await req.session.save()
      user = req.session.get('user')
      user = JSON.parse(JSON.stringify(user))
      return {props: user}
    }
  },
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "user",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

export default ManageAccount;
