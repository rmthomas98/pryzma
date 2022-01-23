import { withIronSession } from "next-iron-session";
import clientPromise from "../../lib/mongodb";

const AdminHome = () => {
  return (
    <div className="pl-4 pr-4 w-full">
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

    if (user) {
      // get updated user from mongodb
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
    }
    user = JSON.parse(JSON.stringify(user));
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

export default AdminHome;
