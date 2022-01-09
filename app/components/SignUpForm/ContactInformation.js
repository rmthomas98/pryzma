import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import ButtonSpinner from "../ButtonSpinner";
import {CheckLg} from 'react-bootstrap-icons';

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
    if (data.password !== data.confirmPassword) return
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
      increment();
    }
    if (response.data.data === "user already exists") {
      setIsSubmitting(false);
      setErrorMessage(
        "Email already exists, please try a different one, or login instead."
      );
    }
    console.log(response.data.data);
  };

  useEffect(() => {
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');
    
    if (password.length >= 8 && confirmPassword.length >= 8) {
      password !== confirmPassword && setPasswordMatch(false);
      password === confirmPassword && setPasswordMatch(true);
    } else {
      setPasswordMatch(false)
    }

  },[watch('password'), watch('confirmPassword')])

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <p className="text-gray-700 font-bold text-2xl">
            Account Information
          </p>
          <p className="mt-6 text-sm text-gray-800 pb-0.5">First Name</p>
          <input
            type="text"
            placeholder="First Name"
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300"
            {...register("first", { required: true })}
          />
          {errors.first && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-sm text-gray-800 pb-0.5">Last Name</p>
          <input
            type="text"
            placeholder="Last Name"
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300"
            {...register("last", { required: true })}
          />
          {errors.last && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-sm text-gray-800 pb-0.5">Email</p>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
        </div>
        <div>
          <p className="mt-6 text-sm text-gray-800 pb-0.5">Password (8 characters min)</p>
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300"
            {...register("password", { required: true, minLength: 8 })}
          />
          {console.log(errors)}
          {errors.password?.type === 'required' && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
          {errors.password?.type === 'minLength' && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *password must be at least 8 characters
            </p>
          )}
          {passwordMatch && <p className="text-xs font-medium text-green-500 mt-0.5 absolute flex items-center"><CheckLg className="mr-1"/>Passwords Match</p>}
        </div>
        <div>
          <p className="mt-6 text-sm text-gray-800 pb-0.5">Confirm Password</p>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full p-2.5 rounded-md border border-gray-300 outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300"
            {...register("confirmPassword", { required: true, minLength: 8 })}
          />
          {errors.confirmPassword?.type === 'required' && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *required field
            </p>
          )}
          {passwordMatch && <p className="text-xs font-medium text-green-500 mt-0.5 absolute flex items-center"><CheckLg className="mr-1"/>Passwords Match</p>}
          {!passwordMatch && watch('confirmPassword')?.length >= 8 && <p className="text-xs font-medium text-rose-600 absolute mt-0.5">*Passwords do not match</p>}
          {errors.confirmPassword?.type === 'minLength' && (
            <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
              *password must be at least 8 characters
            </p>
          )}
        </div>
        <div className="w-full mt-8 flex">
          <button
            disabled={isSubmitting ? true : false}
            type="submit"
            className={`h-[40px] w-[100px] text-sm text-center text-white flex justify-center items-center font-medium rounded-md hover:bg-indigo-700 transition-all duration-300 ${
              isSubmitting ? "bg-gray-400 hover:bg-gray-400" : "bg-indigo-600"
            }`}
          >
            {isSubmitting ? <ButtonSpinner /> : 'Next'}
          </button>
        </div>
      </form>
      {errorMessage && (
        <div className="mt-6 mx-auto w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default ContactInformation;
