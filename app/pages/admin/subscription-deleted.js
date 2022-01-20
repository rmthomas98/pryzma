import { useRouter } from "next/router";

const SubscriptionDeleted = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/admin/manage-account");
  };

  return (
    <div className="mt-24 justify-center flex flex-col items-center">
      <p className="text-center text-3xl font-bold text-gray-600 mb-2">
        Your subscription has been canceled.
      </p>
      <p className="text-center text-3xl font-bold text-gray-600 mb-10">
        We hope you come back sometime soon!
      </p>
      <button
        className="p-2.5 pl-6 pr-6 text-sm text-white font-medium bg-gradient-to-r from-rose-600 to-indigo-600 hover:shadow-md hover:shadow-gray-500 transition-all w-fit rounded-md duration-300"
        onClick={handleClick}
      >
        Go to Account Management
      </button>
    </div>
  );
};

export default SubscriptionDeleted;
