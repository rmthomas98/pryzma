import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
import { useState, useEffect } from "react";
import axios from "axios";

const stripeLoader = loadStripe(
  "pk_live_51KPVUKIUx22VK4GND2UgrqFocX2ESC1sH0gVucnDlPBFdAZGWesOUuPwspcBohLxfZAIj333jIcTrGWtUTzCUEJY00Paw2X5xG"
);

const ElementsProvider = ({ email }) => {
  const [clientSecret, setClientSecret] = useState();

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
    appearance: {
      labels: "floating",
      variables: {
        colorPrimary: "#8B5CF6",
        colorBackground: "#27272A",
        fontFamily: "Montserrat, sans-serif",
        colorText: "#A1A1AA",
      },
    },
  };

  if (!clientSecret) return "";

  return (
    <Elements stripe={stripeLoader} options={options}>
      <Payment />
    </Elements>
  );
};

export default ElementsProvider;
