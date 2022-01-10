import { withIronSession } from "next-iron-session";

const AdminHome = () => {
  return <div></div>
}

export const getServerSideProps = withIronSession(
  ({req, res}) => {
    const user = req.session.get('user');

    if (user) return {props: user}

    return {
      redirect: {
        permanant: false,
        destination: '/login'
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

export default AdminHome;