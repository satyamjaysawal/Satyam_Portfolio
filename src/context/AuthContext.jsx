import { createContext, useState, useEffect } from "react";
import { getUserProfile } from "../api/api"; // Assuming this is the API function to fetch the user's profile

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores the user profile
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Stores the auth token
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch the user profile when the token is available
  useEffect(() => {
    if (token) {
      // Check if token exists before trying to fetch the profile
      getUserProfile(token)
        .then((data) => {
          // If the token is valid, set the user data
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          setUser(null);
          setToken(null);
          localStorage.removeItem("token"); // Clear token if the user profile is invalid
        })
        .finally(() => setLoading(false)); // Once done, set loading to false
    } else {
      // If no token, stop loading
      setLoading(false);
    }
  }, [token]); // Depend on token to refetch when it's changed

  // Login function to store the token and user profile
  const login = (newToken, userData) => {
    localStorage.setItem("token", newToken); // Store the token in local storage
    setToken(newToken); // Set the token in state
    setUser(userData); // Set the user profile in state
  };

  // Logout function to clear the token and user profile
  const logout = () => {
    localStorage.removeItem("token"); // Remove the token from local storage
    setToken(null); // Clear the token from state
    setUser(null); // Clear the user profile from state
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
