const Password = () => {
  return (
    <>
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-6 mt-12">
        Change Password
      </p>
      <div className="flex w-full">
        <div className="w-full mr-4">
          <p className="text-sm text-gray-800 pb-0.5">New Password</p>
          <input
            type="text"
            className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}
          />
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-800 pb-0.5">Confirm Password</p>
          <input
            type="text"
            className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}
          />
        </div>
      </div>
    </>
  );
};

export default Password;
