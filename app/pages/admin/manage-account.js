import { withIronSession } from "next-iron-session";
import { useState } from "react";
import { format } from "date-fns";
import { BoxArrowUpRight } from "react-bootstrap-icons";
import axios from "axios";
import {useRouter} from 'next/router';
import ButtonSpinner from '../../components/ButtonSpinner';

const ManageAccount = ({ user }) => {

  const router = useRouter();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCustomerPortal = async () => {
    setIsSubmitting(true)
    const response = await axios.post('/api/customer-portal', {customerId: user.stripeCustomerId}).catch((e) => console.error(e));
    router.push(response.data)
    setTimeout(() => {

      setIsSubmitting(false)
    },1000)
  }

  return (
    <div className="max-w-screen-sm w-full mx-auto mt-20 mb-20">
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-6">Account Information</p>
      <div className="flex w-full">
        <div className="w-full mr-4 mb-6">
          <p className="text-sm text-gray-800 pb-0.5">First Name</p>
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} type="text" className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}/>
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-800 pb-0.5">Last Name</p>
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} type="text" className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}/>
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full mr-4">
          <p className="text-sm text-gray-800 pb-0.5">Email</p>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="text" className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}/>
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-800 pb-0.5">Date Joined</p>
          <p className="mt-2">{format(new Date(user.dateJoined), "MMMM dd, yyyy")}</p>
        </div>
      </div>
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-8 mt-12">Subscription Information</p>
      <div className="flex">
      {user.subscriptionType && <div className="border-gray-300 border p-2.5 rounded-md shadow-sm text-sm shadow-gray-300 pl-4 pr-4 mr-4"><p>PrizmPro {user.subscriptionType}</p></div>}
      <button onClick={handleCustomerPortal} className={`h-[42px] w-[200px] transition-all duration-300 rounded-md text-sm text-white font-medium flex items-center justify-center ${isSubmitting ? 'bg-indigo-400 hover:bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}>{isSubmitting ? <ButtonSpinner /> : <><span>Manage Subscription</span><BoxArrowUpRight className="ml-2"/></>}</button>
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
