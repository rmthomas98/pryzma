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

const Home = () => {
  return (
    <>
    <div className="max-w-7xl mx-auto p-4 w-full flex justify-between pt-24">
      <div className="min-w-fit mr-6 mt-60">
        <p className="text-gray-900 text-4xl">
          stock research simplified
        </p>
        <p className="text-2xl text-indigo-600 mt-1">
          financials, sec filings, statistics, and more
        </p>
        <p className="text-gray-900 mt-6 text-lg">
          engineered for stock traders
        </p>
        <div className="flex mt-5 min-w-fit">
          <Link href="/signup">
            <a className="pl-10 pr-10 p-2 bg-gradient-to-r from-rose-600 to-indigo-600 rounded-md text-white  flex items-center w-fit mr-2 transition-all duration-300 hover:shadow-md hover:shadow-gray-500">
              start free trial
              <ArrowRight className="ml-2" />
            </a>
          </Link>
          <Link href="/">
            <a className="pl-10 pr-10 p-2 border shadow-md border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-all duration-300">
              pricing
            </a>
          </Link>
        </div>
      </div>
      <Image src={server}  height={650} width={650} layout="fixed"/>
    </div>
    <HomeInfo />
    <Simple />
    <Statistics />
    <Financials />
    <Footer />
    </>
  );
}

export const getServerSideProps = withIronSession(
  ({req, res}) => {
    const user = req.session.get('user');

    if (!user) return {props: {}}

    return {
      redirect: {
        permanant: false,
        destination: '/admin'
      },
      props: {}
    }
  },
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: 'user',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
)

export default Home;
