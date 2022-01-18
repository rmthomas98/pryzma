import axios from "axios";
import { useState } from "react";
import {
  CreditCard,
  ArrowRepeat,
  XCircle,
  ArrowReturnLeft,
} from "react-bootstrap-icons";
import { useRouter } from "next/router";
import ButtonSpinner from "../ButtonSpinner";
import PaymentElementProvider from "./PaymentMethodModal";
import ChangeSubscriptionModal from "./ChangeSubscriptionModal";
import SetupSubscription from "./SetupSubscription";

const SubscriptionInformation = ({ user, accountMessage }) => {
  // router
  const router = useRouter();

  // if form is submitting
  const [isSubmitting, setIsSubmitting] = useState(false);
  // customers current plan to dislay...null, canceled, monthly, annual
  const [plan, setPlan] = useState(user.subscriptionType);
  // just shows customer was updates successfully
  const [success, setSuccess] = useState();
  // if some kind of error happens when trying to update subscription
  const [errorMessage, setErrorMessage] = useState(false);
  // this is the for the modal that pops up when canceling plan
  const [cancelModalActive, setCancelModalActive] = useState(false);
  // this is for the modal that pops up when renewing plan
  const [renewModalActive, setRenewModalActive] = useState(false);
  // payment element modal
  const [paymentElementActive, setPaymentElementActive] = useState(false);
  // change payment button loading
  const [paymentLoading, setPaymentLoading] = useState(false);
  // change subscription modal
  const [changeSubscriptionActive, setChangeSubscriptionActive] = useState(false);
  const [priceId, setPriceId] = useState();

  // function allows customer to cancel and renew their subscription
  const updateRenewal = async (e) => {
    setIsSubmitting(true);
    //check if payment is failed, if failed, we are canceling subscription right now
    if (user.paymentStatus === 'failed') {
      const response = await axios.post('/api/cancel-subscription', {subscriptionId: user.subscriptionId}).catch(e => console.error(e));
      if (response?.data === 'subscription deleted') {
        setIsSubmitting(false);
        setCancelModalActive(false);
        router.replace(router.asPath);
        return setSuccess('deleted')
      } else {
        setIsSubmitting(false);
        setCancelModalActive(false);
        return setErrorMessage(true)
      }
    }
    
    // send info to backend to update plan info
    const response = await axios.post("/api/auto-renew-subscription", {
      email: user.email,
      subscriptionId: user.subscriptionId,
      status: e.target.value,
    });
    // if response comes back renewed show message
    if (response.data === "subscription renewed") {
      setIsSubmitting(false);
      setRenewModalActive(false);
      router.replace(router.asPath);
      return setSuccess("renewed");
      // if response comes back canceled show message
    } else if (response.data === "subscription canceled") {
      setIsSubmitting(false);
      setCancelModalActive(false);
      router.replace(router.asPath);
      return setSuccess("canceled");
      // if something goes wrong, show error message
    } else {
      setIsSubmitting(false);
      setCancelModalActive(false);
      return setErrorMessage(true);
    }
  };

  // handle payment method update
  const handlePaymentMethodClick = () => {
    setPaymentElementActive(true);
    setPaymentLoading(true);
  };

  // handle subscription change
  const handleSubscriptionChange = async (e) => {
    setChangeSubscriptionActive(true);
    setPriceId(e.target.value);
  };

  // if user has no plan, make them choose plan
  if (user.subscriptionType === null  ) return <SetupSubscription accountMessage={accountMessage} user={user}/>

  return (
    <div>
      {success && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-emerald-800 border-2 border-emerald-400 rounded-lg shadow-lg shadow-gray-400">
          {success === "canceled" && (
            <p className="text-xs font-bold text-center text-white leading-5">
              Your Subscription has been canceled.
              <br />
              You will have access until the next billing period.
            </p>
          )}
          {success === "renewed" && (
            <p className="text-xs font-bold text-center text-white leading-5">
              Your subscription has been renewed.
              <br />
              You will continue to be billed normally.
            </p>
          )}
          {success === "subscription updated" && (
            <p className="text-xs font-bold text-center text-white leading-5">
              Your subscription has been updated!
            </p>
          )}
          {success === "subscription updated" && (
            <p className="text-xs font-bold text-center text-white leading-5">
              Your subscription has been canceled.<br />
              We hope you come back soon!
            </p>
          )}
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            Something went wrong, please try again.
          </p>
        </div>
      )}
      {router.query.paymentMethodUpdated && !success && !accountMessage && <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-emerald-800 border-2 border-emerald-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            Your Payment method has been updated!
          </p>
        </div>}
        {router.query.subscriptionCreated && !success && !accountMessage &&  <div className="absolute top-[100px] left-[50%] translate-x-[-50%] min-w-[300px] w-fit p-4 pt-6 pb-6 bg-emerald-800 border-2 border-emerald-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            Your 7 day free trial has started! <br />
            Your card will not be charged until the trial is over.
          </p>
        </div>}
      {accountMessage && !success && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-yellow-700 border-2 border-yellow-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            {accountMessage}
          </p>
        </div>
      )}
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-8 mt-12">
        Subscription Information
      </p>
      <div className="border-gray-300 border p-3 w-full rounded-md shadow-sm text-sm shadow-gray-300 flex justify-between items-center mb-4">
        <p className="text-gray-800">
          <span className="font-medium">Prizm Pro Monthly</span>{" "}
          <span>($19.99/mo)</span>
        </p>
        <button
          onClick={handleSubscriptionChange}
          value="price_1KFhUZF124ucKAQoKJD5oDgr"
          disabled={plan === "monthly" || user.paymentStatus === 'failed' ? true : false}
          className={`p-2 w-[116px] rounded-md font-medium transition-all duration-300 ${
            plan === "monthly"
              ? "bg-gradient-to-r from-rose-600 to-indigo-600 text-white"
              : "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
          } ${user.paymentStatus === 'failed' ? 'cursor-not-allowed hover' : 'hover:bg-transparent'}`}
        >
          {plan === "monthly" && "Current Plan"}
          {plan === "annual" && "Change Plan"}
          {plan === "canceled" || plan === null ? "Select Plan" : ""}
        </button>
      </div>
      <div className="border-gray-300 border p-3 w-full rounded-md shadow-sm text-sm shadow-gray-300 flex justify-between items-center">
        <p className="text-gray-800">
          <span className="font-medium">Prizm Pro Annual</span>{" "}
          <span>($199.99/yr)</span>
        </p>
        <button
          onClick={handleSubscriptionChange}
          value="price_1KFhV3F124ucKAQoEPMNXfBN"
          disabled={plan === "annual" || user.paymentStatus === 'failed' ? true : false}
          className={`p-2 w-[116px] rounded-md font-medium transition-all duration-300 ${
            plan === "annual"
              ? "bg-gradient-to-r from-rose-600 to-indigo-600 text-white"
              : "border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white"
          } ${user.paymentStatus === 'failed' ? 'cursor-not-allowed hover:bg-transparent' : ''}`}
        >
          {plan === "annual" && "Current Plan"}
          {plan === "monthly" && "Change Plan"}
          {plan === "canceled" || plan === null ? "Select Plan" : ""}
        </button>
      </div>
      {user.cardDetails ? (
        <p className="text-gray-800 mt-6 text-sm flex items-center">
          <span className="font-medium mr-4">Default Payment Method</span>
          <span className="rounded-md border border-gray-300 p-2 pl-4 pr-4 flex items-center">
            <span className="mr-4 uppercase italic flex items-center">
              <CreditCard className="mr-2 text-xl" />
              {user.cardDetails.brand}
            </span>
            <span>****{user.cardDetails.last4}</span>
          </span>
        </p>
      ) : (
        ""
      )}
      <div className="mt-8 flex">
        {(user.cancelAtPeriodEnd === false &&
          user.subscriptionType &&
          user.subscriptionType !== "canceled") ||
        user.subscriptionType === null ? (
          <button
            disabled={paymentLoading ? true : false}
            onClick={handlePaymentMethodClick}
            className={`p-2.5 pl-4 pr-4 rounded-md border transition-all duration-300 text-sm font-medium text-white flex items-center mr-4 ${
              paymentLoading
                ? "bg-indigo-400 hover:none border-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700 border-indigo-600 hover:border-indigo-700"
            }`}
          >
            <CreditCard className="mr-2 text-xl" />
            Update Payment Method
          </button>
        ) : (
          ""
        )}
        {user.cancelAtPeriodEnd && user.subscriptionId ? (
          <button
            onClick={() => setRenewModalActive(true)}
            className={`p-2.5 pl-4 pr-4 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all duration-300 flex items-center`}
          >
            <ArrowRepeat className="mr-2 text-xl" />
            Renew Plan
          </button>
        ) : (
          ""
        )}
        {!user.cancelAtPeriodEnd && user.subscriptionType !== "canceled" ? (
          <button
            onClick={() => setCancelModalActive(true)}
            className="p-2.5 pl-4 pr-4 rounded-md border border-rose-600 text-xs font-medium text-rose-600 flex items-center hover:text-white hover:bg-rose-600 transition-all duration-300"
          >
            <XCircle className="mr-2 text-xl" />
            Cancel Plan
          </button>
        ) : (
          ""
        )}
      </div>
      <CancelModal
        updateRenewal={updateRenewal}
        isSubmitting={isSubmitting}
        cancelModalActive={cancelModalActive}
        setCancelModalActive={setCancelModalActive}
        user={user}
      />
      <RenewModal
        updateRenewal={updateRenewal}
        isSubmitting={isSubmitting}
        renewModalActive={renewModalActive}
        setRenewModalActive={setRenewModalActive}
      />
      {paymentElementActive && (
        <PaymentElementProvider
          paymentElementActive={paymentElementActive}
          setPaymentElementActive={setPaymentElementActive}
          user={user}
          paymentLoading={paymentLoading}
          setPaymentLoading={setPaymentLoading}
        />
      )}
      <ChangeSubscriptionModal
        plan={plan}
        changeSubscriptionActive={changeSubscriptionActive}
        setChangeSubscriptionActive={setChangeSubscriptionActive}
        priceId={priceId}
        setPlan={setPlan}
        user={user}
        setErrorMessage={setErrorMessage}
        setSuccess={setSuccess}
      />
    </div>
  );
};

