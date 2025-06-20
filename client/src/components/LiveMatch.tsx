import React, { useState } from "react";
import { FaPlay, FaExpand, FaTimes } from "react-icons/fa";

const LiveMatch = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const liveMatches = [
    {
      id: 1,
      teamA: "Gems",
      teamB: "Thunderbolts",
      status: "Live",
      viewers: "2.4M watching",
      teamALogo: "/image/img-03.png",
      teamBLogo: "/image/img-04.png",
    },
  ];

  const featuredMatch = liveMatches[0];

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Parallax */}
      <div
        className="parallax-bg py-20 bg-fixed bg-cover bg-center relative"
        style={{ backgroundImage: "url('/image/parallex.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative  uppercase">
                WATCH LIVE MATCH
                <div className="absolute -bottom-4  transform  w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
              </h2>

              <p className="text-md md:text-md text-gray-100 font-medium max-w-2xl mx-auto leading-relaxed mt-8 ">
                Experience the thrill of live matches and never miss a moment of
                the action
              </p>
            </div>
          </div>
        </div>

        {/* Live Section */}
        <section className="mt-16 mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto" data-aos="fade-up">
            <div className="rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm">
              <div className="aspect-w-16 aspect-h-9 relative">
                <iframe
                  className="w-full h-full min-h-[450px]"
                  src="https://www.youtube.com/embed/7xmP5Ri1eKk?si=AYVfDzSMg9IUx8c7"
                  title="Live Match Stream"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                  LIVE
                </div>
              </div>
              <div
                className="p-6 bg-gradient-to-r from-gray-400/10 to-gray-800/10"
                data-aos="fade-up"
              >
                <div className="flex items-center justify-center gap-2 sm:gap-8 mb-4 sm:mb-6 overflow-x-auto whitespace-nowrap w-full px-2">
                  {/* Team A */}
                  <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                    <img
                      src={featuredMatch.teamALogo}
                      alt={featuredMatch.teamA}
                      className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                    />
                    <span className="text-sm sm:text-xl font-bold text-white uppercase">
                      {featuredMatch.teamA}
                    </span>
                  </div>

                  {/* VS Badge */}
                  <span className="text-xs sm:text-sm font-semibold text-white bg-white/20 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md tracking-wide shrink-0">
                    VS
                  </span>

                  {/* Team B */}
                  <div className="flex items-center gap-1 sm:gap-3 shrink-0">
                    <img
                      src={featuredMatch.teamBLogo}
                      alt={featuredMatch.teamB}
                      className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
                    />
                    <span className="text-sm sm:text-xl font-bold text-white uppercase">
                      {featuredMatch.teamB}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-4">
                  <button
                    onClick={toggleModal}
                    className="flex items-center justify-center px-6 py-2 sm:px-10 sm:py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium text-white text-sm sm:text-base transition-all duration-300"
                  >
                    <FaPlay className="mr-2 text-xs sm:text-sm" />
                    Watch Live
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Modal for Live Match */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden border">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={toggleModal}
            >
              <div className="absolute inset-0 bg-black opacity-90"></div>
            </div>

            {/* Modal content */}
            <div
              className={`inline-block align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle ${
                isFullscreen
                  ? "w-full h-full max-w-none"
                  : "sm:max-w-4xl w-full"
              }`}
            >
              <div className="relative bg-black">
                <button
                  onClick={toggleModal}
                  className="absolute top-1 right-0 z-50 bg-red-700 hover:bg-red-600 rounded-full p-1 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                  aria-label="Close modal"
                >
                  <FaTimes className="w-4 h-4 text-white" />
                </button>

                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    className={`w-full ${
                      isFullscreen ? "h-screen" : "h-[500px] sm:h-[600px]"
                    }`}
                    src="https://www.youtube.com/embed/7xmP5Ri1eKk?si=AYVfDzSMg9IUx8c7&autoplay=1"
                    title="Live Match Stream"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-900 to-gray-800">
                  <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 mb-4">
                    {/* Team A */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={featuredMatch.teamALogo}
                        alt={featuredMatch.teamA}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                      />
                      <span className="text-lg sm:text-xl font-bold text-white uppercase">
                        {featuredMatch.teamA}
                      </span>
                    </div>

                    {/* VS Badge */}
                    <span className="text-xs sm:text-sm font-semibold text-white bg-white/20 px-3 py-1 rounded-full shadow-md tracking-wide">
                      VS
                    </span>

                    {/* Team B */}
                    <div className="flex items-center gap-2 sm:gap-3">
                      <img
                        src={featuredMatch.teamBLogo}
                        alt={featuredMatch.teamB}
                        className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                      />
                      <span className="text-lg sm:text-xl font-bold text-white uppercase">
                        {featuredMatch.teamB}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-center mt-4">
                    <button
                      onClick={toggleFullscreen}
                      className="flex items-center justify-center px-6 py-2 sm:px-8 sm:py-2 bg-white/10 hover:bg-white/20 rounded-lg font-medium text-white text-sm sm:text-base transition-all duration-300"
                    >
                      <FaExpand className="mr-2 text-xs sm:text-sm" />
                      {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveMatch;
