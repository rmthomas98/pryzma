const stripe = require("stripe")(process.env.STRIPE_KEY);

const handler = async (req, res) => {
  const customerId = req.body.customerId;
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 3,
      customer: customerId,
    });
    res.status(200).json(paymentIntents);
  } catch (e) {
    res.status(200).json("something went wrong");
  }
};

export default handler;
