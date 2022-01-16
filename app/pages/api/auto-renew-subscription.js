import { withIronSession } from "next-iron-session";
import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

const handler = async (req, res, session) => {
  const email = req.body.email;
  const subscriptionId = req.body.subscriptionId;
  const status = req.body.status;
  console.log(status)
  
  try {
    // conntect to mongodb
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');

    // get user from email passed from frontend
    const user = await collection.findOne({email: email});

    // update user to auto renew subscription to false
    const updateAutoRenew = {
      $set: {
        cancelAtPeriodEnd: Boolean(status)
      }
    }

    // update in mongodb
    await collection.updateOne(user, updateAutoRenew);

    // update in stripe
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: Boolean(status)
    })

    // set new session with updated user 
    const updatedUser = await collection.findOne({email: email});
    req.session.set('user', {
      id: updatedUser._id,
      user: updatedUser
    })
    await req.session.save();
    
    // send message to front end confirming the subscription has been canceled
    if (!status) return res.status(200).json('subscription renewed');
    res.status(200).json('subscription canceled')

  } catch (e) {
    res.status(200).json('something went wrong')
  }
}

const setCookie = withIronSession(handler, {
  cookieName: 'user',
  password: process.env.IRON_SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})

export default setCookie;