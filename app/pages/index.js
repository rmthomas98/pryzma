import Link from "next/link";
import { ArrowRight } from "react-bootstrap-icons";
import Image from "next/image";
import server from "../static/images/server.svg";
import HomeInfo from "../components/Home/HomeInfo";
import Simple from "../components/Home/Simple";
import Statistics from "../components/Home/Statistics";
import Financials from "../components/Home/Financials";
import Footer from "../components/Home/Footer";
import { withIronSession } from "next-iron-session";
import SecFilings from "../components/Home/SecFilings";
import Pricing from "../components/Home/Pricing";
import OnePlace from "../components/Home/OnePlace";

const Home = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="max-w-7xl mx-auto p-4 w-full flex justify-between pt-24 min-w-[1000px]">
        <div className="min-w-fit mr-14 mt-60">
          <p className="text-gray-700 text-4xl capitalize font-bold">
            stock research simplified
          </p>
          <p className="text-xl font-medium text-indigo-600 mt-1">
            Financials, SEC Filings, Statistics, and more.
          </p>
          <p className="text-gray-700 mt-6">
            Engineered for Traders, by Traders
          </p>
          <div className="flex mt-5 min-w-fit">
            <Link href="/signup">
              <a className="pl-10 pr-10 p-2 bg-gradient-to-r from-rose-600 to-indigo-600 rounded-md text-white font-medium flex items-center w-fit mr-2 transition-all duration-300 hover:shadow-md hover:shadow-gray-500">
                Start Free Trial
                <ArrowRight className="ml-2" />
              </a>
            </Link>
            <Link href="/">
              <a className="pl-10 pr-10 p-2 border shadow-md border-indigo-600 font-medium text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-all duration-300">
                Pricing
              </a>
            </Link>
          </div>
        </div>
        <Image src={server} height={650} width={800} layout="fixed" />
      </div>
      <HomeInfo />
      <Simple />
      <Statistics />
      <Financials />
      <SecFilings />
      <OnePlace />
      <Pricing />
      <Footer />
    </div>
  );
};

export const getServerSideProps = withIronSession(
  ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) return { props: {} };

    return {
      redirect: {
        permanant: false,
        destination: "/admin",
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

export default Home;
