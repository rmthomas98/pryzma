import { withIronSession } from "next-iron-session";

const AdminHome = () => {
  return <div></div>;
};

export const getServerSideProps = withIronSession(
  ({ req, res }) => {
    const user = req.session.get("user");

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
      // if user subscription is canceled, redirect to manage acccount page to update payment method
      if (user.user.subscriptionType === 'canceled' || user.user.paymentStatus === 'failed' || user.user.subscriptionType === null) {
        return {
          redirect: {
            permanant: false,
            destination: '/admin/manage-account'
          },
          props: {}
        }
      }
    }

    return { props: {} };
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
