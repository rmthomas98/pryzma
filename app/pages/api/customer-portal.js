const stripe = require("stripe")("sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG");

const handler = async (req, res) => {
  const customerId = req.body.customerId;

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'http://localhost:3000/admin/manage-account'
  })

  res.status(200).json(session.url)
}

export default handler;