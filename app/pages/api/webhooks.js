import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

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

      await users.updateOne({email: user.email}, updatePaymentStatus);
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
      await users.updateOne({email: user.email}, updatePaymentStatus);
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
        await users.updateOne({email: user.email}, updatePaymentStatus);
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
          cardDetails: null,
          cancelAtPeriodEnd: false
        },
      };

      await stripe.customers.update(user.stripeCustomerId, {
        invoice_settings: {
          default_payment_method: null
        },
      });

      await users.updateOne({email: user.email}, updateSubscriptionDeleted);
      console.log('Subscription Canceled!')
      break;
    // GET CARD DETAILS
    case 'payment_method.attached':
      customer = event.data.object.customer;
      user = await users.findOne({stripeCustomerId: customer});

      // update card details in mongodb
      const cardDetails = {
        $set: {
          cardDetails: {brand: event.data.object.card.brand, last4: event.data.object.card.last4}
        }
      }

      // update customer in mongodb
      await users.updateOne({stripeCustomerId: customer}, cardDetails);

      console.log('Payment method attached!')
    // unhandled event types get logged to the console  
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  // returning recieved to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

export default handler;