import React, { useState } from "react";
import { FaPlay, FaExpand, FaTimes, FaHome } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useGetLiveVideosQuery } from "../services/liveVideo";
import { LiveVideo } from "../types/liveVideo";
import { useNavigate } from "react-router-dom";

const LiveMatchList = () => {
  const { data: livematchesData, isLoading, isError } = useGetLiveVideosQuery();
  const [selectedMatch, setSelectedMatch] = useState<LiveVideo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const navigate = useNavigate();

  if (isLoading) return <Loader />;

  if (isError || !livematchesData || !livematchesData.docs) {
    return (
      <ErrorMessage message="Failed to load live matches. Please try again." />
    );
  }

  // Filter only active matches
  const activeMatches: LiveVideo[] = livematchesData.docs.filter(
    (match) => match.isActive
  );

  if (activeMatches.length === 0) {
    return (
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Blur */}
        <img
          src="/image/breadcrum.jpg"
          alt="No live matches"
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75"
        />

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 drop-shadow-xl">
            No Live Matches Available
          </h3>
          <p className="text-white text-md sm:text-lg max-w-2xl mx-auto drop-shadow-lg leading-relaxed">
            We're currently not broadcasting any matches. Please check back
            later to watch exciting live games.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-8 inline-flex items-center gap-2 px-8 py-3 bg-white/20 hover:bg-white/30 text-white font-semibold text-base sm:text-lg rounded-xl shadow-lg transition-all duration-300 backdrop-blur-sm"
          >
            <FaHome className="text-white text-lg" />
            Go to Homepage
          </button>
        </div>
      </div>
    );
  }

  const toggleModal = (match?: LiveVideo | null) => {
    if (match) {
      setSelectedMatch(match);
    }
    setIsModalOpen(!isModalOpen);
    document.body.style.overflow = isModalOpen ? "auto" : "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMatch(null);
    document.body.style.overflow = "auto";
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Extract video ID from YouTube URL
  const getVideoId = (url: string) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <>
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
                <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative uppercase">
                  WATCH LIVE MATCH
                  <div className="absolute -bottom-4 transform w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
                </h2>
                <p className="text-md md:text-md text-gray-100 font-medium max-w-2xl mx-auto leading-relaxed mt-8">
                  Experience the thrill of live matches and never miss a moment
                  of the action.
                </p>
              </div>
            </div>
          </div>

          {/* Live Section */}
          <section className="mt-16 mx-auto px-4 relative z-10">
            <div className="max-w-7xl mx-auto" data-aos="fade-up">
              {activeMatches.map((match) => {
                const videoId = getVideoId(match.videoUrl);

                return (
                  <div
                    key={match.id}
                    className="rounded-2xl overflow-hidden shadow-2xl bg-white/5 backdrop-blur-sm mb-8"
                  >
                    <div className="aspect-w-16 aspect-h-9 relative">
                      {videoId ? (
                        <iframe
                          className="w-full h-full min-h-[450px]"
                          src={`https://www.youtube.com/embed/${videoId}`}
                          title="Live Football Match"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      ) : (
                        <div className="w-full h-full min-h-[450px] bg-gray-800 flex items-center justify-center">
                          <p className="text-white text-xl">
                            Invalid YouTube URL
                          </p>
                        </div>
                      )}
                      <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-1 rounded-full text-sm font-bold tracking-wide">
                        LIVE
                      </div>
                    </div>
                    <div className="p-6 bg-gradient-to-r from-gray-400/10 to-gray-800/10">
                      <div className="flex justify-center mt-4">
                        <button
                          onClick={() => toggleModal(match)}
                          className="flex items-center justify-center px-6 py-2 sm:px-10 sm:py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium text-white text-sm sm:text-base transition-all duration-300"
                        >
                          <FaPlay className="mr-2 text-xs sm:text-sm" />
                          Watch Live
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Modal for Live Match */}
        {isModalOpen && selectedMatch && (
          <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden border">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              {/* Background overlay */}
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
                onClick={closeModal}
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
                    onClick={closeModal}
                    className="absolute top-1 right-0 z-50 bg-red-700 hover:bg-red-600 rounded-full p-1 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                    aria-label="Close modal"
                  >
                    <FaTimes className="w-4 h-4 text-white" />
                  </button>

                  <div
                    className={`w-full ${
                      isFullscreen
                        ? "h-screen"
                        : "h-[300px] sm:h-[450px] md:h-[550px] lg:h-[600px]"
                    }`}
                  >
                    {selectedMatch && getVideoId(selectedMatch.videoUrl) ? (
                      <iframe
                        className="w-full h-full"
                        src={`https://www.youtube.com/embed/${getVideoId(
                          selectedMatch.videoUrl
                        )}?autoplay=1`}
                        title="Live Football Match"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center">
                        <p className="text-white text-xl">
                          Invalid YouTube URL
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-4 sm:p-6 bg-gradient-to-r from-gray-900 to-gray-800">
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
    </>
  );
};

export default LiveMatchList;
