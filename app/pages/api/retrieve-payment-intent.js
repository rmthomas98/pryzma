const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

const handler = async (req, res) => {
  const customerId = req.body.customerId;
  try {
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 3,
      customer: customerId
    });
    res.status(200).json(paymentIntents)
  } catch (e) {
    res.status(200).json("something went wrong");
  }
};

export default handler;
