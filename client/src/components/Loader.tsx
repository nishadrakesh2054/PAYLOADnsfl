import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" />
        <div className="w-4 h-4 bg-yellow-400 rounded-full animate-bounce delay-200" />
        <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce delay-400" />
      </div>
    </div>
  );
};

export default Loader;
