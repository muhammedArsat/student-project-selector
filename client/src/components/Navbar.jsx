import React, { useContext, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { IoMdMail } from "react-icons/io";
import { MdDashboard } from "react-icons/md";
import { FiLogOut } from "react-icons/fi";
import ThemeContext from "../hooks/ThemeContext";
import { logout } from "../apis/AuthApis";
import AuthContext from "../hooks/AuthContext";
import { FiSun, FiMoon } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { FiChevronLeft } from "react-icons/fi";
import Theme from "./Theme";
import LogoutSection from "./LogoutSection";
const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { fetchUser, role, id } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const [isShrink, setIsShrink] = useState(true);
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const handleMobileBar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  const toggleShrink = () => {
    setIsShrink((prev) => !prev);
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
    <nav
      className={`flex sm:flex-col flex-row p-3 justify-between sm:justify-between items-center z-50 relative sm:min-h-screen shadow-soft  dark:shadow-darkSoft gap-2 dark:bg-[#212529] transition-all duration-500  ${
        isShrink ? "sm:w-[75px]" : "sm:w-[250px]"
      }`}
    >
      <div>
        <h1 className="font-lexend text-subheading  justify-start items-center gap-1 hidden sm:flex">
          {!isShrink && " Project Selector"}
          <FiChevronLeft
            onClick={toggleShrink}
            className={`transition-all duration-300 hidden sm:block cursor-pointer ${
              isShrink ? "rotate-180" : ""
            }`}
          />
        </h1>
        <h1 className="font-lexend text-subheading sm:hidden">
          Project Selector
        </h1>

        <ul className="sm:flex flex-col font-lexend text-body w-full hidden">
          <li
            className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1
      ${pathname === "/home" ? "bg-blue-500 text-white rounded-lg" : ""}
      ${isShrink ? "justify-center" : "justify-start"}
    `}
            onClick={() => handleRoute("home")}
          >
            <AiFillHome />
            {!isShrink && "Home"}
          </li>
          {role === "ADMIN" && (
            <>
              <li
                className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1
      ${pathname === "/student-list" ? "bg-blue-500 text-white rounded-lg" : ""}
      ${isShrink ? "justify-center" : "justify-start"}
    `}
                onClick={() => handleRoute("student-list")}
              >
                <FaUserGraduate />
                {!isShrink && "Student Lists"}
              </li>
              <li
                className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1
      ${pathname === "/faculty-list" ? "bg-blue-500 text-white rounded-lg" : ""}
      ${isShrink ? "justify-center" : "justify-start"}
    `}
                onClick={() => handleRoute("faculty-list")}
              >
                <FaChalkboardTeacher />
                {!isShrink && "Faculty Lists"}
              </li>
            </>
          )}

          {role !== "STUDENT" && (
            <li
              className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1
      ${pathname === `/inbox/${id}` ? "bg-blue-500 text-white rounded-lg" : ""}
      ${isShrink ? "justify-center" : "justify-start"}
    `}
              onClick={() => handleRoute(`inbox/${id}`)}
            >
              <IoMdMail />
              {!isShrink && "Inbox"}
            </li>
          )}
          {role !== "ADMIN" && (
            <li
              className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1
      ${
        pathname === `/dashboard/${id}`
          ? "bg-blue-500 text-white rounded-lg"
          : ""
      }
      ${isShrink ? "justify-center" : "justify-start"}
    `}
              onClick={() => handleRoute(`dashboard/${id}`)}
            >
              <MdDashboard />
              {!isShrink && "Dashboard"}
            </li>
          )}

          <li
            className={`px-2  py-4 text-left cursor-pointer flex justify-start gap-1 items-center ${
              isShrink ? "justify-center" : ""
            }`}
            onClick={handleLogout}
          >
            <FiLogOut />
            {!isShrink && "Logout"}
          </li>
        </ul>
      </div>
      <span className="cursor-pointer block sm:hidden">
        <CiMenuBurger size={26} onClick={handleMobileBar} />
      </span>
      <div className="hidden sm:block">
        <div
          className={`transition-all duration-500 ${isShrink ? "hidden" : ""}`}
        >
          <LogoutSection />
          <Theme />
        </div>
        {isShrink && (
          <button
            onClick={toggleTheme}
            className={` flex justify-start items-center p-1 cursor-pointer ${
              isShrink ? "justify-center" : ""
            }`}
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
        )}
      </div>

      <div
        className={`fixed left-0 top-14 font-lexend text-body min-h-screen p-2 rounded-r-lg shadow-soft z-50 bg-white dark:bg-[#181818] transform dark:shadow-darkSoft transition-all duration-500 ease-in-out sm:hidden w-[250px]  flex flex-col  ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="flex flex-col gap-3">
          <li
            className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1 ${
              pathname === "/home" ? "bg-blue-500 text-white rounded-lg" : ""
            }`}
            onClick={() => handleRoute("home")}
          >
            <AiFillHome />
            {"Home"}
          </li>

          {role === "ADMIN" && (
            <>
              <li
                className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1 ${
                  pathname === "/student-list"
                    ? "bg-blue-500 text-white rounded-lg"
                    : ""
                } ${isShrink ? "justify-center" : "justify-start"}`}
                onClick={() => handleRoute("student-list")}
              >
                <FaUserGraduate />
                {"Student Lists"}
              </li>

              <li
                className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1 ${
                  pathname === "/faculty-list"
                    ? "bg-blue-500 text-white rounded-lg"
                    : ""
                } ${isShrink ? "justify-center" : "justify-start"}`}
                onClick={() => handleRoute("faculty-list")}
              >
                <FaChalkboardTeacher />
                {"Faculty Lists"}
              </li>
            </>
          )}

          {role !== "STUDENT" && (
            <li
              className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1 ${
                pathname === `/inbox/${id}`
                  ? "bg-blue-500 text-white rounded-lg"
                  : ""
              }`}
              onClick={() => handleRoute(`inbox/${id}`)}
            >
              <IoMdMail />
              {"Inbox"}
            </li>
          )}

          {role !== "ADMIN" && (
            <li
              className={`px-2 py-4 text-left cursor-pointer flex items-center gap-1 ${
                pathname === `/dashboard/${id}`
                  ? "bg-blue-500 text-white rounded-lg"
                  : ""
              }`}
              onClick={() => handleRoute(`dashboard/${id}`)}
            >
              <MdDashboard />
              {"Dashboard"}
            </li>
          )}

          <li
            className="px-2 py-4 text-left cursor-pointer flex items-center gap-1"
            onClick={handleLogout}
          >
            <FiLogOut />
            {"Logout"}
          </li>
        </ul>

        {/* Bottom section */}
       
          <div className=" pt-4">
            <LogoutSection />
            <Theme />
          </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
