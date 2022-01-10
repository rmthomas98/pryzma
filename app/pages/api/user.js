import { withIronSession } from "next-iron-session";

const handler = (req, res, session) => {
  const user = req.session.get('user');
  if (!user) return res.status(200).json('no user found');
  res.status(200).json(user)
}

// Set the cookie of the user so they stay logged in
const setCookie = withIronSession(handler, {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: 'user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})

export default setCookie;