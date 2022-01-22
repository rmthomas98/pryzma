import {Bank} from 'react-bootstrap-icons';

const Financials = () => {
  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl p-4 pt-20 pb-20 flex items-center justify-between">
        <div className="w-1/2 mr-16">
          <p className="text-gray-400 text-lg mb-1 uppercase">Financials</p>
          <p className="text-4xl font-bold text-gray-700 mb-6">
            Important Fincancial Data
          </p>
          <p className="text-gray-600 text-lg">
            s simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into
          </p>
        </div>
        <div className="w-1/2 relative z-10">
        <div className="absolute h-full w-full bg-emerald-300 rounded-lg top-0 left-0 z-[-1] rotate-6"></div>
        <div className="w-full bg-gray-100 rounded-lg shadow-2xl shadow-gray-400">
        
          <div className="rounded-lg">
          <div>
              <p className="p-5 pl-8 pr-8 font-medium text-lg bg-gray-800 flex items-center text-emerald-400 justify-between rounded-tr-lg rounded-tl-lg">
                <span className="flex items-center"><Bank className="mr-4 text-2xl"/>Financial Data</span><span>AAPL</span>
              </p>
              <div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200">
                  <p className="w-36 text-gray-600 font-semibold">Total Cash</p>
                  <p className="text-gray-800 font-semibold">568.4 Billion</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-100">
                  <p className="text-gray-600 font-semibold">Total Liabilities</p>
                  <p className="text-gray-800 font-semibold">16.49 Billion</p>
                </div>
                
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200">
                  <p className="font-semibold w-36 text-gray-600">Total Assets</p>
                  <p className="text-gray-800 font-semibold">16.39 Billion</p>
                </div>
              
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-100">
                  <p className="font-semibold w-36 text-gray-600">Revenue</p>
                  <p className="text-gray-800 font-semibold">0.69%</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200">
                  <p className="font-semibold w-36 text-gray-600">Net Income</p>
                  <p className="text-gray-800 font-semibold">0.07%</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-100">
                  <p className="font-semibold text-gray-600">Operating Income</p>
                  <p className="text-gray-800 font-semibold">58.80%</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200 rounded-br-lg rounded-bl-lg">
                  <p className="font-semibold w-36 text-gray-600">Total Debt</p>
                  <p className="text-gray-800 font-semibold">92.57 Million</p>
                </div>
              </div>
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financials;
