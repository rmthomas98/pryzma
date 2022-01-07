import { useReducer, useState } from "react";

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

  const [pricingSelection, pricingSelection] = useState();

  return (
    <div className="mt-24 mb-20">
      <div className="w-full max-w-screen-sm mx-auto">
        <p className="text-gray-900 text-4xl">Sign Up Now</p>
        <form className="w-full">
          <div>
            <p className="text-sm mt-8 pb-1">First Name</p>
            <input type="text" placeholder="First Name" className="border border-gray-300 rounded-md p-2 outline-none w-full"/>
          </div>
          <div>
            <p className="text-sm mt-5 pb-1">Last Name</p>
            <input type="text" placeholder="Last Name" className="border border-gray-300 rounded-md p-2 outline-none w-full"/>
          </div>
          <div>
            <p className="text-sm mt-5 pb-1">Email</p>
            <input type="email" placeholder="Email" className="border border-gray-300 rounded-md p-2 outline-none w-full"/>
          </div>
          <div>
            <p className="text-sm mt-5 pb-1">Password</p>
            <input type="password" placeholder="Password" className="border border-gray-300 rounded-md p-2 outline-none w-full"/>
          </div>
          <div>
            <p className="text-sm mt-5 pb-1">Confirm Password</p>
            <input type="password" placeholder="Confirm Password" className="border border-gray-300 rounded-md p-2 outline-none mb-6 w-full"/>
          </div>
          <button type="submit" className="p-2 pl-6 pr-6 text-white font-medium text-sm bg-gradient-to-r from-rose-600 to-indigo-600 rounded-md hover:shadow-md hover:shadow-gray-500 transition-all duration-300">Sign up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
