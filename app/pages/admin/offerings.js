import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import SymbolContext from "../SymbolContext";
import { format } from "date-fns";
import { Link45deg } from "react-bootstrap-icons";

const Offerings = ({ user }) => {
  const { symbol } = useContext(SymbolContext);
  const { setUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setUser(user);
  });

  useEffect(() => {
    if (!symbol) return;
    setData();
    setIsLoading(true);

    const getData = async () => {
      const response = await axios.post("/api/get-offerings", {
        symbol: symbol[0],
      });
      if (response.data.length) {
        setData(response.data);
        return setIsLoading(false);
      }
      setIsLoading(false);
      setData("data not available");
    };
    getData();
  }, [symbol]);

  console.log(data);

  if (!data || isLoading)
    return (
      <div className="px-4">
        <div className="max-w-7xl mx-auto mt-4">
          <div className="p-4 max-w-[300px] w-full bg-zinc-800 animate-pulse rounded-md"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
          <div className="w-full p-4 rounded-md bg-zinc-800 animate-pulse mt-3"></div>
        </div>
      </div>
    );

  if (data === "data not available" || !data.length)
    return (
      <div className="p-4 mx-auto rounded-md border w-fit border-violet-500 bg-zinc-800 mt-10">
        <p className="font-medium text-zinc-200 text-sm">
          No data available for {symbol[0]}
        </p>
      </div>
    );

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <p className="font-medium text-zinc-200 text-2xl mb-2">
          Offerings & Shelf Registrations
        </p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-800">
              <td className="font-medium text-zinc-200 text-xs p-2">
                Form Type
              </td>
              <td className="font-medium text-zinc-200 text-xs">Date</td>
              <td className="font-medium text-zinc-200 text-xs">Description</td>
              <td className="font-medium text-zinc-200 text-xs">Link</td>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((element, index) => {
                return (
                  <tr className="border-b border-zinc-800" key={index}>
                    <td className="font-medium text-zinc-400 text-xs p-2">
                      {element.formType}
                    </td>
                    <td className="font-medium text-zinc-400 text-xs">
                      {element.formType.charAt(0) === "S"
                        ? element.formType.includes("A")
                          ? "Amended Shelf Registration"
                          : "Shelf Registration"
                        : "Prospectus Supplement"}
                    </td>
                    <td className="font-medium text-zinc-400 text-xs">
                      {format(new Date(element.date), "MMMM dd, yyyy")}
                    </td>
                    <td>
                      <a
                        href={element.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-medium text-zinc-400 flex items-center hover:underline"
                      >
                        <Link45deg className="mr-2 text-violet-500" />
                        View File
                      </a>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

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

export default Offerings;
