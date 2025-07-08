import { Link } from "react-router";


const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-center px-6">
      <h1 className="text-7xl font-bold text-[#00705c] mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">
        Page Not Found
      </p>
      <p className="text-gray-600 mb-6">
        Sorry, the page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        to="/"
        className="bg-primary hover:bg-[#005e4e] text-white font-medium px-6 py-2 rounded"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
