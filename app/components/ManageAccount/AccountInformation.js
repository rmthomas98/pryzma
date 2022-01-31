import axios from "axios";
import { format } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../ButtonSpinner";

const AccountInformation = ({ user }) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const response = await axios
      .post("/api/update-customer", {
        newEmail: data.email,
        oldEmail: user.email,
        firstName: data.firstName,
        lastName: data.lastName,
      })
      .catch((e) => console.error(e));
    console.log(response);
    if (response.data !== "email is already in use") {
      setIsSubmitting(false);
      setSuccess(true);
      return router.replace(router.asPath, {
        query: {
          updatedAccount: `${data.firstName},${data.lastName},${data.email}`,
        },
      });
    }
    if (response.data === "email is already in use") {
      setIsSubmitting(false);
      return setEmailError("*email already in use");
    }
    setErrorMessage("something went wrong, please try again");
    setIsSubmitting(false);
  };

  return (
    <div className="relative">
      {errorMessage && (
        <div className="absolute top-[-200px] left-[50%] translate-x-[-50%] w-fit p-4 rounded-md bg-gradient-to-br from-red-400 to-red-600">
          <p className="text-xs font-semibold text-center text-black leading-5">
            {errorMessage}
          </p>
        </div>
      )}
      {success && (
        <div className="absolute top-[-200px] left-[50%] translate-x-[-50%] w-fit p-4 rounded-md bg-gradient-to-br from-green-400 to-green-600">
          <p className="text-xs font-semibold text-center text-black leading-5">
            Your account has been updated.
          </p>
        </div>
      )}
      {/* <p className="text-gray-700 font-bold text-2xl pb-3 mb-6 mt-12 animate-fadeInUp translate-y-12">
        Account Information
      </p> */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="animate-fadeInUp translate-y-12"
      >
        <div className="flex w-full">
          <div className="w-full mr-4 mb-6">
            <p className="text-sm text-zinc-300 pb-1">First Name</p>
            <input
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
              {...register("firstName", { required: true, value: firstName })}
            />
            {errors.firstName && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                *required field
              </p>
            )}
          </div>
          <div className="w-full">
            <p className="text-sm text-zinc-300 pb-1">Last Name</p>
            <input
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
              {...register("lastName", { required: true, value: lastName })}
            />
            {errors.lastName && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                *required field
              </p>
            )}
          </div>
        </div>
        <div className="flex w-full">
          <div className="w-full mr-4">
            <p className="text-sm text-zinc-300 pb-1">Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="p-2.5 rounded-md text-zinc-400 border w-full border-zinc-700 outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200"
              {...register("email", { required: true, value: email })}
            />
            {errors.email && !emailError && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                *required field
              </p>
            )}
            {emailError && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                *email is already in use
              </p>
            )}
          </div>
          <div className="w-full">
            <p className="text-sm text-zinc-300 pb-1">Date Joined</p>
            <p className="mt-2 text-zinc-400">
              {format(new Date(user.dateJoined), "MMMM dd, yyyy")}
            </p>
          </div>
        </div>
        <button
          disabled={isSubmitting ? true : false}
          type="submit"
          className={`text-sm mt-8 text-white font-medium rounded-md h-[40px] w-[180px] flex items-center justify-center transition-all duration-300 ${
            isSubmitting
              ? "bg-violet-400/75 hover:none"
              : "bg-violet-600 hover:bg-violet-800"
          }`}
        >
          {isSubmitting ? <ButtonSpinner /> : "Update Account Info"}
        </button>
      </form>
    </div>
  );
};

export default AccountInformation;
