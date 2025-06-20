import React from "react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface ErrorMessageProps {
  message?: string;
  retry?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message = "Something went wrong. Please try again.",
  retry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mb-4" />
      <p className="text-xl font-semibold text-red-600 text-center mb-4">
        {message}
      </p>
      {retry && (
        <button
          onClick={retry}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
