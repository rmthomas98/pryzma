import {withIronSession} from 'next-iron-session';

const handler = async (req, res, session) => {
  req.session.destroy();
  res.status(200).json('user logged out');
}

const destroyCookie = withIronSession(handler, {
  password: process.env.IRON_SESSION_PASSWORD,
  cookieName: 'user',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})

export default destroyCookie;
