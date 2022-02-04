import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonSpinner from "../ButtonSpinner";
import { CheckLg } from "react-bootstrap-icons";
import Link from "next/link";

const ContactInformation = ({ increment, email }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // SET SUBMITTING STATE
  const [isSubmitting, setIsSubmitting] = useState();
  // SET ERROR MESSAGE IF THERE IS AN ERROR AND DISPLAY IT TO THE USER
  const [errorMessage, setErrorMessage] = useState();
  // SETTING PASSWORDS DO NOT MATCH MESSAGE
  const [passwordMatch, setPasswordMatch] = useState(false);

  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) return;
    setIsSubmitting(true);
    // MAKE API CALL TO BACKEND TO CREATE STRIPE CUSTOMER AND ADD USER TO MONGODB
    const response = await axios
      .post("/api/create-customer", { data: data })
      .catch((err) => console.error(err));
    // ON RESPONSE DISPLAY ERROR OR INCREMENT FORM TO NEXT STEP
    response && setIsSubmitting(false);
    if (response.data.data === "customer created") {
      email.current = data.email;
      setIsSubmitting(false);
      setErrorMessage(false);
      increment();
    }
    if (response.data.data === "user already exists") {
      setIsSubmitting(false);
      setErrorMessage(
        "Email already exists, please try a different email, or login instead."
      );
    }
  };

  useEffect(() => {
    const password = watch("password");
    const confirmPassword = watch("confirmPassword");

    if (password.length >= 8 && confirmPassword.length >= 8) {
      password !== confirmPassword && setPasswordMatch(false);
      password === confirmPassword && setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  }, [watch("password"), watch("confirmPassword")]);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <p className="text-zinc-200 font-semibold text-2xl">
            Account Information
          </p>
          <p className="mt-6 text-sm text-zinc-300 pb-1">First Name</p>
          <input
            type="text"
            placeholder="First Name"
            className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
            {...register("first", { required: true })}
          />
          {errors.first && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-sm text-zinc-300 pb-1">Last Name</p>
          <input
            type="text"
            placeholder="Last Name"
            className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
            {...register("last", { required: true })}
          />
          {errors.last && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-sm text-zinc-300 pb-1">Email</p>
          <input
            type="email"
            placeholder="Email"
            className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-sm text-zinc-300 pb-1">
            Password (8 characters min)
          </p>
          <input
            type="password"
            placeholder="Password"
            className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password?.type === "required" && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
          {errors.password?.type === "minLength" && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *password must be at least 8 characters
            </p>
          )}
          {passwordMatch && (
            <p className="text-xs font-medium text-green-500 mt-0.5 absolute flex items-center">
              <CheckLg className="mr-1" />
              Passwords Match
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-sm text-zinc-300 pb-1">Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
            {...register("confirmPassword", { required: true, minLength: 8 })}
          />
          {errors.confirmPassword?.type === "required" && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
          {passwordMatch && (
            <p className="text-xs font-medium text-green-500 mt-0.5 absolute flex items-center">
              <CheckLg className="mr-1" />
              Passwords Match
            </p>
          )}
          {!passwordMatch && watch("confirmPassword")?.length >= 8 && (
            <p className="text-xs font-medium text-rose-600 absolute mt-0.5">
              *Passwords do not match
            </p>
          )}
          {errors.confirmPassword?.type === "minLength" && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *password must be at least 8 characters
            </p>
          )}
        </div>
        <div className="w-full mt-8 flex items-center justify-between">
          <button
            disabled={isSubmitting ? true : false}
            type="submit"
            className={`h-[40px] w-[180px] text-sm text-center text-white flex justify-center items-center font-medium rounded-md transition-all duration-300 ${
              isSubmitting
                ? "bg-violet-400/75 hover:bg-violet-400/75"
                : "bg-violet-600 hover:bg-violet-800"
            }`}
          >
            {isSubmitting ? <ButtonSpinner /> : "Create Account"}
          </button>
          <p>
            <span className="text-zinc-400 text-xs">
              Already have an account?
            </span>
            <Link href="/login">
              <a className="text-xs ml-2 text-zinc-400 hover:text-violet-400 underline">
                Sign In
              </a>
            </Link>
          </p>
        </div>
      </form>
      {errorMessage && (
        <div className="p-4 max-w-[300px] bg-gradient-to-br from-red-400 to-red-600 rounded-md absolute top-[100px] w-full left-1/2 translate-x-[-50%]">
          <p className="text-xs font-semibold text-center text-black">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactInformation;
