import "../styles/globals.css";
import Nav from "../components/Nav";
import NestedNav from "../components/AdminHome/NestedNav";
import {useRouter} from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import SymbolContext from './SymbolContext';
import { useState } from "react";

function MyApp({ Component, pageProps }) {

  const [symbol, setSymbol] = useState(null)

  const router = useRouter()

  if (router.pathname.startsWith('/admin')) {
    return (
      <>
        <NextNProgress color="#818CF8" startPosition={0.7} stopDelayMs={50} height={2.5}/>
        <SymbolContext.Provider value={{symbol, setSymbol}}>
      <div>
        <div className="flex">
          <NestedNav />
          <div className="w-full">
            <Nav />
          <Component {...pageProps} />
          </div>
        </div>
      </div>
        </SymbolContext.Provider>
        </>
    )
  }

  return (
    <div>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
