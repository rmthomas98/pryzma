import axios from 'axios';
import { useState } from 'react';
import {Dot} from 'react-bootstrap-icons'
import ButtonSpinner from '../ButtonSpinner';

const Plan = ({increment, email}) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monthlyLoader, setMonthlyLoader] = useState(false);
  const [annualLoader, setAnnualLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState();

  const handleButtonClick = async (e) => {
    // make call to backend to create subscription
    setIsSubmitting(true);
    if (e.target.value === 'price_1KFhUZF124ucKAQoKJD5oDgr') setMonthlyLoader(true);
    if (e.target.value === 'price_1KFhV3F124ucKAQoEPMNXfBN') setAnnualLoader(true);
    const response = await axios.post('/api/create-subscription', {priceId: e.target.value, email: email.current}).catch(e => console.error(e));
    if (response.data === 'subscription created') {
      setIsSubmitting(false);
      setMonthlyLoader(false);
      setAnnualLoader(false);
      increment();
    } else {
      setIsSubmitting(false);
      setMonthlyLoader(false);
      setAnnualLoader(false);
      setErrorMessage('Something went wrong. Please try again later.')
    }
  }

  return (
    <div>
      <p className="text-gray-700 font-bold text-2xl">Select Pricing Plan</p>
      <div className="flex mt-6">
      <div className="w-full mr-6 bg-gray-100 shadow-lg shadow-gray-300 rounded-lg p-6">
        <p className="uppercase text-sm text-center text-gray-600">Monthly</p>
        <p className="text-center mt-2 mb-4 border-b border-gray-300 pb-4"><span className="text-4xl text-gray-800">$19.99</span><span className="text-gray-600 text-sm">/mo</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>SEC Filings</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Dilution Tracker</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Real Time Quotes</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Key Statistics</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Financials</span></p>
        <p className='flex items-center mb-6'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Latest News</span></p>
        <button disabled={isSubmitting ? true : false} onClick={handleButtonClick} value="price_1KFhUZF124ucKAQoKJD5oDgr" className={`w-full flex justify-center items-center h-[42px] font-medium border border-indigo-600 text-indigo-600 rounded-md  hover:text-white transition-all duration-300 ${monthlyLoader ? 'bg-gray-400 hover:bg-gray-400 border-gray-400' : 'bg-transparent hover:bg-indigo-600'}`}>{monthlyLoader ? <ButtonSpinner /> : 'Select Plan'}</button>
      </div>
      <div className="w-full bg-gray-100 shadow-lg shadow-gray-300 rounded-lg p-6 relative overflow-hidden">
        <p className='absolute tracking-wide rotate-45 bg-gradient-to-r from-rose-600 to-indigo-600 text-xs right-[-75px] pr-20 pl-20 pt-0.5 pb-0.5 text-white font-bold uppercase'>Best Deal</p>
        <p className="uppercase text-sm text-center text-gray-600">annual</p>
        <p className="text-center mt-2 mb-4 border-b border-gray-300 pb-4"><span className="text-4xl text-gray-800">$199.99</span><span className="text-gray-600 text-sm">/yr</span></p>
        <p className='text-center flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>SEC Filings</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Dilution Tracker</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Real Time Quotes</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Key Statistics</span></p>
        <p className='flex items-center'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Financials</span></p>
        <p className='flex items-center mb-6'><Dot className='text-indigo-600 text-lg mr-2'/><span className='text-gray-800'>Latest News</span></p>
        <button disabled={isSubmitting ? true : false} onClick={handleButtonClick} value="price_1KFhV3F124ucKAQoEPMNXfBN" className={`w-full h-[42px] flex justify-center items-center text-white font-medium rounded-md transition-all duration-300 hover:shadow-md hover:shadow-gray-500 ${annualLoader ? 'bg-gray-400 hover:shadow-none' : 'bg-gradient-to-r from-rose-600 to-indigo-600'}`}>{annualLoader ? <ButtonSpinner /> : 'Select Plan'}</button>
      </div>
      </div>
      {errorMessage && (
        <div className="mt-10 mx-auto w-fit p-4 pt-6 pb-6 bg-rose-800 border-2 border-rose-400 rounded-lg shadow-lg shadow-gray-400">
          <p className="text-xs font-bold text-center text-white">
            {errorMessage}
          </p>
        </div>
      )}
    </div>
  );
};

export default Plan;
