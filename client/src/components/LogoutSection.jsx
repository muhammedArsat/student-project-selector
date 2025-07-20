import React, { useContext } from "react";
import Fallback from "../assets/default_profile.png";
import AuthContext from "../hooks/AuthContext";
const LogoutSection = () => {
  const { email, profile } = useContext(AuthContext);
  return (
    <div className="flex justify-between items-center ">
      <img
        src={profile ? profile : Fallback}
        alt=""
        onError={(e) => {
          e.target.onError = null;
          e.target.src = Fallback;
        }}
        className="rounded-full w-[40px] h-[40px] object-cover shrink-0"
      
      />
      <p className="font-lexend break-words w-[175px] truncate">{email || "user@gmail.com"}</p>
    </div>
  );
};

export default LogoutSection;
