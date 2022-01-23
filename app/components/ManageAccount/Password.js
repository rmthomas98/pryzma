import {useForm} from 'react-hook-form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ButtonSpinner from '../ButtonSpinner';
import {CheckLg} from 'react-bootstrap-icons';

const Password = ({user}) => {

  const {handleSubmit, register, formState: {errors}, watch, reset} = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState('n/a');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const onSubmit = async (data) => {
    // something here
    if (data.password !== data.confirmPassword) return
    setIsSubmitting(true)
    const response = await axios.post('/api/update-password', {password: data.password, email: user.email}).catch(e => console.error(e));
    if (response.data === 'password updated') {
      setIsSubmitting(false);
      setSuccess(true)
      reset()
    } else {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    if (confirmPassword.length >= 8 && password.length >= 8) {
      password === confirmPassword && setPasswordMatch(true);
      password !== confirmPassword && setPasswordMatch('do not match')
    } else {
      setPasswordMatch('n/a')
    }

  },[watch('password'), watch('confirmPassword')])

  return (
    <div className='animate-fadeInUp translate-y-12'>
    {success && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-emerald-800 border-2 border-emerald-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            Your password has been updated.
          </p>
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            Something went wrong, please try again.
          </p>
        </div>
      )}
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-6 mt-12">
        Change Password
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex w-full">
        <div className="w-full mr-4">
          <p className="text-sm text-gray-800 pb-0.5">New Password (min 8 characters)</p>
          <input
            type="password"
            className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}
            {...register('password', {required: true, minLength: 8})}
          />
            {errors.password?.type === 'required' && passwordMatch === 'n/a' && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                *required field
              </p>
            )}
          {errors.password?.type === 'minLength' && passwordMatch === 'n/a' && <p className='text-xs font-medium text-rose-600 mt-0.5 absolute'>*password must be 8 characters</p>}
          {passwordMatch === 'do not match' && <p className='text-xs font-medium text-rose-600 mt-0.5 absolute'>*passwords do not match</p>}
          {passwordMatch === true && <p className='text-xs font-medium text-green-600 mt-0.5 absolute flex items-center'><CheckLg className='mr-2'/>Passwords Match</p>}
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-800 pb-0.5">Confirm Password</p>
          <input
            type="password"
            className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}
            {...register('confirmPassword', {required: true, minLength: 8})}
          />
          {errors.confirmPassword?.type === 'required' && passwordMatch === 'n/a' && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                *required field
              </p>
            )}
          {errors.confirmPassword?.type === 'minLength' && passwordMatch === 'n/a' && <p className='text-xs font-medium text-rose-600 mt-0.5 absolute'>*password must be 8 characters</p>}
          {passwordMatch === 'do not match' && <p className='text-xs font-medium text-rose-600 mt-0.5 absolute'>*passwords do not match</p>}
          {passwordMatch === true && <p className='text-xs font-medium text-green-600 mt-0.5 absolute flex items-center'><CheckLg className='mr-2'/> Passwords Match</p>}
        </div>
      </div>
      <button
        disabled={isSubmitting ? true : false}
          type="submit"
          className={`text-sm mt-8 text-white font-medium rounded-md h-[40px] w-[166px] flex items-center justify-center transition-all duration-300 ${
            isSubmitting
              ? "bg-indigo-400 hover:bg-indigo-400"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isSubmitting ? <ButtonSpinner /> : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default Password;
