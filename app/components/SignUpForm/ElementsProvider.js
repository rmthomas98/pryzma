import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import { useState, useEffect } from "react";
import axios from "axios";

const stripeLoader = loadStripe(
  "pk_test_51JAxp2F124ucKAQo7KtdCwvLoHXJy7tjvh5nCaPnxnrQKG0zjblM9tm7xVTA4UWSnav1b8UBPR6QglyGvMkTYsRr00i7L4aPdQ"
);

const ElementsProvider = ({email}) => {

  const [clientSecret, setClientSecret] = useState()

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post("/api/setup-intent", {
        email: email.current,
      });
      setClientSecret(response.data.client_secret);
    };
    getClientSecret();
  }, []);

  const options = {
    clientSecret: clientSecret,
  };

  if (!clientSecret) return ''

  return (
    <Elements stripe={stripeLoader} options={options}>
      <Payment />
    </Elements>
  )
}

export default ElementsProvider;