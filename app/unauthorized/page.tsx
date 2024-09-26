import Link from "next/link";
import React from "react";

const UnauthorizedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Sorry, you are not authorized to view this page. Please contact the
          administrator if you believe this is an error.
        </p>
        <div className="flex justify-center">
          <Link
            href="/"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
