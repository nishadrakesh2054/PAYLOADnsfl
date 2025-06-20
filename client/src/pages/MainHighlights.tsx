import React, { useState, useMemo } from "react";
import { FaPlay, FaEye, FaCalendarAlt } from "react-icons/fa";
import ErrorMessage from "../components/ErrorMessage";
import Loader from "../components/Loader";
import { useGetHighlightsQuery } from "../services/highlights";
import { Highlight, HighlightModalProps } from "../types/highlights";
import HighlightModal from "../components/HighlightModal";
import ReactPaginate from "react-paginate";
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const ITEMS_PER_PAGE = 6;

const MainHighlights = () => {
  const [filter, setFilter] = useState("recent");
  const [selectedHighlight, setSelectedHighlight] = useState<Highlight | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(0);

  const { data: highlightsData, isLoading, isError } = useGetHighlightsQuery();

  const filteredHighlights = useMemo(() => {
    if (!highlightsData?.docs) return [];

    const highlights = highlightsData.docs.map((highlight) => ({
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

    switch (filter) {
      case "recent":
        return highlights.sort(
          (a, b) =>
            new Date(b.publishedDate).getTime() -
            new Date(a.publishedDate).getTime()
        );
      case "mostViewed":
        return highlights.sort((a, b) => b.views - a.views);
      case "longest":
        return highlights.sort((a, b) => {
          const [minA, secA] = a.duration.split(":").map(Number);
          const [minB, secB] = b.duration.split(":").map(Number);
          return minB * 60 + secB - (minA * 60 + secA);
        });
      default:
        return highlights;
    }
  }, [highlightsData, filter]);
  const pageCount = Math.ceil(filteredHighlights.length / ITEMS_PER_PAGE);
  const offset = currentPage * ITEMS_PER_PAGE;
  const currentItems = filteredHighlights.slice(
    offset,
    offset + ITEMS_PER_PAGE
  );

  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  if (isLoading) return <Loader />;
  if (isError || !highlightsData?.docs) {
    return (
      <ErrorMessage message="Failed to load highlights. Please try again." />
    );
  }
  return (
    <>
      <div
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.7)), url('/image/about.jpeg')",
        }}
      >
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            NSFL Highlights
          </h1>
          <div className="text-white flex justify-center items-center space-x-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-pink-700">Highlights</span>
          </div>
        </div>
      </div>
      <div className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          {/* Page Header */}

          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-8 md:gap-12">
            {/* Section Title */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-[#f013ac] tracking-tight relative ">
                MATCH&nbsp;HIGHLIGHTS
                <div className="absolute -bottom-4  transform  w-32 h-1 bg-gradient-to-r from-[#f013ac] to-[#000000] rounded-full"></div>
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => setFilter("recent")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center ${
                  filter === "recent"
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <FaCalendarAlt className="mr-2" /> Recent
              </button>
              <button
                onClick={() => setFilter("mostViewed")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center ${
                  filter === "mostViewed"
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <FaEye className="mr-2" /> Most Viewed
              </button>
              <button
                onClick={() => setFilter("longest")}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center ${
                  filter === "longest"
                    ? "bg-red-600 text-white shadow-md"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }`}
              >
                <FaPlay className="mr-2" /> Longest
              </button>
            </div>
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((highlight) => (
              <div
                key={highlight.id}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Image container with all hover effects */}
                <div className="relative h-60 overflow-hidden">
                  <div className="relative h-full w-full transform transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-110">
                    <img
                      src={highlight.imageUrl}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-500"></div>

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 ease-out">
                      <FaPlay className="text-white text-xl ml-1 transition-transform group-hover:scale-110 duration-200" />
                    </div>
                  </div>

                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold transform transition-transform duration-300 group-hover:scale-105 flex items-center">
                      <FaPlay className="mr-1" /> {highlight.duration}
                    </span>
                    <span className="bg-black/70 text-white text-xs px-2 py-1 rounded-full flex items-center transform transition-transform duration-300 group-hover:scale-105">
                      <FaEye className="mr-1" />{" "}
                      {highlight.views.toLocaleString()}
                    </span>
                    <span className="bg-white/90 text-gray-800 text-xs px-2 py-1 rounded-full flex items-center transform transition-transform duration-300 group-hover:scale-105">
                      <FaCalendarAlt className="mr-1" /> {highlight.date}
                    </span>
                  </div>

                  {/* Competition badge */}
                </div>

                <div className="p-6 transition-all duration-300 group-hover:bg-gray-50">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 transition-colors duration-300 group-hover:text-red-600">
                    {highlight.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {highlight.description.slice(0, 50)}
                  </p>

                  <button
                    onClick={() => setSelectedHighlight(highlight)}
                    className="w-full py-3 bg-gray-100 hover:bg-red-600 hover:text-white text-gray-800 rounded-lg font-medium flex items-center justify-center transition-all duration-300"
                  >
                    <FaPlay className="mr-2 text-red-600 transition-transform duration-300 group-hover:translate-x-1" />
                    Watch Full Highlight
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="mt-16 flex justify-center">
            <ReactPaginate
              pageCount={pageCount}
              onPageChange={handlePageClick}
              previousLabel={<span className="text-xl">&laquo;</span>}
              nextLabel={<span className="text-xl">&raquo;</span>}
              breakLabel="..."
              containerClassName="inline-flex items-center justify-center gap-2 flex-wrap"
              pageClassName="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition duration-300 hover:bg-red-100 hover:text-red-600"
              activeClassName="bg-red-600 text-white border-transparent"
              previousClassName="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-600"
              nextClassName="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-red-100 hover:text-red-600"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakClassName="px-3 py-2 text-gray-500"
            />
          </div>
        </div>
      </div>

      {/* Modal */}
      <HighlightModal
        highlight={selectedHighlight}
        onClose={() => setSelectedHighlight(null)}
      />
    </>
  );
};

export default MainHighlights;
