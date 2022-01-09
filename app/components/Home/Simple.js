
const Simple = () => {
  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl p-4 pt-20 pb-20 flex items-center justify-between">
        <div className="w-1/2 mr-16">
          <p className="text-gray-400 text-2xl mb-2 ">company overview</p>
          <p className="text-4xl font-bold text-gray-700 mb-6">
            get company profile info
          </p>
          <p className="text-gray-600  text-lg">
            s simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into
          </p>
        </div>
        <div className="w-1/2 bg-gray-100 rounded-lg shadow-xl shadow-gray-300 p-6">
          {/* <div className="w-full">
              <div className="w-full bg-white p-2 pr-4 shadow-md shadow-gray-300 rounded-lg text-gray-500 flex items-center justify-between font-medium">AAPL<Search /></div>
            </div> */}
          <div className="rounded-lg">
            <div>
              <p className="mb-4 pb-1 border-b border-gray-300 text-gray-700 font-medium text-lg">
                Company profile for <span>AAPL</span>
              </p>
              <div>
                <div className="flex items-center border-b border-gray-300 text-sm pb-2">
                  <p className="uppercase text-indigo-600 w-28">Exchange</p>
                  <p className="text-gray-900">NASDAQ</p>
                </div>
                <div className="flex items-center border-b border-gray-300 text-sm pt-2 pb-2">
                  <p className="uppercase text-indigo-600 w-28">Company</p>
                  <p className="text-gray-900">Apple Inc.</p>
                </div>
                <div className="flex items-center border-b border-gray-300 text-sm pt-2 pb-2">
                  <p className="uppercase text-indigo-600 w-28">Industry</p>
                  <p className="text-gray-900">Consumer Electronics</p>
                </div>
                <div className="flex items-center border-b border-gray-300 text-sm pt-2 pb-2">
                  <p className="uppercase text-indigo-600 w-28">Sector</p>
                  <p className="text-gray-900">Information Technology</p>
                </div>
              </div>
              <p className="pt-2 text-sm leading-6 flex">
                <span className="uppercase text-indigo-600 mr-6">
                  Description
                </span>
                <span className="text-gray-900">
                  Apple, Inc. engages in the design, manufacture, and marketing
                  of mobile communication, media devices, personal computers,
                  and portable digital music players. It operates through the
                  following geographical segments: Americas, Europe, Greater
                  China, Japan, and Rest of Asia Pacific...
                  <span className="text-xs text-indigo-800">Read More</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simple;
