import React, { useContext } from "react";
import ThemeContext from "../hooks/ThemeContext";
const Theme = () => {
  const { isDark, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="flex justify-between items-center gap-2 shadow-lg rounded-full py-3 px-3 relative dark:shadow-darkCard transition-all duration-500 overflow-hidden w-[220px]">
      <span
        className={`absolute w-[110px] h-[50px] bg-white  rounded-full shadow-md transition-all duration-700 dark:bg-dark-bg dark:shadow-darkCard flex justify-center items-center z-10 ${
          isDark ? "left-1/2" : "left-0"
        }`}
      >
        {/* {isDark?"Dark Mode":"Light Mode"} */}
      </span>
      <p className="w-1/2 text-[12px] sm:text-[15px] cursor-pointer z-20 font-lexend" onClick={toggleTheme}>
        Light Mode
      </p>
      <p className="w-1/2 text-[12px] sm:text-[15px] cursor-pointer z-20 text-center font-lexend" onClick={toggleTheme}>
        Dark Mode
      </p>
    </div>
  );
};

export default Theme;
