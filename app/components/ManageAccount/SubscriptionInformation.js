import { useState } from "react";
import { CreditCard } from "react-bootstrap-icons";

const SubscriptionInformation = ({ user }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div>
      {" "}
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-8 mt-12">
        Subscription Information
      </p>
      <div className="border-gray-300 border p-3 w-full rounded-md shadow-sm text-sm shadow-gray-300 flex justify-between items-center mb-4">
        <p className="text-gray-800 font-medium">Prizm Pro Monthly</p>
        <p className="text-gray-800">$19.99/mo</p>
        <button className="p-2 pl-4 pr-4 bg-gradient-to-r from-rose-600 to-indigo-600 rounded-md text-white font-medium ">
          Current Plan
        </button>
      </div>
      <div className="border-gray-300 border p-3 w-full rounded-md shadow-sm text-sm shadow-gray-300 flex justify-between items-center">
        <p className="text-gray-800 font-medium">Prizm Pro Annual</p>
        <p className="text-gray-800">$199.99/yr</p>
        <button className="p-2 pl-4 pr-4 border border-indigo-600 rounded-md text-indigo-600 font-medium">
          Change Plan
        </button>
      </div>
      <div className="mt-8">
        <button className="p-2.5 pl-4 pr-4 rounded-md border border-indigo-600 text-sm font-medium text-indigo-600 flex items-center mb-4"><CreditCard className="mr-2 text-xl"/>Update Payment Method</button>
        <button className="text-xs text-gray-600 hover:text-rose-600 transition-all hover:underline">Cancel Plan</button>
      </div>
    </div>
  );
};

export default SubscriptionInformation;
