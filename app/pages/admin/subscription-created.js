import { useRouter } from "next/router";

const SubscriptionCreated = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin");
  };

  return (
    <div className="mt-24 justify-center flex flex-col items-center">
      <p className="text-center text-3xl font-semibold text-zinc-200 mb-2">
        Your subscription has been created!
      </p>
      <p className="text-center text-3xl font-semibold text-zinc-200 mb-10">
        You can now use all features!
      </p>
      <button
        className="p-3 pl-6 pr-6 text-sm text-white font-medium bg-gradient-to-r from-indigo-600 to-rose-600 bg-[length:200%] bg-left hover:bg-right transition-all w-fit rounded-md duration-500"
        onClick={handleClick}
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default SubscriptionCreated;
