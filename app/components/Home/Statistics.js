import {BarChart} from 'react-bootstrap-icons';

const Statistics = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl p-4 pt-20 pb-20 flex items-center">
        <div className="w-1/2 bg-gray-100 rounded-lg shadow-xl shadow-gray-300 overflow-hidden">
          <div className="rounded-lg">
            <div>
              <p className="p-5 pl-8 pr-8 font-medium text-lg bg-gray-800 flex items-center text-blue-400">
                <BarChart className="mr-4 text-2xl"/>Statistical Data for AAPL
              </p>
              <div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200">
                  <p className="w-36 text-gray-600 font-semibold">Market Cap</p>
                  <p className="text-gray-800 font-semibold">2.8 Trillion</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between">
                  <p className="text-gray-600 font-semibold">Shares Outstanding</p>
                  <p className="text-gray-800 font-semibold">16.49 Billion</p>
                </div>
                
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200">
                  <p className="font-semibold w-36 text-gray-600">Shares float</p>
                  <p className="text-gray-800 font-semibold">16.39 Billion</p>
                </div>
              
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between ">
                  <p className="font-semibold w-36 text-gray-600">Short Float</p>
                  <p className="text-gray-800 font-semibold">0.69%</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200">
                  <p className="font-semibold w-36 text-gray-600">Insider Ownership</p>
                  <p className="text-gray-800 font-semibold">0.07%</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between">
                  <p className="font-semibold text-gray-600">Institional Ownership</p>
                  <p className="text-gray-800 font-semibold">58.80%</p>
                </div>
                <div className="flex items-center text-sm p-3 pl-8 pr-8 justify-between bg-gray-200">
                  <p className="font-semibold w-36 text-gray-600">Average Volume</p>
                  <p className="text-gray-800 font-semibold">92.57 Million</p>
                </div>
              </div>
            
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-16">
          <p className="text-gray-400 text-lg mb-1 uppercase">statistics</p>
          <p className="text-4xl font-bold text-gray-700 mb-6">
            Key Statistical Information
          </p>
          <p className="text-gray-600 text-lg">
            s simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into
          </p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
