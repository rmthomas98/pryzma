import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../components/ButtonSpinner";
import axios from "axios";
import { useState } from "react";
import { withIronSession } from "next-iron-session";
import Link from 'next/link';

const Login = () => {
  const router = useRouter();
  const newAccount = router.query.newAccount;

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    const response = await axios
      .post("/api/login", { data: data })
      .catch((e) => console.error(e));
    // if successfull login, redirect user to admin
    if (response?.data === "successfull login") {
      setIsSubmitting(false);
      router.push('/admin')
    } else if (response?.data === "incorrect password") {
      setIsSubmitting(false);
      setPasswordError("*incorrect password");
    } else if (response?.data === "user not found") {
      setIsSubmitting(false);
      setEmailError("*user email not found");
      // if unknown error, display message
    } else {
      setIsSubmitting(false);
      setErrorMessage("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      {newAccount && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-emerald-800 border-2 border-emerald-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            Your account has been created along with your 7 day free trial.
            <br />
            You can now login below.
          </p>
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white leading-5">
            {errorMessage}
          </p>
        </div>
      )}
      <div className="max-w-sm w-full mx-auto mt-40 mb-20">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-gray-700 font-bold text-2xl text-center">
            Client Login
          </p>
          <div>
            <p className="mt-6 text-sm text-gray-800 pb-0.5">Email</p>
            <input
            disabled={isSubmitting ? true : false}
              type="email"
              placeholder="Email"
              className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 ${errors.email || emailError ? 'border-rose-500' : 'border-gray-300'}`}
              {...register("email", { required: true })}
            />
            { emailError &&
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                {emailError}
              </p>
            }
          </div>
          <div>
            <p className="mt-6 text-sm text-gray-800 pb-0.5">Password</p>
            <input
            disabled={isSubmitting ? true : false}
              type="password"
              placeholder="Password"
              className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 ${errors.password || passwordError ? 'border-rose-500' : 'border-gray-300'} `}
              {...register("password", { required: true })}
            />
            {passwordError && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                {passwordError}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={isSubmitting ? true : false}
            className={`mt-8 rounded-md h-[40px] flex items-center justify-center w-full font-medium text-sm text-white trasnition-all duration-300 ${
              isSubmitting
                ? "bg-indigo-400 hover:bg-indigo-400"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {isSubmitting ? <ButtonSpinner /> : 'Login'}
          </button>
        </form>
        <div className="text-xs flex justify-center mt-6 w-4/5 mx-auto min-w-fit text-gray-600">
          <Link href="/">
            <a className="pr-2 text-center border-r border-gray-400 hover:text-indigo-600 transition-all hover:underline">Forgot Password</a>
          </Link>
          <Link href="/signup"><a className="pl-2 text-center hover:text-indigo-600 transition-all hover:underline">Sign up now</a></Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSession(
  async ({req, res}) => {
    const user = req.session.get('user');

    if (!user) return {props: {}}

    return {
      redirect: {
        permanant: false,
        destination: '/admin'
      },
      props: {}
    }
  },
  {
    password: process.env.IRON_SESSION_PASSWORD,
    cookieName: 'user',
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
)

export default Login;
