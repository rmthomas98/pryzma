import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import ButtonSpinner from "../ButtonSpinner";

const Payment = () => {
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
        return_url: "http://localhost:3000/login?newAccount=true",
      },
    });
    // if errors
    if (result.error) {
      setErrorMessage(result.error.message)
      setIsSubmitting(false)
    }
  };

  return (
    <form className="w-full">
      <p className="text-gray-700 font-bold text-2xl">
        Payment Information
      </p>
      <p className="mb-6 text-sm text-gray-500">You will not be charged until your 7 day free trial period is over.</p>
      <PaymentElement />
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
  );
};

export default Payment;
