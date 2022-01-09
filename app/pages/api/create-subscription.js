import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

const handler = async (req, res) => {
  // get user email to find customerId in database
  const email = req.body.email;
  // get priceId
  const priceId = req.body.priceId;
  
  try {

    // FETCH USER FROM MONGODB
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection('users');
    const user = await collection.find({email: email}).toArray();
    const customerId = user[0].stripeCustomerId;
  
    // //CREATE SUBSCRIPTION FOR USER
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{price: priceId}],
      payment_behavior: 'default_incomplete',
      trial_period_days: 7,
      expand: ['latest_invoice.payment_intent']
    })
    
    const updateSubscription = {
      $set: {
        subscriptionId: subscription.id
      }
    }

    // update user by adding subscription id in mongodb
    await collection.updateOne({email: email}, updateSubscription)
    // SEND SUBSCRIPTION BACK TO FRONT END TO GET PAYMENT DETAILS
    res.status(200).json('subscription created')
    
  } catch (e) {
    return res.status(500).json(e)
  }

}

export default handler;