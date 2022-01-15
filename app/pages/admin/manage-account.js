import { withIronSession } from "next-iron-session";
import { useState } from "react";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/router";
import ButtonSpinner from "../../components/ButtonSpinner";
import AccountInformation from "../../components/ManageAccount/AccountInformation";
import Password from "../../components/ManageAccount/Password";
import SubscriptionInformation from "../../components/ManageAccount/SubscriptionInformation";

const ManageAccount = ({ user }) => {
  const router = useRouter();

  const [page, setPage] = useState("account");

  return (
    <div className="pr-4 pl-4">
      <div className="max-w-screen-sm w-full mx-auto mt-40 mb-20">
        <div className="flex justify-between mb-10">
          <p className={`w-full text-center cursor-pointer pb-3 border-b-2 text-gray-900 transition-all duration-300 hover:opacity-100 ${page === 'account' ? 'border-indigo-600 opacity-100' : 'border-transparent opacity-50'}`} onClick={() => setPage('account')}>Account</p>
          <p className={`w-full text-center cursor-pointer pb-3 border-b-2 text-gray-900 transition-all duration-300 hover:opacity-100 ${page === 'password' ? 'border-indigo-600 opacity-100' : 'border-transparent opacity-50'}`} onClick={() => setPage('password')}>Password</p>
          <p className={`w-full text-center cursor-pointer pb-3 border-b-2 text-gray-900 transition-all duration-300 hover:opacity-100 ${page === 'subscription' ? 'border-indigo-600 opacity-100' : 'border-transparent opacity-50'}`} onClick={() => setPage('subscription')}>Subscription</p>
        </div>
        {page === "account" && <AccountInformation user={user} />}
        {page === "password" && <Password />}
        {page === "subscription" && <SubscriptionInformation user={user} />}
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSession(
  ({ req, res }) => {
    const user = req.session.get("user");

    if (user) return { props: user };

    return {
      redirect: {
        permanant: false,
        destination: "/login",
      },
      props: {},
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

export default ManageAccount;
