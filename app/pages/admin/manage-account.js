import { withIronSession } from "next-iron-session";
import { useState } from "react";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/router";
import ButtonSpinner from "../../components/ButtonSpinner";
import AccountInformation from "../../components/ManageAccount/AccountInformation";
import Password from "../../components/ManageAccount/Password";

const ManageAccount = ({ user }) => {
  const router = useRouter();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="max-w-screen-sm w-full mx-auto mt-20 mb-20">
      <AccountInformation
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        email={email}
        setEmail={setEmail}
        user={user}
      />
      <Password />
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-8 mt-12">
        Subscription Information
      </p>
      <div className="flex">
        {user.subscriptionType && (
          <div className="border-gray-300 border p-2.5 rounded-md shadow-sm text-sm shadow-gray-300 pl-4 pr-4 mr-4">
            <p>PrizmPro {user.subscriptionType}</p>
          </div>
        )}
        <button
          className={`h-[42px] w-[200px] transition-all duration-300 rounded-md text-sm text-white font-medium flex items-center justify-center ${
            isSubmitting
              ? "bg-indigo-400 hover:bg-indigo-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isSubmitting ? (
            <ButtonSpinner />
          ) : (
            <>
              <span>Manage Subscription</span>
              <BoxArrowUpRight className="ml-2" />
            </>
          )}
        </button>
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
