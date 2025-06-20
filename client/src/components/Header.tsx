import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarAlt,
  FaTable,
  FaNewspaper,
  FaTv,
  FaInfoCircle,
  FaBars,
  FaTimes,
  FaTrophy,
} from "react-icons/fa";

const Header = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome className="inline-block mr-2" /> },
    {
      name: "About",
      path: "/about",
      icon: <FaInfoCircle className="inline-block mr-2" />,
    },
    {
      name: "Teams",
      path: "/teams",
      icon: <FaUsers className="inline-block mr-2" />,
    },
    {
      name: "Fixtures",
      path: "/fixture",
      icon: <FaCalendarAlt className="inline-block mr-2" />,
    },
    {
      name: "Results",
      path: "/results",
      icon: <FaTrophy className="inline-block mr-2" />,
    },
    {
      name: "Table",
      path: "/table",
      icon: <FaTable className="inline-block mr-2" />,
    },
    {
      name: "News",
      path: "/blogs",
      icon: <FaNewspaper className="inline-block mr-2" />,
    },
  ];

  return (
    <>
      {/* Main header */}
      <header className="bg-black shadow-md sticky top-0 z-50 border-b-1 border-[#cf0b94] ">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo and title - now visible on mobile too */}
            <Link to="/" className="flex items-center group shrink-0">
              <img
                src="/nsflpink.png"
                alt="Nepal School Football League"
                className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 mr-2 sm:mr-1 object-contain"
              />
              <div className="block">
                <h1 className="text-md sm:text-xl md:text-xl font-bold text-gray-100 whitespace-nowrap ">
                  Nepal School Footabll League
                </h1>
                <p className="text-pink-600 text-xs sm:text-sm whitespace-nowrap ">
                  Developing Future Football Stars
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 text-white">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="hover:text-[#f013ac] transition-colors flex items-center"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              {/* Watch Live button */}
              <button
                className="relative overflow-hidden bg-gradient-to-r from-[#d3219e] to-[#6d084f] text-white px-4 py-1 md:px-6 md:py-1 rounded-full font-bold shadow-lg transition-all duration-500 group ml-12 animate-pulse hover:animate-none"
                onClick={() => navigate("/live-match")}
              >
                <span className="relative z-10 flex items-center">
                  <span>Watch Live</span>
                  <FaTv className="ml-2" />
                </span>
                {/* Glow effect */}
                <span className="absolute top-0 left-0 w-full h-full bg-[#f013ac] opacity-0 group-hover:opacity-0 transition-opacity duration-300"></span>
                {/* Shine effect */}
                <span className="absolute top-0 left-0 w-0 h-full bg-white opacity-0 group-hover:opacity-30 group-hover:w-full transition-all duration-700 ease-in-out"></span>
                {/* Pulsing ring */}
                <span className="absolute inset-0 border-2 border-transparent rounded-full group-hover:border-[#f013ac] group-hover:animate-ping transition-all duration-300"></span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                className="text-white focus:outline-none ml-4 "
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <FaTimes size={24} />
                ) : (
                  <FaBars size={24} />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 bg-gradient-to-b from-black to-gray-900 rounded-lg shadow-xl">
              <div className="flex flex-col space-y-3 px-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-white active:text-white active:bg-[#f013ac] active:scale-[1.02] 
                  flex items-center px-4 py-1 rounded-lg 
                  bg-gray-800 hover:bg-[#f013ac] hover:scale-[1.02] transform transition-all duration-300
                  border-l-4 border-transparent hover:border-white active:border-white"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="text-pink-400 mr-3">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}

                {/* Mobile Watch Live button - Enhanced with active state */}
                <button
                  className="relative overflow-hidden bg-gradient-to-r from-[#f013ac] to-[#9a0b6a] text-white 
                  px-6 py-2 rounded-full font-bold shadow-lg transition-all duration-500 
                  active:shadow-[0_0_20px_#f013ac] active:scale-105
                  border-2 border-transparent active:border-white
                  hover:shadow-[0_0_20px_#f013ac] hover:scale-105 hover:border-white
                  w-fit mx-auto"
                >
                  {" "}
                  {/* Added w-fit and mx-auto */}
                  <span className="relative z-10 flex items-center justify-center space-x-2">
                    <span className="font-semibold">Watch Live</span>
                    <FaTv className="transform active:scale-125 hover:scale-125 transition-transform" />
                  </span>
                  {/* Glow effect */}
                  <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 active:opacity-10 hover:opacity-10 transition-opacity duration-300"></span>
                  {/* Pulse ring */}
                  <span className="absolute inset-0 rounded-full border-2 border-transparent active:border-white active:animate-ping hover:border-white hover:animate-ping transition-all duration-1000"></span>
                  {/* Shimmer effect */}
                  <span className="absolute top-0 left-0 h-full w-0 bg-white opacity-30 active:w-full hover:w-full transition-all duration-700 ease-out"></span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
