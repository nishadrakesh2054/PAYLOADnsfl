import React, { useState } from "react";
import { FaPlay, FaEye, FaCalendarAlt } from "react-icons/fa";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import HighlightModal from "./HighlightModal";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";
import { useGetHighlightsQuery } from "../services/highlights";
import { Highlight, HighlightModalProps } from "../types/highlights";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const Highlights = () => {
  const navigate = useNavigate();
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(
    null
  );
  const { data: highlightsData, isLoading, isError } = useGetHighlightsQuery();

  if (isLoading) return <Loader />;
  if (isError || !highlightsData?.docs) {
    return (
      <ErrorMessage message="Failed to load highlights. Please try again." />
    );
  }

  const highlights = highlightsData.docs
    //   .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)
    .map((highlight) => ({
      ...highlight,
      imageUrl: highlight.image
        ? `${BASE_URL}/${highlight.image.url}`
        : "/default-highlights.png",
      date: new Date(highlight.publishedDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    }));

  console.log("highlight data", highlights);

  return (
    <>
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative ">
                MATCH&nbsp; HIGHLIGHTS
                <div className="absolute -bottom-4  transform  w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
              </h2>

              <p className="text-md md:text-md text-gray-800 font-medium max-w-2xl mx-auto leading-relaxed mt-8 ">
                Relive the most exciting moments from recent matches
              </p>
            </div>

            <Button
              title="View All Highlights"
              onClick={() => navigate("/highlights")}
            />
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {highlights.length > 0 ? (
              highlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className="group relative bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  {/* Image container with all hover effects */}
                  <div className="relative h-60 overflow-hidden">
                    {/* Image with smooth zoom */}
                    <div className="relative h-full w-full transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110">
                      <img
                        src={highlight.imageUrl}
                        alt={highlight.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Gradient overlay - slightly darker on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500"></div>

                    {/* Play button - smoother entrance */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center 
              transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 
              transition-all duration-500 ease-out"
                      >
                        <FaPlay className="text-white text-xl ml-1 transition-transform group-hover:scale-110 duration-200" />
                      </div>
                    </div>

                    {/* Top badges */}
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <span
                        className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold 
              transform transition-transform duration-300 group-hover:scale-105"
                      >
                        {highlight.duration}
                      </span>
                      <span
                        className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center
              transform transition-transform duration-300 group-hover:scale-105"
                      >
                        <FaEye className="mr-1" />{" "}
                        {highlight.views.toLocaleString()}
                      </span>
                    </div>

                    {/* Date badge */}
                    <div
                      className="absolute bottom-4 left-4 bg-white/90 text-gray-800 text-xs px-3 py-1 rounded-full flex items-center
            transform transition-transform duration-300 group-hover:scale-105"
                    >
                      <FaCalendarAlt className="mr-1" /> {highlight.date}
                    </div>
                  </div>

                  {/* Content section */}
                  <div className="p-6 transition-all duration-300 group-hover:bg-gray-50">
                    <h3
                      className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 
            transition-colors duration-300 group-hover:text-red-600"
                    >
                      {highlight.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2 font-poppins">
                      {highlight.description.slice(0, 50)}...
                    </p>
                    <button
                      onClick={() => setSelectedHighlight(highlight)}
                      className="w-full py-3 bg-gray-100 hover:bg-red-500 hover:text-white 
            text-gray-800 rounded-lg font-medium flex items-center justify-center 
            transition-all duration-300 group-[.highlight-card]:hover:bg-red-500 "
                    >
                      <FaPlay className="mr-2 transition-transform text-red-600  duration-300 group-hover:translate-x-1 hover:text-white" />
                      Watch Highlight
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 font-medium py-12">
                No highlights available at the moment.
              </div>
            )}
          </div>
        </div>
      </section>
      {/* Modal */}
      <HighlightModal
        highlight={selectedHighlight}
        onClose={() => setSelectedHighlight(null)}
      />
    </>
  );
};

export default Highlights;
