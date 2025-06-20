import React from "react";
import { FaTimes } from "react-icons/fa";
import { Highlight, HighlightModalProps } from "../types/highlights";
const HighlightModal: React.FC<HighlightModalProps> = ({
  highlight,
  onClose,
}) => {
  if (!highlight) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 px-3 flex items-center justify-center bg-black/80 backdrop-blur-md transition-all duration-300"
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            className="absolute top-3 right-3 bg-red-600 text-white rounded-full p-3 hover:bg-red-700 transition-all duration-200 z-50"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            <FaTimes />
          </button>

          <div className="aspect-video w-full">
          <iframe
                  className="w-full h-full"
              src={`https://www.youtube.com/embed/${highlight.videoId}`}
              title={highlight.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Highlight Info */}
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              {highlight.title}
            </h2>
            <p className="text-gray-600 mb-4">{highlight.description}</p>
            <span className="text-sm text-gray-500">
              Duration: {highlight.duration}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HighlightModal;
