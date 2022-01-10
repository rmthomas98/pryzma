import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { CaretDownFill } from "react-bootstrap-icons";
import DropDownNavMenu from "./DropDownNavMenu";

const Nav = () => {
  const router = useRouter();

  const [name, setName] = useState();
  const [dropDownActive, setDropDownActive] = useState(false);
  const [userData, setUserData] = useState();

  const button = useRef()

  useEffect(() => {
    const getUser = async () => {
      if (!router.pathname.startsWith("/admin")) return;
      const response = await axios
        .get("/api/user")
        .catch((e) => console.error(e));
      if (response.data)
        setName(
          response.data.user.firstName
        );
        const {firstName, lastName, email,} = response.data.user;
        setUserData({firstName, lastName, email}) 
    };
    getUser();
  }, [router.pathname]);

  return (
    <div className="w-full bg-white">
      <div className="max-w-7xl w-full flex justify-between items-center mx-auto pl-4 pr-4 pt-6 pb-6 relative">
        <Link href={router.pathname.startsWith("/admin") ? "/admin" : "/"}>
          <a className="font-medium text-gray-900 text-xl">
            prizmpro<span className="text-gray-500">.io</span>
          </a>
        </Link>
        {router.pathname.startsWith("/admin") ? (
          <div className="flex">
            {name && <p ref={button} onClick={() => dropDownActive ? setDropDownActive(false) : setDropDownActive(true)} className={`text-xs flex text-gray-600 items-center cursor-pointer border border-gray-200 rounded-md p-1.5 pl-4 pr-4 hover:bg-gray-100 transition-all duration-200 ${dropDownActive && 'bg-gray-100'}`}>{name}<CaretDownFill className={`pointer-events-none ml-1 text-xs relative top-[1px] text-gray-400 transition-all duration-300 ${dropDownActive ? 'rotate-180' : 'rotate-0'}`}/></p>}
            <DropDownNavMenu userData={userData} active={dropDownActive} setDropDownActive={setDropDownActive} button={button}/>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Nav;
