import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

const handler = async (req, res) => {
  try {
    // GET EMAIL FROM CLIENT SIDE 
    const email = req.body.email;
    // FETCH USER FROM MONGODB DATABASE
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');
    const user = await collection.find({email: email}).toArray();
    const customerId = user[0].stripeCustomerId;
  
    // CREATE STRIPE PAYMENT INTENT TO SAVE PAYMENT METHOD
    // FOR FUTURE INVOICES
    const setUpIntent = await stripe.setupIntents.create({
      customer: customerId,
      payment_method_types: ['card']
    });
  
    // SEND INTENT TO FRONT END
    res.status(200).json(setUpIntent);
  } catch (e) {
    res.status(400).json(e)
  }

}

export default handler;