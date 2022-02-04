import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
const stripe = require("stripe")(process.env.STRIPE_KEY);

const handler = async (req, res, session) => {
  const subscriptionId = req.body.subscriptionId;
  const priceId = req.body.priceId;
  const email = req.body.email;
  const subscriptionType =
    priceId === "price_1KPWKjIUx22VK4GNd2bVhQ27" ? "monthly" : "annual";

  try {
    // connect to MONGODB
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");

    // get subscription
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    // update subscription
    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: false,
      proration_behavior: "always_invoice",
      items: [
        {
          id: subscription.items.data[0].id,
          price: priceId,
        },
      ],
    });

    // update subscriptionType in mongo db
    const updatedSubscriptionType = {
      $set: {
        subscriptionType: subscriptionType,
        priceId: priceId,
      },
    };

    // update in mongodb
    await collection.updateOne({ email: email }, updatedSubscriptionType);

    res.status(200).json("subscription updated");
    // catch any errors
  } catch (e) {
    res.status(200).json("something went wrong");
  }
};

export default handler;
