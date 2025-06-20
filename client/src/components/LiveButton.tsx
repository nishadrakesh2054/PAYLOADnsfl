import React from "react";

type ButtonProps = {
  title: string;
  onClick?: () => void;
};

const LiveButton: React.FC<ButtonProps> = ({ title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-gradient-to-r to-[#000000] from-[#f013ac] text-white font-semibold px-5 py-2 rounded-full hover:to-[#f013ac] hover:from-[#0000] transition-all duration-300 shadow-md"    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="size-5 group-hover:scale-110 transition-transform duration-300"
      >
        <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h8.25a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3H4.5ZM19.94 18.75l-2.69-2.69V7.94l2.69-2.69c.944-.945 2.56-.276 2.56 1.06v11.38c0 1.336-1.616 2.005-2.56 1.06Z" />
      </svg>
      <span>{title}</span>
    </button>
  );
};

export default LiveButton;
