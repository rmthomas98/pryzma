import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import { ArrowRight, CaretDownFill, Person } from "react-bootstrap-icons";
import DropDownNavMenu from "./DropDownNavMenu";
import Search from "./AdminHome/Search";
import logo from "../static/images/logo.png";
import Image from "next/image";

const Nav = () => {
  const router = useRouter();

  const [name, setName] = useState();
  const [dropDownActive, setDropDownActive] = useState(false);
  const [userData, setUserData] = useState();

  const button = useRef();

  useEffect(() => {
    const getUser = async () => {
      if (!router.pathname.startsWith("/admin")) return;
      const response = await axios
        .get("/api/user")
        .catch((e) => console.error(e));
      if (response.data) setName(response.data.user.firstName);
      const { firstName, lastName, email } = response.data.user;
      setUserData({ firstName, lastName, email });
    };
    getUser();
  }, [router.pathname, router.query]);

  return (
    <div
      className={`w-full relative ${
        router.pathname.endsWith("/login") ||
        router.pathname.endsWith("/signup")
          ? "z-[9999]"
          : ""
      } ${
        router.pathname.startsWith("/admin")
          ? "bg-zinc-900 sticky top-0 z-10"
          : ""
      }`}
    >
      <div
        className={`w-full flex justify-between items-center mx-auto pl-4 pr-4 relative ${
          router.pathname.startsWith("/admin")
            ? "pb-2 pt-2 pl-2 pr-2"
            : "pb-6 pt-6 max-w-7xl"
        }`}
      >
        {!router.pathname.startsWith("/admin") && (
          <Link href={router.pathname.startsWith("/admin") ? "/admin" : "/"}>
            <a className="flex items-center justify-center">
              <Image src={logo} layout="fixed" height={32} width={110} />
            </a>
          </Link>
        )}
        {router.pathname.startsWith("/admin") && <Search />}
        {router.pathname.startsWith("/admin") ? (
          <div className="flex">
            {name && (
              <p
                ref={button}
                onClick={() =>
                  dropDownActive
                    ? setDropDownActive(false)
                    : setDropDownActive(true)
                }
                className={`text-xs flex text-gray-300 font-medium items-center cursor-pointer rounded-md p-1.5 pl-4 pr-4 hover:bg-gray-700 transition-all duration-200 ${
                  dropDownActive && "bg-gray-700"
                }`}
              >
                <Person className="mr-1 text-lg pointer-events-none" />
                {name}
                <CaretDownFill
                  className={`pointer-events-none ml-2 text-xs relative top-[1px] text-gray-400 transition-all duration-300 ${
                    dropDownActive ? "rotate-180" : "rotate-0"
                  }`}
                />
              </p>
            )}
            {dropDownActive && (
              <DropDownNavMenu
                userData={userData}
                active={dropDownActive}
                setDropDownActive={setDropDownActive}
                button={button}
              />
            )}
          </div>
        ) : (
          <div>
            <Link href="/login">
              <a className="text-zinc-100 font-medium flex items-center">
                Login
                <ArrowRight className="ml-2" />
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Nav;
