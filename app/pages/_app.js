import "../styles/globals.css";
import Nav from "../components/Nav";
import NestedNav from "../components/AdminHome/NestedNav";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import SymbolContext from "./SymbolContext";
import UserContext from "./UserContext";
import { useState } from "react";
import SymbolNav from "../components/AdminHome/SymbolNav";
import Script from "next/script";

function MyApp({ Component, pageProps }) {
  const [symbol, setSymbol] = useState(null);
  const [user, setUser] = useState(null);

  const router = useRouter();

  if (router.pathname.startsWith("/admin")) {
    return (
      <>
        <Script
          strategy="lazyOnload"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_CODE}`}
        />
        <Script strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.GOOGLE_ANALYTICS_CODE});`}
        </Script>
        <NextNProgress
          color="#A78BFA"
          startPosition={0.7}
          stopDelayMs={50}
          height={2}
        />
        <UserContext.Provider value={{ user, setUser }}>
          <SymbolContext.Provider value={{ symbol, setSymbol }}>
            <div className="font-monts">
              <div className="flex">
                <NestedNav />
                <div className="w-full bg-zinc-900">
                  <Nav />
                  {router.pathname.endsWith("/admin") ||
                  router.pathname.endsWith("/manage-account") ||
                  router.pathname.endsWith("/movers") ? (
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
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_CODE}`}
      />
      <Script strategy="lazyOnload">
        {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', ${process.env.GOOGLE_ANALYTICS_CODE});`}
      </Script>
      <div className="font-monts bg-zinc-900">
        <Nav />
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
