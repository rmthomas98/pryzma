import "../styles/globals.css";
import Nav from "../components/Nav";
import NestedNav from "../components/AdminHome/NestedNav";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import SymbolContext from "./SymbolContext";
import UserContext from "./UserContext";
import { useState } from "react";
import SymbolNav from "../components/AdminHome/SymbolNav";

function MyApp({ Component, pageProps }) {
  const [symbol, setSymbol] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();

  if (router.pathname.startsWith("/admin")) {
    return (
      <>
        <NextNProgress
          color="#818CF8"
          startPosition={0.7}
          stopDelayMs={50}
          height={2}
        />
        <UserContext.Provider value={{ user, setUser }}>
          <SymbolContext.Provider value={{ symbol, setSymbol }}>
            <div className="font-monts">
              <div className="flex">
                <NestedNav />
                <div className="w-full">
                  <Nav />
                  {router.pathname.endsWith("/admin") ||
                  router.pathname.endsWith("/manage-account") ? (
                    ""
                  ) : (
                    <SymbolNav />
                  )}
                  <Component {...pageProps} />
                </div>
              </div>
            </div>
          </SymbolContext.Provider>
        </UserContext.Provider>
      </>
    );
  }

  return (
    <div className="font-monts bg-zinc-900">
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
