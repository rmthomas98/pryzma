import { ArrowReturnLeft, CheckCircle } from "react-bootstrap-icons";
import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import ButtonSpinner from "../ButtonSpinner";

const ChangeSubscriptionModal = ({
  plan,
  changeSubscriptionActive,
  setChangeSubscriptionActive,
  priceId,
  setPlan,
  user,
  setErrorMessage,
  setSuccess,
  refreshData,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscriptionChange = async () => {
    setIsSubmitting(true);
    const response = await axios
      .post("/api/update-subscription", {
        subscriptionId: user.subscriptionId,
        email: user.email,
        priceId: priceId,
      })
      .catch((e) => console.error(e));
    if (!response) return setErrorMessage(true);
    if (response.data === "subscription updated") {
      priceId === "price_1KPWKjIUx22VK4GNd2bVhQ27"
        ? setPlan("monthly")
        : setPlan("annual");
      setChangeSubscriptionActive(false);
      setIsSubmitting(false);
      setSuccess("subscription updated");
      setErrorMessage(false);
      setTimeout(() => {
        refreshData();
      }, 1000);
    }
    if (response.data === "something went wrong") {
      setIsSubmitting(false);
      setChangeSubscriptionActive(false);
      setErrorMessage(true);
      setSuccess(false);
    }
  };

  return (
    <div
      className={`${
        changeSubscriptionActive ? "z-10" : "z-[-1]"
      } fixed top-0 left-0 h-screen w-screen transition-all`}
    >
      <div
        onClick={() => setChangeSubscriptionActive(false)}
        className={`fixed h-screen w-screen bg-black/75 top-0 left-0 transition-all ${
          changeSubscriptionActive ? "opacity-100 z-[10]" : "opacity-0 z-[-1]"
        }`}
      ></div>
      <div
        className={`bg-zinc-800 rounded-lg p-6 pt-10 pb-10 z-[10] absolute w-[320px] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] transition-all ${
          changeSubscriptionActive ? "opacity-100 z-[10]" : "z-[-1] opacity-0"
        }`}
      >
        <p className="text-zinc-200 text-center leading-7 mb-10">
          {plan === "monthly"
            ? "Are you sure you want to upgrade to the annual plan? You will be pro-rated from the monthly plan, and your card will be charged immediately."
            : "Are you sure you want to downgrade to the monthly plan? Your subscription will be pro-rated and will go towards your next bills."}
        </p>
        <div className="flex justify-center">
          <button
            disabled={isSubmitting ? true : false}
            onClick={handleSubscriptionChange}
            className={`p-2.5 h-[40px] w-full mr-2 rounded-md transition-all duration-300 text-white font-medium text-sm flex items-center justify-center ${
              isSubmitting
                ? "bg-violet-400 hover:none"
                : "bg-violet-600 hover:bg-violet-800"
            }`}
          >
            {isSubmitting ? (
              <ButtonSpinner />
            ) : (
              <>
                <CheckCircle className="mr-2 text-xl" />
                Confirm
              </>
            )}
          </button>
          <button
            onClick={() => setChangeSubscriptionActive(false)}
            className="flex items-center p-2.5 w-full rounded-md bg-gray-500 justify-center text-sm text-white font-medium transition-all duration-300 hover:bg-gray-600"
          >
            Go Back
            <ArrowReturnLeft className="ml-2 text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeSubscriptionModal;
