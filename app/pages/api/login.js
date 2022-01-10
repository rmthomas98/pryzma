const bcrypt = require('bcryptjs');
import {withIronSession} from 'next-iron-session';
import clientPromise from '../../lib/mongodb';

const handler = async (req, res) => {
  try {
    const {email, password} = req.body.data;
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');
    // check if user is in database
    const user = await collection.findOne({email: email});
    // if user not found in mongodb db then send message to front end
    if (!user) return res.status(200).json('user not found')
    // if user exists check passwords
    bcrypt.compare(password, user.password, async (err, response) => {
      // if passwords match, set session and send successful login to front end
      if (response) {
        // set session with user
        req.session.set('user', {
          id: user._id,
          user: user
        });
        await req.session.save();
        res.status(200).json('successfull login')
        // if passwords do not match, send incorrect password to front end
      } else {
        res.status(200).json('incorrect password')
      }
    })
  } catch(e) {
    // send error
    res.status(400).json(e)
  }
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