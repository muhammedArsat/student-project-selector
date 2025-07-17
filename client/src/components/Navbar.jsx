import React, { useContext, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import ThemeContext from "../hooks/ThemeContext";
import { logout } from "../apis/AuthApis";
import AuthContext from "../hooks/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { fetchUser, role, id } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const handleMobileBar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      const res = await logout();
      if (res.ok) {
        await fetchUser();
        localStorage.clear("theme");
        if (isDark) {
          document.body.classList.remove("dark");
        }
      }
    } catch (err) {}
  };

  const handleRoute = (path) => {
    navigate(`/${path}`);
  };
  return (
    <nav className="flex sm:flex-col flex-row p-3 justify-between sm:justify-start items-center z-50 relative sm:min-h-screen shadow-soft  dark:shadow-darkSoft gap-2 dark:bg-[#212529] transition-all duration-500">
      <h1 className="font-lexend text-subheading">Project Selector</h1>

      <span className="cursor-pointer block sm:hidden">
        <CiMenuBurger size={26} onClick={handleMobileBar} />
      </span>

      <ul className="sm:flex flex-col font-lexend text-body w-full hidden">
        <li
          className={`px-2 py-4 text-center cursor-pointer ${
            pathname === "/home" ? "bg-blue-500 text-white rounded-lg" : ""
          }`}
          onClick={() => handleRoute("home")}
        >
          Home
        </li>
        {role === "ADMIN" && (
          <>
            <li
              className={`px-2 py-4 text-center cursor-pointer ${
                pathname === "/student-list"
                  ? "bg-blue-500 text-white rounded-lg"
                  : ""
              }`}
              onClick={() => handleRoute("student-list")}
            >
              Student Lists
            </li>
            <li
              className={`px-2 py-4 text-center cursor-pointer ${
                pathname === "/faculty-list"
                  ? "bg-blue-500 text-white rounded-lg"
                  : ""
              }`}
              onClick={() => handleRoute("faculty-list")}
            >
              Faculty Lists
            </li>
          </>
        )}

        {role !== "STUDENT" && (
          <li
            className={`px-2 py-4 text-center cursor-pointer ${
              pathname === `/inbox/${id}`
                ? "bg-blue-500 text-white rounded-lg"
                : ""
            }`}
            onClick={() => handleRoute(`inbox/${id}`)}
          >
            Inbox
          </li>
        )}
        <li
          className={`px-2 py-4 text-center cursor-pointer ${
            pathname === `/dashboard/${id}` ? "bg-blue-500 text-white rounded-lg" : ""
          }`}
          onClick={() => handleRoute(`dashboard/${id}`)}
        >
          Dashboard
        </li>
        <li
          className="px-2 py-4 text-center cursor-pointer"
          onClick={toggleTheme}
        >
          Theme
        </li>
        <li
          className="px-2  py-4 text-center cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>

      <ul
        className={`fixed left-0 top-14  flex-col font-lexend text-body  min-h-screen p-2 rounded-r-lg shadow-soft z-50 bg-white dark:bg-[#181818] transform dark:shadow-darkSoft transition-all duration-500 ease-in-out sm:hidden ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } `}
      >
        <li
          className={`px-2 py-4 text-center cursor-pointer ${
            pathname === "/home" ? "bg-blue-500 text-white rounded-lg" : ""
          }`}
        >
          Home
        </li>
        {role === "ADMIN" && (
          <>
            <li
              className={`px-2 py-4 text-center cursor-pointer ${
                pathname === "/student-list"
                  ? "bg-blue-500 text-white rounded-lg"
                  : ""
              }`}
            >
              Student Lists
            </li>
            <li
              className={`px-2 py-4 text-center cursor-pointer ${
                pathname === "/faculty-list"
                  ? "bg-blue-500 text-white rounded-lg"
                  : ""
              }`}
            >
              Faculty Lists
            </li>
          </>
        )}
        {!role === "STUDENT" && (
          <li
            className={`px-2 py-4 text-center cursor-pointer ${
              pathname === "/inbox" ? "bg-blue-500 text-white rounded-lg" : ""
            }`}
          >
            Inbox
          </li>
        )}
        <li
          className={`px-2 py-4 text-center cursor-pointer ${
            pathname === "/dashboard" ? "bg-blue-500 text-white rounded-lg" : ""
          }`}
        >
          Dashboard
        </li>
        <li
          className="px-2 py-4 text-center cursor-pointer"
          onClick={toggleTheme}
        >
          Theme
        </li>
        <li
          className="px-2  py-4 text-center cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
