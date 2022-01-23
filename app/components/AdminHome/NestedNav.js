import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from 'next/image';
import home from '../../static/images/home.svg';
import overview from '../../static/images/overview.svg';
import news from '../../static/images/newsAdmin.svg';
import financials from '../../static/images/financialsAdmin.svg';
import stats from '../../static/images/statsAdmin.svg';
import filings from '../../static/images/folderAdmin.svg';

const NestedNav = () => {
  const [number, setNumber] = useState();
  const router = useRouter();

  useEffect(() => {
    setNumber(0)
  },[router.pathname])

  return (
    <div className="bg-gray-800 max-w-[220px] w-full min-h-screen sticky top-0 flex flex-col">
      <p className="text-2xl mx-auto pt-3">
        <span className="text-white mr-2">Pryzma</span>
        <span className="text-indigo-400">Admin</span>
      </p>
      <Link href="/">
        <a
          onMouseEnter={() => setNumber(1)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/admin") && setNumber(0)
          }
          className={`${
            router.pathname.endsWith("/admin") ? "bg-gray-900 opacity-100" : 'opacity-60'
          } text-white text-sm font-medium p-3 pl-4 relative mt-3 hover:opacity-100 hover:bg-gray-900 duration-200 transition-all flex items-center`}
        >
          <span
            className={`${
              number === 1 || router.pathname.endsWith("/admin") ? "h-full" : 'h-0'
            } absolute h-0 origin-center transition-all duration-200 ease-in content-none left-0 bottom-0 my-auto top-0 w-0.5 rounded-full bg-indigo-400`}
          ></span>
          <Image src={home} height={20} width={20} layout="fixed"/>
          <span className="ml-3">Home</span>
        </a>
      </Link>
      <Link href="/admin/overview">
        <a  onMouseEnter={() => setNumber(2)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/overview") && setNumber(0)
          } className={`text-white text-sm font-medium p-3 pl-4 flex items-center relative hover:opacity-100 duration-200 hover:bg-gray-900 transition-all ${router.pathname.endsWith('/overview') ? 'bg-gray-900 opacity-100' : 'opacity-60'}`}> <span
            className={`${
              number === 2 || router.pathname.endsWith("/overview") ? "h-full" : 'h-0'
            } absolute h-0 origin-center transition-all ease-in  content-none left-0 bottom-0 my-auto top-0 w-0.5 rounded-full bg-indigo-400`}
          ></span><Image src={overview} height={20} width={20} layout="fixed" /><span className="ml-3">Overview</span></a>
      </Link>
      <Link href="/admin/news">
        <a onMouseEnter={() => setNumber(3)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/news") && setNumber(0)
          } className={`text-white text-sm font-medium p-3 pl-4 flex items-center relative hover:opacity-100 duration-200 hover:bg-gray-900 transition-all ${router.pathname.endsWith('/news') ? 'bg-gray-900 opacity-100' : 'opacity-60'}`}><span className={`${number === 3 || router.pathname.endsWith("/news") ? "h-full" : 'h-0'} absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-indigo-400`}></span><Image src={news} height={20} width={20} layout="fixed"/><span className="ml-3">News</span></a>
      </Link>
      <Link href="/admin/financials">
        <a onMouseEnter={() => setNumber(4)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/financials") && setNumber(0)
          } className={`text-white text-sm font-medium p-3 pl-4 flex items-center relative hover:opacity-100 duration-200 hover:bg-gray-900 transition-all ${router.pathname.endsWith('/financials') ? 'bg-gray-900 opacity-100' : 'opacity-60'}`}><span className={`${number === 4 || router.pathname.endsWith("/financials") ? "h-full" : 'h-0'} absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-indigo-400`}></span><Image src={financials} height={20} width={20} layout="fixed"/><span className="ml-3">Financials</span></a>
      </Link>
      <Link href="/admin/statistics">
        <a onMouseEnter={() => setNumber(5)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/statistics") && setNumber(0)
          } className={`text-white text-sm font-medium p-3 pl-4 relative hover:opacity-100 hover:bg-gray-900 duration-200 transition-all ${router.pathname.endsWith('/statistics') ? 'bg-gray-900 opacity-100' : 'opacity-60'}`}><span className={`${number === 5 || router.pathname.endsWith("/statistics") ? "h-full" : 'h-0'} absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-indigo-400`}></span><Image src={stats} height={20} width={20} layout="fixed"/><span className="ml-3">Statistics</span></a>
      </Link>
      <Link href="/admin/filings">
        <a onMouseEnter={() => setNumber(6)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/filings") && setNumber(0)
          } className={`text-white text-sm font-medium p-3 pl-4 hover:opacity-100 hover:bg-gray-900 relative transition-all duration-200 flex items-center ${router.pathname.endsWith('/filings') ? 'opacity-100 bg-gray-900' : 'opacity-60'}`}><span className={`${number === 6 || router.pathname.endsWith("/filings") ? "h-full" : 'h-0'} absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-indigo-400`}></span><Image src={filings} height={20} width={20} layout="fixed" /><span className="ml-3">SEC FIlings</span></a>
      </Link>
      <Link href="/">
        <a className="text-white text-sm font-medium p-3 pl-4">Income Statement</a>
      </Link>
      <Link href="/">
        <a className="text-white text-sm font-medium p-3 pl-4">Balance Sheet</a>
      </Link>
      <Link href="/">
        <a className="text-white text-sm font-medium p-3 pl-4">Cash Flow</a>
      </Link>
    </div>
  );
};

export default NestedNav;
