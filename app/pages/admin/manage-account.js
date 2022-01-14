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

  return (
    <div className="pr-4 pl-4">
    <div className="max-w-screen-sm w-full mx-auto mt-20 mb-20">
      <AccountInformation user={user} />
      <Password />
      <SubscriptionInformation user={user} />
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
