import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import home from "../../public/images/home.svg";
import overview from "../../public/images/overview.svg";
import stats from "../../public/images/statsAdmin.svg";
import income from "../../public/images/incomeAdmin.svg";
import balance from "../../public/images/balanceAdmin.svg";
import cash from "../../public/images/cashAdmin.svg";
import institution from "../../public/images/institutionalAdmin.svg";
import insider from "../../public/images/insiderAdmin.svg";
import offerings from "../../public/images/offeringsAdmin.svg";
import logo from "../../public/images/logo.png";

const NestedNav = () => {
  const [number, setNumber] = useState();
  const router = useRouter();

  useEffect(() => {
    setNumber(0);
  }, [router.pathname]);

  return (
    <div className="bg-zinc-800 max-w-[230px] min-w-[230px] w-full h-screen overflow-auto sticky top-0 flex flex-col">
      <p className="text-2xl mx-auto pt-3">
        <Image src={logo} layout="fixed" height={29} width={100} />
      </p>
      <Link href="/">
        <a
          onMouseEnter={() => setNumber(1)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/admin") && setNumber(0)
          }
          className={`${
            router.pathname.endsWith("/admin")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          } text-white text-xs p-2 pl-4 relative mt-[7px] hover:opacity-100 hover:bg-zinc-700/25 duration-200 transition-all flex items-center`}
        >
          <span
            className={`${
              number === 1 || router.pathname.endsWith("/admin")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 ease-in content-none left-0 bottom-0 my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={home} height={20} width={20} layout="fixed" />
          <span className="ml-3">Home</span>
        </a>
      </Link>
      <Link href="/admin/movers">
        <a
          onMouseEnter={() => setNumber(6)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/movers") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 hover:opacity-100 hover:bg-zinc-700/25 relative transition-all duration-200 flex items-center ${
            router.pathname.endsWith("/movers")
              ? "opacity-100 bg-zinc-700/25"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 6 || router.pathname.endsWith("/movers")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={stats} height={20} width={20} layout="fixed" />
          <span className="ml-3">Top Movers</span>
        </a>
      </Link>
      <Link href="/admin/overview">
        <a
          onMouseEnter={() => setNumber(2)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/overview") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 flex items-center relative hover:opacity-100 duration-200 hover:bg-zinc-700/25 transition-all ${
            router.pathname.endsWith("/overview")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          }`}
        >
          {" "}
          <span
            className={`${
              number === 2 || router.pathname.endsWith("/overview")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all ease-in  content-none left-0 bottom-0 my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={overview} height={20} width={20} layout="fixed" />
          <span className="ml-3">Overview</span>
        </a>
      </Link>
      {/* <Link href="/admin/financials">
        <a onMouseEnter={() => setNumber(4)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/financials") && setNumber(0)
          } className={`text-white text-xs p-2 pl-4 flex items-center relative hover:opacity-100 duration-200 hover:bg-zinc-700/25 transition-all ${router.pathname.endsWith('/financials') ? 'bg-zinc-700/25 opacity-100' : 'opacity-60'}`}><span className={`${number === 4 || router.pathname.endsWith("/financials") ? "h-full" : 'h-0'} absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}></span><Image src={financials} height={20} width={20} layout="fixed"/><span className="ml-3">Financials</span></a>
      </Link>
      <Link href="/admin/statistics">
        <a onMouseEnter={() => setNumber(5)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/statistics") && setNumber(0)
          } className={`text-white text-xs p-2 pl-4 relative hover:opacity-100 hover:bg-zinc-700/25 duration-200 transition-all ${router.pathname.endsWith('/statistics') ? 'bg-zinc-700/25 opacity-100' : 'opacity-60'}`}><span className={`${number === 5 || router.pathname.endsWith("/statistics") ? "h-full" : 'h-0'} absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}></span><Image src={stats} height={20} width={20} layout="fixed"/><span className="ml-3">Statistics</span></a>
      </Link> */}
      {/* <Link href="/admin/movers">
        <a
          onMouseEnter={() => setNumber(6)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/movers") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 hover:opacity-100 hover:bg-zinc-700/25 relative transition-all duration-200 flex items-center ${
            router.pathname.endsWith("/movers")
              ? "opacity-100 bg-zinc-700/25"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 6 || router.pathname.endsWith("/movers")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={stats} height={20} width={20} layout="fixed" />
          <span className="ml-3">Top Movers</span>
        </a>
      </Link> */}
      <Link href="/admin/offerings">
        <a
          onMouseEnter={() => setNumber(7)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/offerings") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 relative flex items-center hover:bg-zinc-700/25 hover:opacity-100 transition-all duration-200 ${
            router.pathname.endsWith("/offerings")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 7 || router.pathname.endsWith("/offerings")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={offerings} height={20} width={20} layout="fixed" />
          <span className="ml-3">Offerings</span>
        </a>
      </Link>
      <Link href="/admin/income">
        <a
          onMouseEnter={() => setNumber(8)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/income") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 hover:bg-zinc-700/25 hover:opacity-100 trasnition-all duration-200 flex relative items-center ${
            router.pathname.endsWith("/income")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 8 || router.pathname.endsWith("/income")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={income} height={20} width={20} layout="fixed" />
          <span className="ml-3">Income Statement</span>
        </a>
      </Link>
      <Link href="/admin/balance">
        <a
          onMouseEnter={() => setNumber(9)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/balance") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 relative hover:bg-zinc-700/25 hover:opacity-100 transition-all duration-200 flex items-center ${
            router.pathname.endsWith("/balance")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 9 || router.pathname.endsWith("/balance")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={balance} height={20} width={20} layout="fixed" />
          <span className="ml-3">Balance Sheet</span>
        </a>
      </Link>
      <Link href="/admin/cash">
        <a
          onMouseEnter={() => setNumber(10)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/cash") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 relative flex items-center hover:bg-zinc-700/25 hover:opacity-100 transition-all duration-200 ${
            router.pathname.endsWith("/cash")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 10 || router.pathname.endsWith("/cash")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={cash} height={20} width={20} layout="fixed" />
          <span className="ml-3">Cash Flow</span>
        </a>
      </Link>
      <Link href="/admin/institutional">
        <a
          onMouseEnter={() => setNumber(11)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/institutional") && setNumber(0)
          }
          className={`text-white text-xs p-2 pl-4 relative flex items-center hover:bg-zinc-700/25 hover:opacity-100 transition-all duration-200 ${
            router.pathname.endsWith("/institutional")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 11 || router.pathname.endsWith("/institutional")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={institution} height={20} width={20} layout="fixed" />
          <span className="ml-3">Institutional Ownership</span>
        </a>
      </Link>
      <Link href="/admin/insiders">
        <a
          onMouseEnter={() => setNumber(12)}
          onMouseLeave={() =>
            !router.pathname.endsWith("/insiders") && setNumber(0)
          }
          className={`text-white mb-10 text-xs p-2 pl-4 relative flex items-center hover:bg-zinc-700/25 hover:opacity-100 transition-all duration-200 ${
            router.pathname.endsWith("/insiders")
              ? "bg-zinc-700/25 opacity-100"
              : "opacity-60"
          }`}
        >
          <span
            className={`${
              number === 12 || router.pathname.endsWith("/insiders")
                ? "h-full"
                : "h-0"
            } absolute h-0 origin-center transition-all duration-200 content-none left-0 bottom-0 ease-in my-auto top-0 w-0.5 rounded-full bg-violet-400`}
          ></span>
          <Image src={insider} height={20} width={20} layout="fixed" />
          <span className="ml-3">Insider Ownership</span>
        </a>
      </Link>
    </div>
  );
};

export default NestedNav;
