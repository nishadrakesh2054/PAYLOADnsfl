import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
      {/* Background Image */}
      <div className="relative w-full h-80 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg overflow-hidden mb-10">
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold text-white mb-4">404</h1>
          <p className="text-xl text-gray-300 mb-4">Oops! Page Not Found</p>
        </div>
      </div>

      {/* Message and Button */}
      <p className="text-lg text-gray-700 mb-8 max-w-lg">
        It seems like the page you're looking for doesn't exist or has been moved.
      </p>
      
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 ease-in-out group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300" />
        Back to Home
      </button>
    </div>
  );
};

export default NotFound;
