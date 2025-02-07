import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { RetryTimerContext } from "../context/RetryTimerContext";
import { Loader2, Package } from "lucide-react";

const RetryTimerOverlay = () => {
  const { retryTimer, isServerDown } = useContext(RetryTimerContext);
  const location = useLocation();

  // Define Routes where Retry Timer should be visible
  const allowedRoutes = ["/", "/home", "/navbar", "/login", "/register", "/products", "/products/:productId"];

  // Return null if server is not down or the current route is not in allowedRoutes
  if (!isServerDown || !allowedRoutes.includes(location.pathname)) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center border border-gray-700">
        <div className="relative w-32 h-32 mx-auto">
          <svg className="absolute inset-0 transform -rotate-90 w-32 h-32">
            <circle cx="64" cy="64" r="60" stroke="gray" strokeWidth="8" fill="transparent" />
            <circle
              cx="64"
              cy="64"
              r="60"
              stroke="blue"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={`${2 * Math.PI * 60}`}
              strokeDashoffset={`${((100 - (retryTimer / 45) * 100) / 100) * (2 * Math.PI * 60)}`}
              style={{ transition: "stroke-dashoffset 0.5s ease" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{retryTimer}</span>
            <span className="text-sm text-gray-400">seconds</span>
          </div>
        </div>

        <div className="mt-4">
          <Loader2 className="w-6 h-6 text-blue-400 animate-spin mx-auto mb-2" />
          <p className="text-gray-300 text-lg">Server is starting up...</p>
          <p className="text-gray-400 text-sm mt-2">Please wait while we reconnect</p>
        </div>
      </div>
    </div>
  );
};

export default RetryTimerOverlay;
