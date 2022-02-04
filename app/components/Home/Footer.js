import { Twitter } from "react-bootstrap-icons";
import Link from "next/link";
import { useRouter } from "next/router";

const Footer = () => {
  const router = useRouter();

  return (
    <div className="max-w-7xl mx-auto flex justify-between pt-8 pb-8 w-full">
      <Link href="/">
        <a className="font-medium text-zinc-300 text-xl hover:text-white transition-all">
          Pryzma
        </a>
      </Link>
      <div>
        <div className="flex justify-center">
          <Link href="/terms-of-service">
            <a
              className={`text-xs font-medium text-center mr-4 transition-all ${
                router.pathname.endsWith("/terms-of-service")
                  ? "text-violet-400"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Terms of Service
            </a>
          </Link>
          <Link href="/privacy-policy">
            <a
              className={`text-xs font-medium text-center transition-all ${
                router.pathname.endsWith("/privacy-policy")
                  ? "text-violet-400"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              Privacy Policy
            </a>
          </Link>
        </div>
        <p className="mt-6 text-xs text-zinc-400">
          &copy; Copyright 2022 Pryzma. All Rights Reservered.
        </p>
      </div>
      <a href="https://twitter.com/pryzma_io" target="_blank" rel="noreferrer">
        <Twitter className="text-zinc-300" />
      </a>
    </div>
  );
};

export default Footer;
