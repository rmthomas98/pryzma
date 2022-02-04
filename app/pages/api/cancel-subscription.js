const stripe = require("stripe")(process.env.STRIPE_KEY);

const handler = async (req, res) => {
  const subscriptionId = req.body.subscriptionId;

  try {
    await stripe.subscriptions.del(subscriptionId);
    res.status(200).json("subscription deleted");
  } catch (e) {
    res.status(200).json("something went wrong");
  }
};

export default handler;
