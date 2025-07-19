import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

const SideBarLayout = () => {
  return (
    <div className="flex flex-col sm:flex-row ">
      {/* Fixed Navbar on mobile */}
      <div className=" flex-shrink">
        <Navbar />
      </div>

      {/* Main content layout */}

      <main className=" sm:mt-10 sm:ml-10 w-full sm:w-[90%] pr-2  ">
        <Outlet />
      </main>
    </div>
  );
};

export default SideBarLayout;
