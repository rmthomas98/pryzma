import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);
import { withIronSession } from "next-iron-session";

const handler = async (req, res) => {
  let customer;
  let user;
  let updatePaymentStatus;
  // getting the event
  const event = req.body;
  // Connect to MONGODB to up date users and give them access or take away access
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection("users");

  console.log(event);
  // Handle the event
  switch (event.type) {
    // CASE FOR WHEN USER SETTING UP ACCOUNT FOR FREE TRIAL
    case "setup_intent.succeeded":
      customer = event.data.object.customer;
      user = await users.findOne({ stripeCustomerId: customer });
      updatePaymentStatus = {
        $set: {
          paymentStatus: "succeeded",
          defaultPaymentMethod: event.data.object.payment_method,
        },
      };

      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: event.data.object.payment_method,
        },
      });

      await users.updateOne(user, updatePaymentStatus);
      user = await users.findOne({stripeCustomerId: customer});
      req.session.set('user', {
        id: user._id,
        user: user
      })
      await req.session.save();
      console.log("Setup intent was successfull!");
      break;
    // CASE FOR PAYMENT FAILED
    case "invoice.payment_failed":
      customer = event.data.object.customer;
      user = await users.findOne({ stripeCustomerId: customer });
      updatePaymentStatus = {
        $set: {
          paymentStatus: "failed",
        },
      };
      await users.updateOne(user, updatePaymentStatus);
      user = await users.findOne({stripeCustomerId: customer});
      req.session.set('user', {
        id: user._id,
        user: user
      })
      await req.session.save();
      console.log("Payment Failed!");
      break;
    // CASE FOR PAYMENT SUCCEEDED
    case "invoice.payment_succeeded":
      customer = event.data.object.customer;
      user = await users.findOne({ stripeCustomerId: customer });
      if (user.paymentStatus) {
        updatePaymentStatus = {
          $set: {
            paymentStatus: "succeeded",
          },
        };
        await users.updateOne(user, updatePaymentStatus);
        user = await users.findOne({stripeCustomerId: customer});
        req.session.set('user', {
          id: user._id,
          user: user
        })
        await req.session.save();
        console.log("Payment Succeeded!");
      }
      break;
    // IF CUSTOMER CANCELS THERE SUBSCRIPTION
    case "customer.subscription.deleted":
      customer = event.data.object.customer;
      user = await users.findOne({ stripeCustomerId: customer });
      const updateSubscriptionDeleted = {
        $set: {
          priceId: null,
          subscriptionId: null,
          subscriptionType: "canceled",
          paymentStatus: null,
          defaultPaymentMethod: null,
        },
      };
      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: null
        },
      });

      await users.updateOne(user, updateSubscriptionDeleted);
      user = await users.findOne({stripeCustomerId: customer});
      req.session.set('user', {
        id: user._id,
        user: user
      })
      await req.session.save();
      console.log('Subscription Canceled!')
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // returning recieved to acknowledge receipt of the event
  res.json({ received: true });
};

export default handler;
