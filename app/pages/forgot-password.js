import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import ButtonSpinner from '../components/ButtonSpinner';

const ForgotPassword = () => {
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
    const response = await axios.post('/api/forgot-password', {email: data.email}).catch(() => setErrorMessage('Something went wrong, please try again.'));
    if (response) {
      if (response.data === 'email sent') {
        setIsSubmitting(false);
        return setMessage('An email has been sent to you with instructions on how to reset your password.')
      }
      if (response.data === 'user not found') {
        setIsSubmitting(false);
        return setErrorMessage('The email you entered was not found in our records.')
      }
    } else {
      setIsSubmitting(false);
      setErrorMessage('Something went wrong, please try again.')
    }
  };

  return (
    <div className="max-w-sm w-full mx-auto mt-40 mb-20">
    {errorMessage && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            {errorMessage}
          </p>
        </div>
      )}
      {message && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-emerald-800 border-2 border-emerald-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            {message}
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <p className="text-gray-700 font-bold text-2xl text-center">
          Reset Password
        </p>
        <p className="text-sm text-gray-700 mt-2 text-center leading-6">
          Enter the email associated with your account. If there is an existing
          account with the provided email, we will send you an email with a
          special link to reset your password.
        </p>
        <input
          type="email"
          placeholder="Email"
          className="mt-8 w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300"
          {...register('email', {required: true})}
        />
        {errors.email && <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">*required field</p>}
        <button
          disabled={isSubmitting ? true : false}
          type="submit"
          className={`text-white mx-auto font-medium text-sm h-[40px] flex items-center justify-center w-full mt-8 rounded-md transition-all duration-300 ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {isSubmitting ? <ButtonSpinner /> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
