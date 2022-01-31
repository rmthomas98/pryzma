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

  const refreshData = () => {
    router.replace(router.asPath);
  };

  useEffect(() => {
    if (router.query.paymentMethodUpdated) {
      setPage("subscription");
      setTimeout(() => {
        router.replace(router.asPath);
      }, 1000);
    }
  }, [router.query.paymentMethodUpdated]);

  useEffect(() => {
    if (user.paymentStatus === "failed") {
      setAccountMessage(
        "You payment has failed. Please update your payment method."
      );
      return setPage("subscription");
    }
    if (user.isCanceled) {
      setAccountMessage("Please select a subscription plan.");
      setPage("subscription");
    }
    if (user.subscriptionType === null || !user.defaultPaymentMethod) {
      setAccountMessage("Please select a subscription plan.");
      setPage("subscription");
    }
  }, []);

  return (
    <div className="pr-4 pl-4 bg-zinc-900">
      <div className="max-w-screen-sm w-full mx-auto mt-40 mb-20">
        <div className="flex justify-between mb-10 animate-fadeInUp translate-y-12 border-b border-zinc-600 relative">
          <span
            className={`content-none bg-violet-500 w-1/3 h-0.5 absolute bottom-[-1px] transition-all ease-in-out duration-500 rounded-full ${
              page === "account" && "left-0"
            } ${page === "password" && "left-1/2 translate-x-[-50%]"} ${
              page === "subscription" && "left-[100%] translate-x-[-100%]"
            }`}
          ></span>
          <p
            className={`w-full text-center cursor-pointer pb-3 text-zinc-200 transition-all duration-300 hover:opacity-100 ${
              page === "account" ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => setPage("account")}
          >
            Account
          </p>
          <p
            className={`w-full text-center cursor-pointer pb-3  text-zinc-200 transition-all duration-300 hover:opacity-100 ${
              page === "password" ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => setPage("password")}
          >
            Password
          </p>
          <p
            className={`w-full text-center cursor-pointer pb-3  text-zinc-200 transition-all duration-300 hover:opacity-100 ${
              page === "subscription" ? "opacity-100" : "opacity-70"
            }`}
            onClick={() => setPage("subscription")}
          >
            Subscription
          </p>
        </div>
        {page === "account" && <AccountInformation user={user} />}
        {page === "password" && <Password user={user} />}
        {page === "subscription" && (
          <SubscriptionInformation
            user={user}
            accountMessage={accountMessage}
            refreshData={refreshData}
          />
        )}
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
          destination: "/login",
        },
      };
    }

    if (user) {
      const client = await clientPromise;
      const db = client.db();
      const collection = db.collection("users");

      user = await collection.findOne({
        stripeCustomerId: user.user.stripeCustomerId,
      });
      req.session.set("user", {
        id: user._id,
        user: user,
      });
      await req.session.save();
      user = req.session.get("user");
      user = JSON.parse(JSON.stringify(user));
      return { props: user };
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
