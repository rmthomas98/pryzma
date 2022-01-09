import Link from "next/link";

const Nav = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl w-full flex justify-between mx-auto pl-4 pr-4 pt-6 pb-6">
        <Link href="/">
          <a className="font-medium text-gray-900 text-xl">prizmpro<span className="text-gray-500">.io</span></a>
        </Link>
        <div>
          <Link href="/login">
            <a className="text-indigo-600 font-medium text-sm border border-indigo-600 rounded-md p-2 pl-6 pr-6 mr-2 hover:bg-indigo-600 hover:text-white transition-all duration-300">
              login
            </a>
          </Link>
          <Link href="/signup">
            <a className="text-white font-medium text-sm  bg-gradient-to-r from-rose-600 to-indigo-600 rounded-md p-[9px] pl-6 pr-6 hover:shadow-md hover:shadow-gray-500 transition-all duration-300">
              sign up
            </a>
          </Link>
        </div>
      </div>
    </div>
  )}

export default Nav;
