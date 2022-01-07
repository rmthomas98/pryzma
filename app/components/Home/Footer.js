import { Twitter } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between pl-4 pr-4 pt-8 pb-8 border-t border-gray-300">
      <p className="font-medium text-gray-900 text-xl">
        prismpro<span className="text-gray-500">.io</span>
      </p>
      <div>
        <div className="flex justify-center">
        <p className="text-xs font-medium text-gray-600 text-center mr-4">
          Terms of use
        </p>
        <p className="text-xs font-medium text-gray-600 text-center">
          Policy
        </p>
        </div>
        <p className="mt-6 text-xs text-gray-500">
          &copy; 2020 PrismPro. All Rights Reservered.
        </p>
      </div>
      <Twitter />
    </div>
  );
};

export default Footer;