import { useReducer, useRef, useState } from "react";
import ContactInformation from "../components/SignUpForm/ContactInformation";
import Plan from "../components/SignUpForm/Plan";
import ElementsProvider from "../components/SignUpForm/ElementsProvider";

// reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return {step: state.step + 1};
    case 'decrement':
      return {step: state.step - 1 }
    default:
      return state
  }
}

const Signup = () => {

  // keep track of step user is in on sign up form
  const [step, dispatch] = useReducer(reducer, {step: 1});
  // setting user email so we can look up when choosing plan
  const email = useRef();
  // go to next step
  const increment = () => {
    dispatch({type: 'increment'})
  }

  return (
    <div className="mt-24 mb-20">
      <div className="w-full max-w-screen-sm mx-auto">
      <div className='mb-2 font-medium text-gray-800'>Step {step.step}/3</div>
      <div className='flex mb-6'>
        <span className={`h-0.5 w-full mr-2 rounded-full bg-gradient-to-r from-rose-600 to-indigo-600`}></span>
        <span className={`h-0.5 w-full mr-2 rounded-full ${step.step >= 2 ? 'bg-gradient-to-r from-rose-600 to-indigo-600' : 'bg-gray-300'}`}></span>
        <span className={`h-0.5 w-full mr-2 rounded-full ${step.step === 3 ? 'bg-gradient-to-r from-rose-600 to-indigo-600' : 'bg-gray-300'}`}></span>
      </div>
        {step.step === 1 && <ContactInformation increment={increment} email={email}/>}
        {step.step === 2 && <Plan increment={increment} email={email}/>}
        {step.step === 3 && <ElementsProvider email={email}/>}
      </div>
    </div>
  );
};

export default Signup;
