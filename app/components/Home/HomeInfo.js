import { FileText, Bank, BarChart, Droplet, Newspaper } from "react-bootstrap-icons";

const HomeInfo = () => {
  return (
    <div>
      <div className="max-w-6xl mx-auto p-4 pt-8 pb-20">
        <p className="text-gray-600 text-sm text-center mb-14">features that will give you the edge you need</p>
        <div className="flex justify-between mx-auto w-full">
          <p className="text-indigo-500 w-full text-center"><FileText size={40} className="mx-auto mb-3"/><span className="text-gray-900 font-light">sec filings</span></p>
          <p className="text-indigo-500 w-full text-center"><Bank size={40} className="mx-auto mb-3"/><span className="text-gray-900 font-light">financial info</span></p>
          <p className="text-indigo-500 w-full text-center"><BarChart size={40} className="mx-auto mb-3"/><span className="text-gray-900 font-light">statistical info</span></p>
          <p className="text-indigo-500 w-full text-center"><Droplet size={40} className="mx-auto mb-3"/><span className="text-gray-900 font-light">Dilution Tracker</span></p>
          <p className="text-indigo-500 w-full text-center"><Newspaper size={40} className="mx-auto mb-3"/><span className="text-gray-900 font-light">Latest News</span></p>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
