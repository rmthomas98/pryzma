import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import axios from "axios";
import ButtonSpinner from "../ButtonSpinner";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripeLoader = loadStripe(
  "pk_test_51JAxp2F124ucKAQo7KtdCwvLoHXJy7tjvh5nCaPnxnrQKG0zjblM9tm7xVTA4UWSnav1b8UBPR6QglyGvMkTYsRr00i7L4aPdQ"
);

const PaymentElementProvider = ({
  paymentElementActive,
  user,
  setPaymentElementActive,
  paymentLoading,
  setPaymentLoading
}) => {
  const [clientSecret, setClientSecret] = useState();

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post("/api/setup-intent", {
        email: user.email,
      });
      setClientSecret(response.data.client_secret);
    };
    getClientSecret();
  }, []);

  console.log(clientSecret);
  const options = {
    clientSecret: clientSecret,
  };

  if (!clientSecret) return '';

  return (
    <Elements stripe={stripeLoader} options={options}>
      <PaymentModal paymentElementActive={paymentElementActive} setPaymentElementActive={setPaymentElementActive} paymentLoadin={paymentLoading} setPaymentLoading={setPaymentLoading}/>
    </Elements>
  );
};

const PaymentModal = ({paymentElementActive, setPaymentElementActive, paymentLoading, setPaymentLoading}) => {
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

    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/admin/manage-account?paymentMethodUpdated=true",
      },
    });
    // if errors
    if (result.error) {
      setErrorMessage(result.error.message)
      setIsSubmitting(false)
    }
  };

  const handleOutsideClick = () => {
    setPaymentElementActive(false);
    setPaymentLoading(false)
  }

  return (
    <>
    <div onClick={handleOutsideClick} className={`fixed h-screen w-screen top-0 left-0 bg-black/75 ${paymentElementActive ? 'opacity-100 z-[10]' : 'opacity-0 z-[-1]'}`}></div>
    <form className={`bg-white w-full max-w-screen-sm p-8 pb-12 rounded-lg top-1/2 translate-y-[-50%] mx-auto relative ${paymentElementActive ? 'opacity-100 z-[9999]' : 'opacity-0 z-[-1]'}`}>
      <p className="text-gray-700 font-bold text-2xl">
        Payment Information
      </p>
      <p className="mb-6 text-sm text-gray-500">You will not be charged until your 7 day free trial period is over.</p>
      <PaymentElement/>
      <div className="w-full flex mt-8">
      <button disabled={!stripe || isSubmitting ? true : false} onClick={handleSubmit} className={`h-[40px] w-[100px] flex justify-center items-center text-sm text-white font-medium rounded-md transition-all duration-300 ${
              isSubmitting ? "bg-indigo-400 hover:bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}>
        {isSubmitting ? <ButtonSpinner /> : 'Submit'}
      </button>
      </div>
      {errorMessage && (
        <div className="mt-6 mx-auto w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white">
            {errorMessage}
          </p>
        </div>
      )}
    </form>
    </>
  );
};

export default PaymentElementProvider;
