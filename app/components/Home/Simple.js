import {PersonCheck} from 'react-bootstrap-icons';

const Simple = () => {
  return (
    <div className="bg-white w-full">
      <div className="mx-auto max-w-7xl p-4 pt-20 pb-20 flex items-center justify-between">
        <div className="w-1/2 mr-16">
          <p className="text-gray-400 text-lg mb-1 uppercase">Company Overview</p>
          <p className="text-4xl font-bold text-gray-700 mb-6">
            Company Profile
          </p>
          <p className="text-gray-600 text-lg">
            s simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the
            1500s, when an unknown printer took a galley of type and scrambled
            it to make a type specimen book. It has survived not only five
            centuries, but also the leap into
          </p>
        </div>
        <div className="w-1/2 z-10 relative">
        <div className="absolute h-full w-full bg-violet-300 rounded-lg top-0 left-0 rotate-6 z-[-1]"></div>
        <div className="w-full bg-gray-100 rounded-lg shadow-2xl shadow-gray-400">
          <div className="rounded-lg">
            <div>
              <p className=" text-violet-400 font-medium text-lg p-5 pl-8 pr-8 bg-gray-800 flex items-center justify-between rounded-tr-md rounded-tl-md">
                <span className="flex items-center"><PersonCheck className="text-2xl mr-4"/>Company Profile</span><span>AAPL</span>
              </p>
              <div>
                <div className="flex items-center text-sm p-3 pr-8 pl-8">
                  <p className="text-gray-600 w-28 font-semibold">Exchange</p>
                  <p className="text-gray-800 font-semibold">NASDAQ</p>
                </div>
                <div className="flex items-center text-sm p-3 pr-8 pl-8 bg-gray-200">
                  <p className=" text-gray-600 w-28 font-semibold">Company</p>
                  <p className="text-gray-800 font-semibold">Apple Inc.</p>
                </div>
                <div className="flex items-center text-sm p-3 pr-8 pl-8">
                  <p className=" text-gray-600 w-28 font-semibold">Industry</p>
                  <p className="text-gray-800 font-semibold">Consumer Electronics</p>
                </div>
                <div className="flex items-center text-sm p-3 pr-8 pl-8 bg-gray-200">
                  <p className=" text-gray-600 w-28 font-semibold">Sector</p>
                  <p className="text-gray-800 font-semibold">Information Technology</p>
                </div>
              </div>
              <p className="pt-2 text-sm leading-6 flex p-3 pr-8 pl-8 rounded-br-md rounded-bl-md">
                <span className=" text-gray-600 mr-10 font-semibold">
                  Description
                </span>
                <span className="text-gray-800 font-semibold">
                  Apple, Inc. engages in the design, manufacture, and marketing
                  of mobile communication, media devices, personal computers,
                  and portable digital music players. It operates through the
                  following geographical segments...
                  <span className="text-xs text-indigo-800">Read More</span>
                </span>
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Simple;