// cancel subscription modal
const CancelModal = ({
  updateRenewal,
  isSubmitting,
  cancelModalActive,
  setCancelModalActive,
  user
}) => {
  return (
    <>
      <div
        onClick={() => setCancelModalActive(false)}
        className={`fixed h-screen w-screen top-0 left-0 bg-black/75 transition-all ${
          cancelModalActive ? "opacity-100 z-[10]" : "opacity-0 z-[-1]"
        }`}
      ></div>
      <div
        className={`w-[320px] bg-gray-100 p-6 pt-10 pb-10 rounded-lg fixed transition-all top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] ${
          cancelModalActive ? "opacity-100 z-[10]" : "opacity-0 z-[-1]"
        }`}
      >
        <p className="text-gray-800 text-center leading-7 mb-10">
          { user.paymentStatus !== 'failed' && 'Are you sure you want to cancel your subscription? You will still have access to your current services until the next billing period.'}
          {user.paymentStatus === 'failed' && 'Are you sure you want to cancel your subscription? You will lose all access to features immediately.'}
        </p>
        <div className="flex justify-center">
          <button
            value={true}
            disabled={isSubmitting ? true : false}
            onClick={updateRenewal}
            className={`h-[40px] mr-2 p-2.5 w-full rounded-md text-white text-sm font-medium transition-all flex items-center justify-center duration-300 ${
              isSubmitting
                ? "bg-rose-400 hover:none"
                : "bg-rose-600 hover:bg-rose-700"
            }`}
          >
            {isSubmitting ? (
              <ButtonSpinner />
            ) : (
              <>
                <XCircle className="mr-2 text-xl " />
                Cancel Plan
              </>
            )}
          </button>
          <button
            onClick={() => setCancelModalActive(false)}
            className="h-[40px] p-2.5 w-full rounded-md bg-gray-400 text-white text-sm font-medium flex items-center justify-center transition-all duration-300 hover:bg-gray-500"
          >
            Go Back
            <ArrowReturnLeft className="text-xl ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};

// renew modal
const RenewModal = ({
  updateRenewal,
  isSubmitting,
  renewModalActive,
  setRenewModalActive,
}) => {
  return (
    <>
      <div
        onClick={() => setRenewModalActive(false)}
        className={`fixed h-screen w-screen top-0 left-0 bg-black/75 transition-all ${
          renewModalActive ? "opacity-100 z-[10]" : "opacity-0 z-[-1]"
        }`}
      ></div>
      <div
        className={`w-[320px] bg-gray-100 p-6 pt-10 pb-10 rounded-lg fixed transition-all top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] ${
          renewModalActive ? "opacity-100 z-[10]" : "opacity-0 z-[-1]"
        }`}
      >
        <p className="text-gray-800 text-center leading-7 mb-10">
          Are you sure you want to renew your current subscription? Doing so
          will allow you to keep your current services, while being billed
          normally.
        </p>
        <div className="flex justify-center">
          <button
            value={undefined}
            disabled={isSubmitting ? true : false}
            onClick={updateRenewal}
            className={`h-[40px] mr-2 p-2.5 w-full rounded-md text-white text-sm font-medium transition-all flex items-center justify-center duration-300 ${
              isSubmitting
                ? "bg-indigo-400 hover:none"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? (
              <ButtonSpinner />
            ) : (
              <>
                <ArrowRepeat className="mr-2 text-xl " />
                Renew Plan
              </>
            )}
          </button>
          <button
            onClick={() => setRenewModalActive(false)}
            className="h-[40px] p-2.5 w-full rounded-md bg-gray-400 text-white text-sm font-medium flex items-center justify-center transition-all duration-300 hover:bg-gray-500"
          >
            Go Back
            <ArrowReturnLeft className="text-xl ml-2" />
          </button>
        </div>
      </div>
    </>
  );
};

export default SubscriptionInformation;
