import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { login } from "../api/api";
import { Shield, Loader2, Eye, EyeOff, Clock } from "lucide-react";

const Login = () => {
  const { login: authLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // State for countdown timer
  const [timer, setTimer] = useState(90); // 1:30 in seconds
  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    // Check if the timer start time is already stored in localStorage
    const startTime = localStorage.getItem("serverStartTime");

    if (!startTime) {
      // If no start time exists, set it for the first time
      const currentStartTime = Date.now();
      localStorage.setItem("serverStartTime", currentStartTime.toString());
    }

    // Calculate remaining time on page load based on the server start time
    const calculateRemainingTime = () => {
      const startTime = parseInt(localStorage.getItem("serverStartTime"), 10);
      const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
      const remainingTime = 90 - elapsedTime;

      if (remainingTime <= 0) {
        setTimer(0);
        setTimerActive(false);
      } else {
        setTimer(remainingTime);
        setTimerActive(true);
      }
    };

    // Recalculate the remaining time every second if the timer is active
    if (timerActive) {
      const interval = setInterval(() => {
        calculateRemainingTime();
      }, 1000);

      return () => clearInterval(interval); // Cleanup on component unmount
    }

  }, [timerActive]);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await login(credentials.username, credentials.password);
      authLogin(response.access_token, response);

      if (response.role === "admin" || response.role === "vendor") {
        navigate("/dashboard");
      } else if (location.state?.from) {
        navigate(location.state.from);
      } else if (localStorage.getItem("cartItems")) {
        navigate("/cart");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.detail || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  // Convert seconds to minutes and seconds format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Render timer with enhanced styling
  const renderTimer = () => {
    const progress = ((90 - timer) / 90) * 100;
    return (
      <div className="relative w-full bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 overflow-hidden">
        {/* Animated progress bar */}
        <div 
          className="absolute left-0 top-0 h-full bg-yellow-500/30 transition-all duration-500 ease-linear" 
          style={{ width: `${progress}%` }}
        />
        
        {/* Timer content */}
        <div className="relative z-10 flex items-center space-x-3">
          <Clock className="w-5 h-5 text-yellow-300 animate-pulse" />
          <div className="flex-grow">
            <p className="text-yellow-200 text-xs font-medium">
              Server Startup in Progress
            </p>
            <p className="text-yellow-100 text-sm font-bold">
              {formatTime(timer)}
            </p>
          </div>
          <div className="text-xs text-yellow-300 opacity-70">
            Please wait
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800">
      <div className="flex-grow flex items-center justify-center px-4 mt-16">
        <div className="w-full max-w-lg p-6 space-y-4 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 shadow-lg">
          
          {/* Enhanced Timer Component */}
          {timerActive && renderTimer()}

          {/* Logo & Header */}
          <div className="text-center space-y-1">
            <div className="flex justify-center">
              <div className="p-2 bg-indigo-600 rounded-xl inline-flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
              Welcome Back
            </h1>
            <p className="text-gray-300 text-sm">Sign in to continue</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-2 bg-red-500/20 border border-red-500/50 rounded-lg text-center">
              <p className="text-red-200 text-xs">{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label 
                className="text-xs font-medium text-gray-200 cursor-pointer" 
                htmlFor="username"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                autoComplete="username"
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label 
                className="text-xs font-medium text-gray-200 cursor-pointer" 
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-md text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-md transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <span>Sign in</span>
              )}
            </button>
          </form>

          {/* Dummy Users Table */}
          <div className="pt-4 text-center">
            <p className="text-gray-300 text-xs">Use the following credentials for easy login:</p>
            <table className="mx-auto mt-2 text-gray-300 text-xs">
              <thead>
                <tr>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Password</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2">Customer</td>
                  <td className="px-4 py-2">customer</td>
                  <td className="px-4 py-2">customer</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Vendor</td>
                  <td className="px-4 py-2">vendor</td>
                  <td className="px-4 py-2">vendor</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Admin</td>
                  <td className="px-4 py-2">admin</td>
                  <td className="px-4 py-2">admin</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="pt-2 text-center">
            <p className="text-gray-300 text-xs">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
              >
                Create account
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
