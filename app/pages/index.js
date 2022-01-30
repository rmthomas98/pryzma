import Link from "next/link";
import { ArrowRight, FilePpt } from "react-bootstrap-icons";
import Footer from "../components/Home/Footer";
import { withIronSession } from "next-iron-session";

const Home = () => {
  return (
    <div className="p-4 h-[calc(100vh-80px)] min-h-[800px] bg-zinc-900 flex flex-col justify-between">
      <div className="max-w-7xl mx-auto">
        <div className="mt-40">
          <p className="font-bold text-zinc-200 text-[44px] text-center">
            Stock Research Simplified
          </p>
          <p className="text-[22px] text-center text-zinc-300 font-light">
            Engineered for traders, by traders.
          </p>
          <div className="flex justify-center mt-4">
            <Link href="/signup">
              <a className="text-white font-medium text-lg bg-violet-600 rounded-md px-10 py-2.5 hover:bg-violet-800 transition-all duration-300">
                Get Started
              </a>
            </Link>
          </div>
        </div>
      </div>
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
