import { withIronSession } from "next-iron-session";

const AdminHome = () => {
  return <div></div>
}

export const getServerSideProps = withIronSession(
  ({req, res}) => {
    const user = req.session.get('user');

    // IF NO USER IN SESSION, REDIRECT TO LOGIN PAGE
    if (!user) {
      return {
        redirect: {
          permanant: false,
          destination: '/login'
        },
        props: {}
      }
    }

    // IF USER HAS NO SUBSCRIPTION OR USER HAS CANCELED THEIR SUBSCRIPTION
    // REDIRECT TO CHOOSE PLAN PAGE
    if (!user.user.subscriptionType || user.user.subscriptionType === 'canceled') {
      return {
        redirect: {
          permanant: false,
          destination: '/admin/choose-plan'
        },
        props: {}
      }
    }

    return {props: {}}
  },
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: 'user',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
)

export default AdminHome;