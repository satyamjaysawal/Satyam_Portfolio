import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl text-gray-600 mt-2">Oops! Page not found.</p>
      <p className="text-gray-500 mt-2">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded shadow-lg hover:bg-blue-700"
      >
        🔙 Go Home
      </Link>
    </div>
  );
};

export default NotFound;
