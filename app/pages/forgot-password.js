import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import ButtonSpinner from "../components/ButtonSpinner";
import { useRouter } from "next/router";

const ForgotPassword = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const response = await axios
      .post("/api/forgot-password", { email: data.email })
      .catch(() => {
        setErrorMessage("Something went wrong, please try again.");
        setIsSubmitting(false);
      });
    if (response) {
      if (response.data === "email sent") {
        setIsSubmitting(false);
        return setMessage(
          "An email has been sent to you with instructions on how to reset your password."
        );
      }
      if (response.data === "user not found") {
        setIsSubmitting(false);
        return setErrorMessage(
          "The email you entered was not found in our records."
        );
      }
      if (response.data === "something went wrong") {
        setIsSubmitting(false);
        return setErrorMessage("Something went wrong, please try again.");
      }
    } else {
      setIsSubmitting(false);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto h-[calc(100vh-80px)] min-h-[600px] flex flex-col">
      {errorMessage && (
        <div className="absolute top-[100px] max-w-[300px] left-[50%] translate-x-[-50%] p-4 rounded-md bg-gradient-to-br from-red-400 to-red-600">
          <p className="text-xs font-semibold text-center text-black leading-5">
            {errorMessage}
          </p>
        </div>
      )}
      {message && (
        <div className="absolute top-[100px] max-w-[320px] left-[50%] translate-x-[-50%] p-4 rounded-md bg-gradient-to-br from-green-400 to-green-600">
          <p className="text-xs font-semibold text-center text-black leading-5">
            {message}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-40">
        <p className="font-semibold text-zinc-200 text-2xl text-center">
          Forgot Password
        </p>
        <p className="text-sm font-medium text-zinc-400 mt-2 text-center leading-6">
          Enter the email associated with your account. If there is an existing
          account with the provided email, we will send you an email with a
          special link to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email"
          className="mt-8 w-full p-2.5 rounded-md text-zinc-400 border outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200 border-zinc-700"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
            *required field
          </p>
        )}
        <button
          disabled={isSubmitting ? true : false}
          type="submit"
          className={`text-white mx-auto font-medium text-sm h-[40px] flex items-center justify-center w-full mt-8 rounded-md transition-all duration-300 ${
            isSubmitting
              ? "bg-violet-400/75"
              : "bg-violet-600 hover:bg-violet-800"
          }`}
        >
          {isSubmitting ? <ButtonSpinner /> : "Submit"}
        </button>
      </form>
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => router.back()}
          className="hover:text-violet-400 transition-all hover:underline text-xs text-zinc-400"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
