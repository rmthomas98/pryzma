import { Search, ArrowRight, FileEarmark, CurrencyDollar, Newspaper, DropletHalf, Briefcase, Bell } from "react-bootstrap-icons";
import Link from 'next/link';

const SecFilings = () => <div className="w-full bg-gradient-to-b from-gray-800 to-gray-700 mt-10">
  <div className="max-w-7xl pl-4 pr-4 pt-20 pb-20 mx-auto">
    <div className="flex justify-center items-center">
      <div className="w-full max-w-[500px] bg-slate-500/40 mr-10 pt-4 pl-6 pr-6 pb-4 rounded-md shadow-lg shadow-gray-800">
        <div className="flex items-center justify-between relative">
          <div className="text-white text-sm flex items-center bg-slate-500/50 w-fit p-1 pl-4 pr-4 rounded-md"><Search className="mr-2" />Financials</div>
          <p className="text-white text-sm">Viewing SEC Filings for AAPL</p>
        </div>
        <div className="flex text-sm text-white items-center justify-between bg-slate-500/40 rounded-md p-2 pl-4 pr-4 mt-4"><p className="flex items-center"><FileEarmark className="mr-2" />10-Q</p><p className="text-xs font-light text-white">Quartly Report</p><p>Nov 15, 2021</p></div>
        <div className="flex text-sm text-white items-center justify-between bg-slate-500/40 rounded-md p-2 pl-4 pr-4 mt-2"><p className="flex items-center"><FileEarmark className="mr-2" />10-Q</p><p className="text-xs font-light text-white">Quartly Report</p><p>Aug 16, 2021</p></div>
        <div className="flex text-sm text-white items-center justify-between bg-slate-500/40 rounded-md p-2 pl-4 pr-4 mt-2"><p className="flex items-center"><FileEarmark className="mr-2" />10-Q</p><p className="text-xs font-light text-white">Quartly Report</p><p>May 24, 2021</p></div>
        <div className="flex text-sm text-white items-center justify-between bg-slate-500/40 rounded-md p-2 pl-4 pr-4 mt-2"><p className="flex items-center"><FileEarmark className="mr-2" />10-K</p><p className="text-xs font-light text-white">Annual Report</p><p>Nov 15, 2021</p></div>
        <div className="flex text-sm text-white items-center justify-between bg-slate-500/40 rounded-md p-2 pl-4 pr-4 mt-2"><p className="flex items-center"><FileEarmark className="mr-2" />10-Q</p><p className="text-xs font-light text-white">Quartly Report</p><p>Nov 23, 2020</p></div>
      </div>
      <div className="w-full">
        <p className="text-lg mb-1 text-gray-300 font-semibold uppercase">SEC Filings</p>
        <p className="text-4xl font-bold text-white mb-6">
          View Up to Date SEC Filings
        </p>
        <p className="text-gray-300 text-lg">
          s simply dummy text of the printing and typesetting industry. Lorem
          Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled
          it to make a type specimen book. It has survived not only five
          centuries, but also the leap into
        </p>
        <Link href="/signup"><a className="font-medium text-white bg-indigo-500 rounded-lg p-4 pl-10 pr-10 flex items-center w-fit mt-6 hover:bg-indigo-600 transition-all duration-300">Get Started Now<ArrowRight className="ml-4 text-xl" /></a></Link>
      </div>
    </div>
    <div className="flex mt-20 mb-10 items-center">
      <div className="bg-gray-900 rounded-lg h-12 w-12 relative rotate-45 mr-10">

      <Bell className="text-indigo-400 text-3xl absolute rotate-[-45deg] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"/>
      </div>
    <p className="max-w-[660px] text-gray-300 font-light">Having access to SEC Filings is an easy way of getting rich data that can help you make hard decisions in the stock market. Here are some things you can find from SEC Filings.</p>
    </div>
    <div className="flex justify-center">
      <div className="p-4 bg-gray-200 rounded-lg w-full mr-6 shadow-lg shadow-gray-800">
        <CurrencyDollar className="text-indigo-600 text-4xl mb-4" />
        <p className="font-semibold text-gray-700 text-lg mb-2">Financial Reports</p>
        <p className="text-gray-600 text-sm">Get a deeper look inside of a companies financials. These reports come annualy and quarterly.</p>
      </div>
      <div className="p-4 bg-gray-200 rounded-lg w-full mr-6 shadow-lg shadow-gray-800">
        <Newspaper className="text-indigo-600 text-4xl mb-4" />
        <p className="font-semibold text-gray-700 text-lg mb-2">Reported News</p>
        <p className="text-gray-600 text-sm">Sometimes companies can sugar coat their news. See what really happened in the SEC Filings.</p>
      </div>
      <div className="p-4 bg-gray-200 rounded-lg w-full mr-6 shadow-lg shadow-gray-800">
        <DropletHalf className="text-indigo-600 text-4xl mb-4" />
        <p className="font-semibold text-gray-700 text-lg mb-2">Offerings & Registrations</p>
        <p className="text-gray-600 text-sm">See when a company is registering new shares or selling new shares to the public. Sometimes this can be a sign of dilution.</p>
      </div>
      <div className="p-4 bg-gray-200 rounded-lg w-full mr-6 shadow-lg shadow-gray-800">
        <Briefcase className="text-indigo-600 text-4xl mb-4" />
        <p className="font-semibold text-gray-700 text-lg mb-2">Ownership</p>
        <p className="text-gray-600 text-sm">This is a great way of seeing some of the biggest owners of a current stock.</p>
      </div>
    </div>
  </div>
</div>

export default SecFilings;