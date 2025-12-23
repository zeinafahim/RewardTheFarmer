import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text, variant = "primary", to }) => {
  const baseStyle = "rounded-md px-6 py-3 font-semibold transition-colors duration-200 ";
  const style = variant === "primary"
    ? `bg-emerald-600 text-white hover:bg-emerald-700 ${baseStyle}`
    : `bg-gray-200 text-gray-800 hover:bg-gray-300 ${baseStyle}`;

  if (to) {
    return (
      <Link to={to}>
        <button className={style}>{text}</button>
      </Link>
    );
  }

  return <button className={style}>{text}</button>;
};

export default Button;
