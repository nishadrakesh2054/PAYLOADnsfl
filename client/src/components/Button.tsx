import React from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-gradient-to-r from-[#000000] to-[#f013ac] text-white font-semibold px-5 py-2 rounded-full hover:from-[#f013ac] hover:to-[#000000] transition-all duration-300 shadow-md"
    >
      <span>{title}</span>
      <img
        src="/image/button-img.png"
        alt="arrow"
        className="w-4 h-3 object-contain"
      />
    </button>
  );
};

export default Button;
