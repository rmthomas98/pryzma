import { Twitter } from "react-bootstrap-icons";

const Footer = () => {
  return (
    <div className="max-w-7xl mx-auto flex justify-between pt-8 pb-8 w-full">
      <p className="font-medium text-zinc-300 text-xl">Pryzma</p>
      <div>
        <div className="flex justify-center">
          <p className="text-xs font-medium text-zinc-300 text-center mr-4">
            Terms of use
          </p>
          <p className="text-xs font-medium text-zinc-300 text-center">
            Policy
          </p>
        </div>
        <p className="mt-6 text-xs text-zinc-400">
          &copy; 2020 PrizmPro. All Rights Reservered.
        </p>
      </div>
      <a href="https://twitter.com/pryzma_io" target="_blank" rel="noreferrer">
        <Twitter className="text-zinc-300" />
      </a>
    </div>
  );
};

export default Footer;
