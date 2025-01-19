import React from "react";

const Button = ({
  content,
  background = "transparent",
  textColor = "white",
  border = "none",
  hoverShadow = false,
  rounded = false,
  padding = "px-4 py-2",
  fontWeight = "font-semibold",
  onClick,
  type
}) => {
  return (
    <button
      type={type}
      className={`${padding} ${fontWeight} ${
        background ? `bg-${background}` : ""
      } ${textColor ? `text-${textColor}` : ""} ${
        border !== "none" ? `border-${border}` : ""
      } ${hoverShadow ? "hover:shadow-lg" : ""} ${
        rounded ? "rounded-md" : ""
      } transition-all duration-200 
      hover:bg-white hover:text-black`} // Added hover styles here
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;