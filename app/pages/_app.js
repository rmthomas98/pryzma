import "../styles/globals.css";
import Nav from "../components/Nav";
import NestedNav from "../components/AdminHome/NestedNav";
import {useRouter} from 'next/router';

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  if (router.pathname.startsWith('/admin')) {
    return (
      <div>
        <div className="flex">
          <NestedNav />
          <div className="w-full">
            <Nav />
          <Component {...pageProps} />
          </div>
        </div>
      </div>
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
