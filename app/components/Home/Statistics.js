const Statistics = () => {
  return (
    <div className="bg-white before:h-[2px] before:w-full before:max-w-3xl before:bg-gradient-to-r before:from-rose-600 before:to-indigo-600 before:block before:rounded-full before:mx-auto">
      <div className="mx-auto max-w-7xl p-4 pt-20 pb-20 flex items-center">
        <div className="w-1/2 bg-gray-100 rounded-lg shadow-xl shadow-gray-300 p-6">
          
          <div className="rounded-lg">
            <div>
              <p className="mb-4 pb-1 border-b border-gray-300 text-gray-700 font-medium text-lg">
                Statistical data for <span>AAPL</span>
              </p>
              <div>
                <div className="flex items-center border-b border-gray-300 text-sm pb-2 justify-between">
                  <p className="uppercase text-indigo-600 w-36">Market Cap</p>
                  <p className="text-gray-900">2.8 Trillion</p>
                </div>
                <div className="flex items-center border-b border-gray-300 text-sm pt-2 pb-2 justify-between">
                  <p className="uppercase text-indigo-600">shares outstanding</p>
                  <p className="text-gray-900">16.49 Billion</p>
                </div>
                
                <div className="flex items-center border-b border-gray-300 text-sm pt-2 pb-2 justify-between">
                  <p className="uppercase text-indigo-600 w-36">Shares float</p>
                  <p className="text-gray-900">16.39 Billion</p>
                </div>
              
                <div className="flex items-center text-sm pt-2 pb-2 border-b border-gray-300 justify-between">
                  <p className="uppercase text-indigo-600 w-36">short float</p>
                  <p className="text-gray-900">0.69%</p>
                </div>
                <div className="flex items-center border-b border-gray-300 text-sm pt-2 pb-2 justify-between">
                  <p className="uppercase text-indigo-600 w-36">insider ownership</p>
                  <p className="text-gray-900">0.07%</p>
                </div>
                <div className="flex items-center text-sm pt-2 pb-2 justify-between">
                  <p className="uppercase text-indigo-600">institional ownership</p>
                  <p className="text-gray-900">58.80%</p>
                </div>
              </div>
            
            </div>
          </div>
        </div>
        <div className="w-1/2 ml-16">
          <p className="text-gray-400 text-2xl mb-2">statistics</p>
          <p className="text-4xl font-bold text-gray-700 mb-6">
            key statistical information
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
