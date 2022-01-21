import axios from 'axios';
import {useRouter} from 'next/router';
import { useState } from 'react';
import {useForm} from 'react-hook-form';
import ButtonSpinner from '../../components/ButtonSpinner';

const ResetPassword = ({query}) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const {handleSubmit, register, formState: {errors}} = useForm()

  console.log(query);


  const onSubmit = async (data) => {
    const {password, confirmPassword} = data;
    if (password !== confirmPassword) return setErrorMessage("Passwords don't match");
    setIsSubmitting(true)
    const response = await axios.post('/api/reset-password', {password: password, token: query?.token}).catch(() => setErrorMessage('Something went wrong'));
    if (response) {
      if (response.data === 'password updated') {
        return router.push('/login?passwordUpdated=true');
      }
      if (response.data === 'token not found') {
        setIsSubmitting(false)
        return setErrorMessage('Invalid Token Link')
      }
      if (response.data === 'something went wrong') {
        setIsSubmitting(false);
        return setErrorMessage('Something went wrong')
      }
    } else {
      setIsSubmitting(false);
      setErrorMessage('Something went wrong')
    }
  }

  return (
    <div className="mt-40 mb-20 w-full max-w-sm mx-auto">
    {errorMessage && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            {errorMessage}
          </p>
        </div>
      )}
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-gray-700 font-bold text-2xl text-center">
          Reset Password
        </p>
        <p className="text-sm text-gray-700 mt-2 text-center leading-6">
          You can now create a new password below.
        </p>
        <div>
        <p className="mt-8 text-sm text-gray-800 pb-0.5">New Password (8 characters min)</p>
          <input type="password" className="w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300" 
            {...register('password', {required: true, minLength: 8})}
          />
          {errors.password?.type === 'required' && <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">*required field</p>}
          {errors.password?.type === 'minLength' && <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">*password must be 8 characters</p>}
        </div>
        <div>
        <p className="mt-8 text-sm text-gray-800 pb-0.5">Confirm Password</p>
          <input type="password" className="w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300" 
            {...register('confirmPassword', {required: true, minLength: 8})}
          />
          {errors.confirmPassword?.type === 'required' && <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">*required field</p>}
          {errors.confirmPassword?.type === 'minLength' && <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">*password must be 8 characters</p>}
        </div>
        <button
          disabled={isSubmitting ? true : false}
          type="submit"
          className={`text-white mx-auto font-medium text-sm h-[40px] flex items-center justify-center w-full mt-8 rounded-md transition-all duration-300 ${isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'}`}
        >
          {isSubmitting ? <ButtonSpinner /> : 'Submit'}
        </button>
        </form>
    </div>
  )
}

ResetPassword.getInitialProps = ({query}) => {
  return {query}
}

export default ResetPassword;