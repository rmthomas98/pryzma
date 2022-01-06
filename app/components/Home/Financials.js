const Financials = () => {
  return (
    <div className="bg-white before:h-1 before:w-full before:max-w-7xl before:bg-gradient-to-r before:from-rose-600 before:to-indigo-600 before:block before:rounded-full before:mx-auto">
      <div className="mx-auto max-w-5xl p-4 pt-20 pb-20">
      <div className="w-2/3 mx-auto">
          <p className="text-4xl font-bold text-gray-700 mb-6 text-center">
            important financial data
          </p>
          <p className="text-gray-600 text-lg text-center">
            s simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into
          </p>
        </div>
        <div className="w-full  mt-20">
          <div className="rounded-lg">
            <div className="w-full">
              {/* <p className="mb-10 pb-1 border-b border-gray-300 text-gray-700 text-center font-medium text-lg">
                Financial data for <span>AAPL</span>
              </p> */}
              <div className="flex">
                <div className="w-full mr-4">
                <div className="flex justify-between  items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 pl-8 pr-8">
                  <p className="uppercase text-indigo-600 w-36">current cash</p>
                  <p className="text-gray-900">2.8 Trillion</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-36">total cash</p>
                  <p className="text-gray-900">2.8 Trillion</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-36">current debt</p>
                  <p className="text-gray-900">16.49 Billion</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-36">total debt</p>
                  <p className="text-gray-900">2.8 Trillion</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-36">current assets</p>
                  <p className="text-gray-900">16.39 Billion</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-36">total assets</p>
                  <p className="text-gray-900">16.39 Billion</p>
                </div>
                </div>
                <div className="w-full">
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-44">total liabilites</p>
                  <p className="text-gray-900">58.80%</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-44">revenue</p>
                  <p className="text-gray-900">58.80%</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-44">inventory</p>
                  <p className="text-gray-900">0.69%</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-44">net income</p>
                  <p className="text-gray-900">0.07%</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-44">operating income</p>
                  <p className="text-gray-900">58.80%</p>
                </div>
                <div className="flex items-center text-sm p-2 rounded-md bg-gray-100 shadow-sm shadow-gray-300 mt-3 pl-8 pr-8 justify-between">
                  <p className="uppercase text-indigo-600 w-44">operating expenses</p>
                  <p className="text-gray-900">58.80%</p>
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
