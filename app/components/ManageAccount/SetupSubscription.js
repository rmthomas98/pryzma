import { useReducer, useState } from "react";
import ChoosePlan from "./ChoosePlan";
import AddPayment from "./AddPayment";

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return { step: state.step + 1 };
    case "decrement":
      return { step: state.step - 1 };
    default:
      return state;
  }
};

const SetupSubscription = ({ user, accountMessage }) => {
  // keep track of step user is in on sign up form
  const [step, dispatch] = useReducer(reducer, { step: 1 });

  // setting price to show customer
  const [price, setPrice] = useState();

  const increment = () => {
    dispatch({ type: "increment" });
  };

  return (
    <div className="relative">
      {accountMessage && (
        <div className="absolute top-[-210px] left-[50%] translate-x-[-50%] w-fit p-4 rounded-md bg-gradient-to-br from-amber-400 to-amber-600">
          <p className="text-xs font-semibold text-center text-black leading-5">
            {accountMessage}
          </p>
        </div>
      )}
      {step.step === 1 && (
        <ChoosePlan increment={increment} user={user} setPrice={setPrice} />
      )}
      {step.step === 2 && <AddPayment user={user} price={price} />}
    </div>
  );
};

export default SetupSubscription;
