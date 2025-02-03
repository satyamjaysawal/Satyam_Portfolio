import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  ShoppingCart, 
  Menu, 
  X, 
  Bell, 
  ShoppingBag,
  User,
  Heart,
  Smartphone,
  UserPlus,
  KeyRound,
  Search
} from "lucide-react";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);  // Get user from AuthContext
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  // New search state
  const location = useLocation();
  const navigate = useNavigate();  // Navigate for redirecting on search

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/products?search=${searchQuery}`);  // Redirect with search query as URL parameter
    } else {
      // If search query is empty, reset or close search
      navigate('/products');  // You can change this logic as per your needs
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-300
      ${scrolled 
        ? 'bg-blue-900/95 backdrop-blur-lg shadow-lg'  // Changed to eCommerce Blue
        : 'bg-blue-800/80'}`}>  {/* Adjusted background for normal state */}

      <div className="container mx-auto flex justify-between items-center px-5 py-3">
        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-extrabold text-white flex items-center space-x-2 group"
        >
          <ShoppingCart className="w-6 h-6 group-hover:rotate-12 transition-transform" />
          <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent text-xl">
            E-Commerce
          </span>
        </Link>

        {/* Left-aligned Navigation Links with Icons */}
        <div className="flex items-center space-x-5 text-sm text-white">
          <Link 
            to="/products" 
            className="flex items-center hover:text-teal-300 transition-all relative group"
          >
            <ShoppingBag className="w-5 h-5 mr-1" /> 
            Products
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 transition-all group-hover:w-full" />
          </Link>
          {user && (  // Show cart, orders, wishlist only if the user is logged in
            <>
              <Link 
                to="/cart" 
                className="flex items-center hover:text-teal-300 transition-all relative group"
              >
                <ShoppingCart className="w-5 h-5 mr-1" /> 
                Cart
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 transition-all group-hover:w-full" />
              </Link>
              <Link 
                to="/orders" 
                className="flex items-center hover:text-teal-300 transition-all relative group"
              >
                <ShoppingBag className="w-5 h-5 mr-1" /> 
                Orders
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 transition-all group-hover:w-full" />
              </Link>
              {/* Wishlist Link */}
              <Link 
                to="/wishlist" 
                className="flex items-center hover:text-teal-300 transition-all relative group"
              >
                <Heart className="w-5 h-5 mr-1" /> 
                Wishlist
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-300 transition-all group-hover:w-full" />
              </Link>
            </>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery} 
            onChange={handleSearchChange} 
            className="bg-white text-gray-700 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
          <button type="submit" className="text-teal-600">
            <Search className="w-5 h-5" />
          </button>
        </form>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <>
              {/* Notifications */}
              <button className="text-white hover:text-teal-300 transition-colors p-2 relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-2">
                {/* Display username only when the user is logged in */}
                <Link to="/profile" className="text-white text-sm font-medium hover:text-teal-300">
                  <span className="text-xs text-gray-300">Welcome back,</span>
                  <span>{user.username}</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="bg-red-600/90 hover:bg-red-700 px-3 py-1.5 rounded-lg transition-all shadow-lg
                    hover:shadow-red-500/20 hover:-translate-y-0.5 active:translate-y-0"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="bg-teal-600/90 hover:bg-teal-700 px-3 py-1.5 rounded-lg transition-all shadow-lg
                  hover:shadow-teal-500/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600/90 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-all shadow-lg
                    hover:shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1"
              >
                <UserPlus className="w-4 h-4" />
                Register
              </Link>
            </>
          )}
          {/* Mobile App Download Button */}
          <a 
            href="#"  // Replace with actual link
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg transition-all shadow-lg text-white flex items-center"
            >
            <Smartphone className="w-5 h-5 mr-1" />
            <span className="text-sm">App</span>
            </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <X className="w-7 h-7 hover:rotate-90 transition-transform" />
          ) : (
            <Menu className="w-7 h-7" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-blue-900/95 backdrop-blur-lg absolute top-full left-0 w-full 
          transform transition-all duration-300 ease-in-out ${menuOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className="p-5 flex flex-col items-center space-y-3">
          <Link 
            to="/products" 
            className="text-white text-sm hover:text-teal-300 transition-all w-full text-center py-2"
          >
            Products
          </Link>
          
          {user && (
            <>
              <Link 
                to="/cart" 
                className="text-white text-sm hover:text-teal-300 transition-all w-full text-center py-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Cart
                </div>
              </Link>
              <Link 
                to="/orders" 
                className="text-white text-sm hover:text-teal-300 transition-all w-full text-center py-2"
              >
                Orders
              </Link>
              {/* Wishlist Link in Mobile Menu */}
              <Link 
                to="/wishlist" 
                className="text-white text-sm hover:text-teal-300 transition-all w-full text-center py-2"
              >
                <div className="flex items-center justify-center gap-2">
                  <Heart className="w-5 h-5" />
                  Wishlist
                </div>
              </Link>
            </>
          )}

          {!user ? (
            <div className="w-full space-y-2">
              <Link 
                to="/login" 
                className="bg-teal-600/90 hover:bg-teal-700 px-3 py-1.5 rounded-lg transition-all shadow-lg
                  w-full flex items-center justify-center gap-1"
              >
                <User className="w-4 h-4" />
                Login
              </Link>
              <Link 
                to="/register" 
                className="bg-green-600/90 hover:bg-green-700 px-3 py-1.5 rounded-lg transition-all shadow-lg
                hover:shadow-green-500/20 hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1"
              >
                <KeyRound className="w-4 h-4" />
                Register
              </Link>
            </div>
          ) : (
            <div className="w-full space-y-3">
              <div className="text-center">
                <span className="text-xs text-gray-300">Logged in as</span>
                <span className="block text-sm font-medium text-white">{user.username}</span>
              </div>
              <button 
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }} 
                className="bg-red-600/90 hover:bg-red-700 px-3 py-1.5 rounded-lg transition-all shadow-lg w-full"
              >
                Logout
              </button>
            </div>
          )}
          {/* Mobile App Download Button */}
          <a 
            href="https://example.com/download"  // Replace with actual link
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-purple-600 hover:bg-purple-700 px-3 py-1.5 rounded-lg transition-all shadow-lg text-white w-full text-center"
          >
            <Smartphone className="w-5 h-5 mr-1" /> Download App
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
