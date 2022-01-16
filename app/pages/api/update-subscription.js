import clientPromise from "../../lib/mongodb";
import { withIronSession } from "next-iron-session";
const stripe = require("stripe")(
  "sk_test_51JAxp2F124ucKAQocBFd1Ivxxpj4YRPSHcNVnZWdB5rhpBXegcyNigbf6E4tEuPDsrj7XzX0dh6xKK12QK8M8Qa900TYmxILAG"
);

const handler = async (req, res, session) => {
  const email = req.body.email;
  const priceId = req.body.priceId;

}
