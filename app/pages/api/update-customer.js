import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const handler = async (req, res, session) => {
  try {
    // getting info received from front end
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const newEmail = req.body.newEmail;
    const oldEmail = req.body.oldEmail;

    // connect to MONGODB
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");

    // find user in MONGODB
    const user = await collection.findOne({ email: oldEmail });

    // checking if new email is already in use
    if (user.email !== newEmail) {
      const emailisTaken = await collection.findOne({ email: newEmail });
      if (emailisTaken) return res.status(200).json("email is already in use");
    }

    const updateUser = {
      $set: {
        firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1),
        lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
        email: newEmail,
      },
    };

    // update user
    await collection.updateOne({ _id: user._id }, updateUser);
    // get updated user form database
    const updatedUser = await collection.findOne({ email: newEmail });

    // update stripe customer
    await stripe.customers.update(user.stripeCustomerId, {
      name: `${updatedUser.firstName} ${updatedUser.lastName}`,
      email: updatedUser.email,
    });

    // set new session with updated info
    req.session.set("user", {
      id: user._id,
      user: updatedUser,
    });
    await req.session.save();
    // send response back to frontend
    res.status(200).json("user has been updated");
  } catch (e) {
    res.status(200).json("something went wrong");
  }
};

// setting cookie
const setCookie = withIronSession(handler, {
  cookieName: "user",
  password: process.env.IRON_SESSION_PASSWORD,
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
  },
});

export default setCookie;
