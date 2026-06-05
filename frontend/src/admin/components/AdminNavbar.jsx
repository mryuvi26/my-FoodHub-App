import { assets } from "../../assets/frontend_assets/assets.js";
import { NavLink } from "react-router-dom";
import logo from "../../assets/frontend_assets/dp.jpg";
import { FiSun, FiMoon } from "react-icons/fi";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
  const [dark, setDark] = useState(false);

  // page reload par dark mode yaad rahe
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  const toggleDark = () => {
    if (dark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDark(!dark);
  };

  return (
    <div className="h-16 w-full flex items-center justify-between px-4 sm:px-10 
      border-b bg-white dark:bg-[#0E1116] dark:border-gray-700">

      {/* LOGO */}
      <NavLink to="/">
        <img
          src={assets.logo}
          className="w-32 md:w-40 cursor-pointer"
          alt="logo"
        />
      </NavLink>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* DARK MODE BUTTON */}
        <button
          onClick={toggleDark}
          className="p-2 rounded-full border 
          bg-gray-100 dark:bg-gray-800 
          text-gray-700 dark:text-gray-200"
        >
          {dark ? <FiSun /> : <FiMoon />}
        </button>

        {/* PROFILE */}
        <img
          src={logo}
          alt="profile"
          className="w-9 h-9 rounded-full"
        />
      </div>
    </div>
  );
}
