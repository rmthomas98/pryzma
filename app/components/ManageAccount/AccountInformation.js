import { format } from "date-fns";
import { useState } from "react";

const AccountInformation = ({ user }) => {

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);

  return (
    <>
      <p className="text-gray-700 font-bold text-2xl border-b border-gray-300 pb-3 mb-6">
        Account Information
      </p>
      <div className="flex w-full">
        <div className="w-full mr-4 mb-6">
          <p className="text-sm text-gray-800 pb-0.5">First Name</p>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}
          />
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-800 pb-0.5">Last Name</p>
          <input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}
          />
        </div>
      </div>
      <div className="flex w-full">
        <div className="w-full mr-4">
          <p className="text-sm text-gray-800 pb-0.5">Email</p>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            className={`w-full p-2.5 rounded-md border outline-none focus:shadow-md focus:shadow-gray-400/50 shadow-sm shadow-gray-300 transition-all duration-300 border-gray-300`}
          />
        </div>
        <div className="w-full">
          <p className="text-sm text-gray-800 pb-0.5">Date Joined</p>
          <p className="mt-2">
            {format(new Date(user.dateJoined), "MMMM dd, yyyy")}
          </p>
        </div>
      </div>
    </>
  );
};

export default AccountInformation;
