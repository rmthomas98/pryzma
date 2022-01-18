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

const AddPayment = ({user}) => {

  // set state for the client secret
  const [clientSecret, setClientSecret] = useState();

  // get client secret for set up intent
  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios.post("/api/setup-intent", {
        email: user.email,
      });
      setClientSecret(response.data.client_secret);
    };
    getClientSecret();
  }, []);

  const options = {
    clientSecret: clientSecret,
  };

  if (!clientSecret) return '';

  return (
    <Elements options={options} stripe={stripeLoader}>
      <Payment />
    </Elements>
  )
}

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
        return_url: "http://localhost:3000/admin/manage-account?subscriptionCreated=true",
      },
    });
    // if errors
    if (result.error) {
      setErrorMessage(result.error.message)
      setIsSubmitting(false)
    }
  };

  return (

  
  <form className='w-full'>
    <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-4 mt-12">
        Add Payment Method
      </p>
      <p className="mb-6 text-sm text-gray-500">You will not be charged until your 7 day free trial period is over.</p>
      <PaymentElement/>
      <button disabled={!stripe || isSubmitting ? true : false} onClick={handleSubmit} className={`h-[40px] mt-8 w-[100px] flex justify-center items-center text-sm text-white font-medium rounded-md transition-all duration-300 mr-2 ${
              isSubmitting ? "bg-indigo-400 hover:bg-indigo-400" : "bg-indigo-600 hover:bg-indigo-700"
            }`}>
        {isSubmitting ? <ButtonSpinner /> : 'Submit'}
      </button>
      {errorMessage && (
        <div className="mt-6 mx-auto w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white">
            {errorMessage}
          </p>
        </div>
      )}
    </form>
  )

}

export default AddPayment;