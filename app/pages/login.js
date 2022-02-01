import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import ButtonSpinner from "../components/ButtonSpinner";
import axios from "axios";
import { useState } from "react";
import { withIronSession } from "next-iron-session";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

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
      router.push("/admin");
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
    <div className="h-[calc(100vh-80px)] min-h-[600px] flex justify-center">
      {router.query?.newAccount && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-full max-w-[300px] p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-md">
          <p className="text-xs font-semibold text-center text-black leading-5">
            Your account has been created!
            <br />
            You can now login.
          </p>
        </div>
      )}
      {router.query?.passwordUpdated && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-full max-w-[300px] p-4 bg-gradient-to-br from-green-400 to-green-600 rounded-md">
          <p className="text-xs font-semibold text-center text-black leading-5">
            You password has been updated!
          </p>
        </div>
      )}
      {errorMessage && (
        <div className="absolute top-[100px] left-[50%] translate-x-[-50%] w-full max-w-[300px] p-4 bg-gradient-to-br from-red-400 to-red-600 rounded-md">
          <p className="text-xs font-semibold text-center text-black leading-5">
            {errorMessage}
          </p>
        </div>
      )}
      <div className="max-w-sm w-full mx-auto">
        <form className="w-full mt-40" onSubmit={handleSubmit(onSubmit)}>
          <p className="text-zinc-200 font-semibold text-2xl text-center">
            Client Login
          </p>
          <div>
            <p className="mt-6 text-sm text-zinc-300 pb-1">Email</p>
            <input
              disabled={isSubmitting ? true : false}
              type="email"
              placeholder="Email"
              autoComplete="off"
              className={`w-full p-2.5 rounded-md text-zinc-400 border outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200 ${
                errors.email || emailError
                  ? "border-rose-500"
                  : "border-zinc-700"
              }`}
              {...register("email", { required: true })}
            />
            {emailError && (
              <p className="text-xs font-medium text-rose-600 mt-0.5 absolute">
                {emailError}
              </p>
            )}
          </div>
          <div>
            <p className="mt-6 text-sm text-zinc-300 pb-1">Password</p>
            <input
              disabled={isSubmitting ? true : false}
              type="password"
              placeholder="Password"
              autoComplete="off"
              className={`w-full p-2.5 rounded-md text-zinc-400 border outline-none focus:shadow-[0px_0px_0px_2px_rgba(139,92,246,0.3)] focus:border-violet-500/60 bg-zinc-800 transition-all duration-200 ${
                errors.email || emailError
                  ? "border-rose-500"
                  : "border-zinc-700"
              }`}
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
            className={`mt-8 rounded-md h-[40px] flex items-center justify-center w-full font-medium text-sm text-violet-500 trasnition-all duration-300 ${
              isSubmitting
                ? "bg-zinc-400 hover:bg-zinc-400"
                : "bg-zinc-200 hover:bg-white"
            }`}
          >
            {isSubmitting ? <ButtonSpinner /> : "Login"}
          </button>
        </form>
        <div className="text-xs flex justify-center mt-6 w-4/5 mx-auto min-w-fit text-zinc-400">
          <Link href="/forgot-password">
            <a className="pr-2 text-center border-r border-zinc-300 hover:text-violet-400 transition-all hover:underline">
              Forgot Password
            </a>
          </Link>
          <Link href="/signup">
            <a className="pl-2 text-center hover:text-violet-400 transition-all hover:underline">
              Sign up now
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = withIronSession(
  async ({ req, res }) => {
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

export default Login;
