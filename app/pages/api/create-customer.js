import clientPromise from "../../lib/mongodb";
const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

const handler = async (req, res) => {
  try {
    // CONNECT TO DATABSE
    const client = await clientPromise;
    const db = client.db();
    const collection = db.collection("users");

    // SEE IF USER EXISTS IN DATABASE
    const user = await collection
      .find({ email: req.body.data.email })
      .toArray();

    // IF USER DOES EXIST, SEND MESSAGE TO FRONT END SAYING USER ALREADY EXISTS
    if (user.length) {
      return res.status(200).json({ data: "user already exists" });
    }

    // IF USER DOES NOT EXIST IN DATABASE, CREATE USER MONGODB AND CREATE NEW STRIPE CUSTOMER
    const customer = await stripe.customers.create({
      name: `${req.body.data.first} ${req.body.data.last}`,
      email: req.body.data.email,
    });

    // CREATE THE CUSTOMER FOR MONGODB
    const newUser = {
      stripeCustomerId: customer.id,
      subscriptionId: null,
      paymentStatus: '',
      firstName: req.body.data.first,
      lastName: req.body.data.last,
      email: req.body.data.email,
      password: req.body.data.password,
    };

    // INSERT CUSTOMER INTO MONGODB
    await collection.insertOne(newUser);
    res.status(200).json({ data: "customer created" });
  } catch (e) {
    //CATCH ANY ERRORS
    res.json({data: e});
  }
};

export default handler;
