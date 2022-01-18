const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

const handler = async (req, res) => {
  const subscriptionId = req.body.subscriptionId;
  
  try {

    await stripe.subscriptions.del(subscriptionId);
    res.status(200).json('subscription deleted');

  } catch (e) {
    res.status(200).json('something went wrong')
  }
}

export default handler;