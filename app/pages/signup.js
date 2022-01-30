import { useReducer, useRef, useState } from "react";
import ContactInformation from "../components/SignUpForm/ContactInformation";
import Plan from "../components/SignUpForm/Plan";
import ElementsProvider from "../components/SignUpForm/ElementsProvider";
import { withIronSession } from "next-iron-session";

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

const Signup = () => {
  // keep track of step user is in on sign up form
  const [step, dispatch] = useReducer(reducer, { step: 1 });
  // setting user email so we can look up when choosing plan
  const email = useRef();
  // go to next step
  const increment = () => {
    dispatch({ type: "increment" });
  };

  return (
    <div className="h-[calc(100vh-80px)] min-h-[900px] flex">
      <div className="w-full max-w-screen-sm mx-auto mt-40">
        <div className="mb-2 font-medium text-zinc-300">Step {step.step}/3</div>
        <div className="flex mb-6">
          <span
            className={`h-0.5 w-full mr-2 rounded-full bg-violet-500 shadow-[0px_0px_5px_#9333ea]`}
          ></span>
          <span
            className={`h-0.5 w-full mr-2 rounded-full ${
              step.step >= 2
                ? "bg-violet-500 shadow-[0px_0px_5px_#9333ea]"
                : "bg-zinc-500"
            }`}
          ></span>
          <span
            className={`h-0.5 w-full mr-2 rounded-full ${
              step.step === 3
                ? "bg-violet-500 shadow-[0px_0px_5px_#9333ea]"
                : "bg-zinc-500"
            }`}
          ></span>
        </div>
        {step.step === 1 && (
          <ContactInformation increment={increment} email={email} />
        )}
        {step.step === 2 && <Plan increment={increment} email={email} />}
        {step.step === 3 && <ElementsProvider email={email} />}
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSession(
  ({ req, res }) => {
    const user = req.session.get("user");

    if (!user) return { props: {} };

    return {
      redirect: {
        permanant: false,
        destination: "/admin",
      },
      props: {},
    };
  },
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: "user",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  }
);

export default Signup;
