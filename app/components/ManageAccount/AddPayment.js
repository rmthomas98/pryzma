import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import ButtonSpinner from "../ButtonSpinner";
import { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";

const stripeLoader = loadStripe(
  "pk_test_51JAxp2F124ucKAQo7KtdCwvLoHXJy7tjvh5nCaPnxnrQKG0zjblM9tm7xVTA4UWSnav1b8UBPR6QglyGvMkTYsRr00i7L4aPdQ"
);

const AddPayment = ({ user, price }) => {
  // set state for the client secret
  const [clientSecret, setClientSecret] = useState();

  // get client secret for set up intent
  useEffect(() => {
    // check if user has had trial before
    // if they have not had trial before, set up trial
    if (!user.trial && !user.isCanceled) {
      const getClientSecret = async () => {
        const response = await axios.post("/api/setup-intent", {
          email: user.email,
        });
        setClientSecret(response.data.client_secret);
      };
      getClientSecret();
      // if user has already used trial, set up payment intent to be charged right away
    } else {
      // get client secret passed through from subscription page
      const getPaymentIntent = async () => {
        const response = await axios.post("/api/retrieve-payment-intent", {
          customerId: user.stripeCustomerId,
        });
        if (response.data === "something went wrong") return; // show an error message
        setClientSecret(response.data.data[0].client_secret);
      };
      getPaymentIntent();
    }
  }, []);

  const options = {
    clientSecret: clientSecret,
  };

  if (!clientSecret) return "";

  return (
    <Elements options={options} stripe={stripeLoader}>
      <Payment user={user} price={price} />
    </Elements>
  );
};

const Payment = ({ user, price }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!stripe || !elements) {
      // DISABLE FORM SUBMISSION IF FORM HAS NOT LOADED
      return;
    }

    if (!user.trial || !user.isCanceled) {
      // if user hasnt used trial, we are only setting up card for future payments
      const result = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/admin/subscription-created",
        },
      });

      // if errors
      if (result.error) {
        setErrorMessage(result.error.message);
        setIsSubmitting(false);
      }
    } else {
      // if user has used trial, we are charging their card now
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/admin/subscription-created",
        },
      });

      // if errors
      if (result.error) {
        setErrorMessage(result.error.message);
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form className="w-full">
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-4 mt-12">
        Add Payment Method
      </p>
      {!user.isCanceled && (
        <p className="mb-6 text-sm text-gray-500">
          You will not be charged until your 7 day free trial period is over.
        </p>
      )}
      {user.isCanceled && (
        <p className="mb-6 text-sm text-gray-500">
          You are now signing up for the{" "}
          {price === "monthly" ? "monthly" : "annual"} plan for{" "}
          {price === "monthly" ? "$19.99/mo" : "$199.99/yr"}
        </p>
      )}
      <PaymentElement />
      <button
        disabled={!stripe || isSubmitting ? true : false}
        onClick={handleSubmit}
        className={`h-[40px] mt-8 w-[100px] flex justify-center items-center text-sm text-white font-medium rounded-md transition-all duration-300 mr-2 ${
          isSubmitting
            ? "bg-indigo-400 hover:bg-indigo-400"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {isSubmitting ? (
          <ButtonSpinner />
        ) : user.isCanceled ? (
          `Pay ${price === "monthly" ? "$19.99" : "$199.99"}`
        ) : (
          "Submit"
        )}
      </button>
      {errorMessage && (
        <div className="mt-6 mx-auto w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white">
            {errorMessage}
          </p>
        </div>
      )}
    </form>
  );
};

export default AddPayment;
