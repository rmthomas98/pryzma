import { Check } from "react-bootstrap-icons";
import Link from 'next/link';

const Pricing = () => {
  return (
    <div className={`pt-20 pb-32 bg-[url('/static/images/mountains-at-night.png')] bg-cover bg-center`}>
      <p className="text-gray-300 text-lg mb-1 uppercase font-semibold text-center">
        Get Started with Pryzma
      </p>
      <p className="text-5xl font-bold text-white mb-6 text-center">
        Start your 7 Day Free Trial Today!
      </p>
      <div className="max-w-7xl w-full mx-auto pl-4 pr-4">
        <div className="max-w-4xl w-full mx-auto relative flex justify-center items-center">
          <div className="flex mt-6 max-w-2xl w-full">
            <div className="w-full mr-6 shadow-xl bg-white shadow-gray-900/60 rounded-lg p-6">
              <p className="uppercase text-sm text-center text-gray-600">
                Monthly
              </p>
              <p className="text-center mt-2 mb-4 border-b border-gray-300 pb-4">
                <span className="text-4xl text-gray-800">$19.99</span>
                <span className="text-gray-600 text-sm">/mo</span>
              </p>
              <p className="flex items-center mt-6">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">SEC Filings</span>
              </p>
              <p className="flex items-center">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Real Time Quotes</span>
              </p>
              <p className="flex items-center">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Key Statistics</span>
              </p>
              <p className="flex items-center">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Financials</span>
              </p>
              <p className="flex items-center mb-10">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Latest News</span>
              </p>
              <Link href="/signup"
                
              >
                <a className={`w-full flex justify-center items-center h-[42px] font-medium border border-indigo-600 text-indigo-600 hover:text-white rounded-md transition-all duration-300 hover:bg-indigo-600`}>Select Plan</a>
              </Link>
            </div>
            <div className="w-full bg-white shadow-xl shadow-gray-900/60 rounded-lg p-6 relative overflow-hidden">
              <p className="absolute tracking-wide rotate-45 bg-gradient-to-r from-rose-600 to-indigo-600 text-xs right-[-75px] pr-20 pl-20 pt-0.5 pb-0.5 text-white font-bold uppercase">
                Best Deal
              </p>
              <p className="uppercase text-sm text-center text-gray-600">
                annual
              </p>
              <p className="text-center mt-2 mb-4 border-b border-gray-300 pb-4">
                <span className="text-4xl text-gray-800">$199.99</span>
                <span className="text-gray-600 text-sm">/yr</span>
              </p>
              <p className="text-center flex items-center mt-6">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">SEC Filings</span>
              </p>
              <p className="flex items-center">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Real Time Quotes</span>
              </p>
              <p className="flex items-center">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Key Statistics</span>
              </p>
              <p className="flex items-center">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Financials</span>
              </p>
              <p className="flex items-center mb-10">
                <Check className="text-indigo-600 text-lg mr-2" />
                <span className="text-gray-800">Latest News</span>
              </p>
              <Link href="/signup">
                <a className={`w-full h-[42px] flex justify-center items-center text-white font-medium rounded-md transition-all duration-300 bg-gradient-to-r from-rose-600 to-indigo-600 hover:shadow-md hover:shadow-gray-500`}>Select Plan</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
