import Image from "next/image";
import stats from '../../static/images/stats.svg';
import financials from '../../static/images/financials.svg'
import news from '../../static/images/news.svg'
import sec from '../../static/images/sec.svg'
import incomeStatements from '../../static/images/incomeStatements.svg'
import balanceSheets from '../../static/images/balanceSheets.svg';
import cashFlow from '../../static/images/cashFlow.svg'
import insider from '../../static/images/insider.svg'
import insitution from '../../static/images/institution.svg';
import quotes from '../../static/images/quote.svg';
import offerings from '../../static/images/offerings.svg';
import watchlist from "../../static/images/watchlist.svg";

const OnePlace = () => {
  return (
    <div className="bg-gradient-to-b from-white to-indigo-200 pt-24 pb-24">
      <div className="w-full max-w-7xl pl-4 pr-4 mx-auto">
        <p className="text-gray-400 text-lg mb-1 uppercase font-semibold text-center">
          The most efficient stock research platform
        </p>
        <p className="text-5xl font-bold text-gray-700 mb-6 text-center">
          Everything You Need, All In One Place.
        </p>
        <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
          Get the information you need, all from our website. Stop spending
          extra time flipping through different websites to find the data you
          are looking for.
        </p>
        <div className="p-8 w-full bg-white rounded-xl mt-10 shadow-xl shadow-gray-700/25">
          <p className="text-3xl text-gray-700 font-bold mb-4">Efficency is Our #1 Priority</p>
          <p className="text-lg text-gray-600">Here at Prizma we prioritize efficency. Our goal is to deliver the information you need, all within our platform. This takes out the hastle of having to flip through different tabs everytime you want to research a stock.</p>
          <div className="flex mt-10 justify-between">
            <div className="max-w-[200px] mr-10 w-full">
              <Image src={stats} height={40} width={40}/>
              <p className="text-gray-700 font-semibold mt-1 text-lg">Statistics</p>
              <p className="text-gray-600 text-sm">Find things like market cap, float, short float, etc...</p>
            </div>
            <div className="max-w-[200px] mr-10 w-full">
              <Image src={financials} height={40} width={40}/>
              <p className="text-gray-700 font-semibold mt-1 text-lg">Financials</p>
              <p className="text-gray-600 text-sm">Get a quick overlook on how a company is doing financially.</p>
            </div>
            <div className="max-w-[200px] mr-10 w-full">
              <Image src={news} height={40} width={40}/>
              <p className="text-gray-700 font-semibold mt-1 text-lg">Latest News</p>
              <p className="text-gray-600 text-sm">View the latest news for a company.</p>
            </div>
            <div className="max-w-[200px] w-full">
              <Image src={sec} height={40} width={40}/>
              <p className="text-gray-700 font-semibold mt-1 text-lg">SEC Filings</p>
              <p className="text-gray-600 text-sm">Get a deeper look into a company through SEC Filings.</p>
            </div>
          </div>
          <div className="flex mt-10 justify-between">
          <div className="max-w-[200px] w-full mr-10">
              <Image src={quotes} height={40} width={40}/>
              <p className="text-lg font-semibold text-gray-700">Real Time Quotes</p>
              <p className="text-gray-600 text-sm">Get the current price of a stock along with other price stats.</p>
            </div>
            <div className="max-w-[200px] mr-10 w-full">
              <Image src={incomeStatements} height={40} width={40}/>
              <p className="text-lg font-semibold text-gray-700 mt-1">Income Statements</p>
              <p className="text-gray-600 text-sm">See income values without having to read through big files.</p>
            </div>
            <div className="max-w-[200px] mr-10 w-full">
              <Image src={balanceSheets} height={40} width={40}/>
              <p className="text-lg font-semibold text-gray-700 mt-1">Balance Sheets</p>
              <p className="text-gray-600 text-sm">Get an idea of the capital structure for a company.</p>
            </div>
            <div className="max-w-[200px] w-full">
              <Image src={cashFlow} height={40} width={40}/>
              <p className="text-lg font-semibold text-gray-700 mt-1">Cash Flow</p>
              <p className="text-gray-600 text-sm">Overview of a companies cash flow.</p>
            </div>
          </div>
          <div className="flex mt-10 justify-between mx-auto">
          <div className="max-w-[200px] mr-10 w-full">
            <Image src={offerings} height={40} width={40} />
            <p className="text-lg font-semibold text-gray-700 mt-1">Offerings</p>
            <p className="text-gray-600 text-sm">Find out when a company is issuing new stock for public sale.</p>
          </div>
            <div className="max-w-[200px] mr-10 w-full">
              <Image src={insitution} height={40} width={40}/>
              <p className="text-lg font-semibold text-gray-700 mt-1">Institutional Own</p>
              <p className="text-gray-600 text-sm">See the top institutional holders for a stock.</p>
            </div>
            <div className="max-w-[200px] mr-10 w-full">
              <Image src={insider} height={40} width={40}/>
              <p className="text-lg font-semibold text-gray-700 mt-1">Insider Roster</p>
              <p className="text-gray-600 text-sm">See the top insiders that hold a certain stock.</p>
            </div>
            <div className="max-w-[200px] w-full">
              <Image src={watchlist} height={40} width={40} />
              <p className="text-lg font-semibold text-gray-700 mt-1">Watchlist</p>
              <p className="text-gray-600 text-sm">Create a watchlist and add as many symbols as you want.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnePlace;
