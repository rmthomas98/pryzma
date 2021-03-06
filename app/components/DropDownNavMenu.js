import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { Person, BoxArrowLeft } from "react-bootstrap-icons";

const DropDownNavMenu = ({ userData, active, setDropDownActive, button }) => {
  const router = useRouter();

  const menu = useRef();

  const handleOutsideClick = (e) => {
    if (!menu.current?.contains(e.target) && e.target !== button.current)
      setDropDownActive(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
  }, []);

  const handleLogout = async () => {
    setDropDownActive(false);
    const response = await axios
      .get("/api/logout")
      .catch((e) => console.error(e));
    if (response.data === "user logged out") router.push("/login");
  };

  return (
    <div
      ref={menu}
      className={`transition-all duration-300 absolute top-12 right-0 bg-zinc-800 shadow-md rounded-md shadow-black/50 flex flex-col overflow-hidden items-center animate-fadeInUpFast translate-y-6`}
    >
      {userData && (
        <p className="font-semibold text-center text-zinc-200 text-sm p-2 pt-4 pb-0.5">{`${userData.firstName} ${userData.lastName}`}</p>
      )}
      {userData && (
        <p className="text-xs text-center text-zinc-200 pl-6 pr-6 pb-2 border-b border-zinc-700">
          {userData.email}
        </p>
      )}
      <Link href="/admin/manage-account">
        <a
          onClick={() => setDropDownActive(false)}
          className="p-3 pl-6 pr-6 text-sm w-full font-medium text-zinc-300 flex justify-center items-center hover:bg-zinc-700 transition-all duration-300"
        >
          <Person className="mr-2 text-lg" />
          Manage Account
        </a>
      </Link>
      <p
        onClick={handleLogout}
        className="cursor-pointer p-3 pl-6 pr-6 text-sm w-full font-medium text-red-500 flex justify-center items-center hover:bg-zinc-700 transition-all duration-300"
      >
        <BoxArrowLeft className="mr-2 text-lg" />
        Logout
      </p>
    </div>
  );
};

export default DropDownNavMenu;
