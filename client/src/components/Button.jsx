import React from "react";

const Button = ({ children, width, handleClick, type  }) => {
  return (
    <button
      className={`button-base ${width === "90" ? "sm:w-[90%]" : ""}`}
      onClick={handleClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
