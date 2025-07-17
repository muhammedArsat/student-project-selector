import React from "react";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";

const Paging = ({ curr, total, handlePrevious, handleNext }) => {
  return (
    <div className="flex justify-center items-center w-full">
      <span className="cursor-pointer">
        <FaCaretLeft size={24} />
      </span>
      <span className="font-lexend text-body">
        {curr || 10} / <span className="text-gray-400">{total || 50}</span>
      </span>
      <span className="cursor-pointer">
        <FaCaretRight size={24} />
      </span>
    </div>
  );
};

export default Paging;
