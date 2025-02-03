import React, { useContext, useState, useEffect, useCallback } from 'react';
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
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  const handleSearchSubmit = useCallback((e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${searchQuery}`);
    }
  }, [searchQuery, navigate]);

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  return (
    <nav className={`w-full fixed top-0 left-0 z-50 transition-all duration-500 ${scrolled ? 'bg-gray-900/85 backdrop-blur-lg shadow-lg' : 'bg-gray-900/60'}`}>
      <div className="container mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-white flex items-center space-x-2 group">
          <ShoppingCart className="w-6 h-6 text-teal-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">E-Commerce</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6 text-sm">
          <Link to="/products" className="nav-link group">
            <ShoppingBag className="w-5 h-5 group-hover:text-teal-400 transition-colors duration-300" />
            <span className="ml-1">Products</span>
            <span className="nav-link-underline" />
          </Link>

          {/* No Role Restriction for these links */}
          <Link to="/dashboard" className="nav-link group">
            <span className="ml-1">Dashboard</span>
            <span className="nav-link-underline" />
          </Link>

          <Link to="/sale-analytics" className="nav-link group">
            <span className="ml-1">Sale Analytics</span>
            <span className="nav-link-underline" />
          </Link>

          {user?.role === 'customer' && (
            <>
              <Link to="/cart" className="nav-link group">
                <ShoppingCart className="w-5 h-5 group-hover:text-teal-400 transition-colors duration-300" />
                <span className="ml-1">Cart</span>
                <span className="nav-link-underline" />
              </Link>
              
              <Link to="/orders" className="nav-link group">
                <ShoppingBag className="w-5 h-5 group-hover:text-teal-400 transition-colors duration-300" />
                <span className="ml-1">Orders</span>
                <span className="nav-link-underline" />
              </Link>

              <Link to="/wishlist" className="nav-link group">
                <Heart className="w-5 h-5 group-hover:text-teal-400 transition-colors duration-300" />
                <span className="ml-1">Wishlist</span>
                <span className="nav-link-underline" />
              </Link>
            </>
          )}
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="Search products..." 
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-800/50 text-white pl-4 pr-10 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-400 placeholder-gray-400 w-64 transition-all duration-300"
            />
            <button 
              type="submit" 
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-teal-400 transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </form>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <button className="relative group">
                <Bell className="w-5 h-5 text-gray-300 group-hover:text-teal-400 transition-colors duration-300" />
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>

              <div className="flex items-center space-x-3">
                <Link to="/profile" className="group">
                  <span className="text-xs text-gray-400 block">Welcome back</span>
                  <span className="text-sm text-white group-hover:text-teal-400 transition-colors duration-300">
                    {user.username}
                  </span>
                </Link>
                <button 
                  onClick={logout}
                  className="bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg text-white
                    transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-red-500/20"
                  aria-label="Logout"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link 
                to="/login"
                className="flex items-center space-x-1 bg-teal-500/80 hover:bg-teal-600 px-4 py-2 
                  rounded-lg text-white transition-all duration-300 transform 
                  hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-teal-500/20"
              >
                <User className="w-4 h-4" />
                <span>Login</span>
              </Link>
              
              <Link 
                to="/register"
                className="flex items-center space-x-1 bg-blue-500/80 hover:bg-blue-600 px-4 py-2 
                  rounded-lg text-white transition-all duration-300 transform 
                  hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-blue-500/20"
              >
                <UserPlus className="w-4 h-4" />
                <span>Register</span>
              </Link>
            </div>
          )}

          <a 
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 bg-purple-500/80 hover:bg-purple-600 px-4 py-2 
              rounded-lg text-white transition-all duration-300 transform 
              hover:-translate-y-0.5 active:translate-y-0 shadow-lg hover:shadow-purple-500/20"
          >
            <Smartphone className="w-4 h-4" />
            <span>App</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white p-2 hover:bg-gray-800/50 rounded-lg
            transition-colors duration-300"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? (
            <X className="w-6 h-6 hover:rotate-90 transition-transform duration-300" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-gray-900/95 backdrop-blur-lg
          transform transition-all duration-300 ease-in-out border-t border-gray-800
          ${menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}
      >
        <div className="p-4 space-y-4">
          {/* Mobile Search */}
          <form onSubmit={handleSearchSubmit} className="relative">
            <input 
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full bg-gray-800/50 text-white pl-4 pr-10 py-2 rounded-lg
                border border-gray-700 focus:outline-none focus:border-teal-400
                placeholder-gray-400"
            />
            <button 
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                hover:text-teal-400 transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Mobile Navigation Links */}
          <div className="space-y-3">
            <Link 
              to="/products"
              className="flex items-center space-x-2 text-gray-300 hover:text-teal-400
                transition-colors duration-300 py-2"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Products</span>
            </Link>
            {/* No Role Restriction */}
            <Link to="/dashboard" className="nav-link group">
              <span className="ml-1">Dashboard</span>
              <span className="nav-link-underline" />
            </Link>

            <Link to="/sale-analytics" className="nav-link group">
              <span className="ml-1">Sale Analytics</span>
              <span className="nav-link-underline" />
            </Link>

            {user?.role === 'customer' && (
              <>
                <Link 
                  to="/cart"
                  className="flex items-center space-x-2 text-gray-300 hover:text-teal-400
                    transition-colors duration-300 py-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Cart</span>
                </Link>

                <Link 
                  to="/orders"
                  className="flex items-center space-x-2 text-gray-300 hover:text-teal-400
                    transition-colors duration-300 py-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span>Orders</span>
                </Link>

                <Link 
                  to="/wishlist"
                  className="flex items-center space-x-2 text-gray-300 hover:text-teal-400
                    transition-colors duration-300 py-2"
                >
                  <Heart className="w-5 h-5" />
                  <span>Wishlist</span>
                </Link>
              </>
            )}
          </div>

          {/* Mobile User Actions */}
          <div className="space-y-3 pt-3 border-t border-gray-800">
            {user ? (
              <>
                <div className="text-center">
                  <span className="text-xs text-gray-400">Logged in as</span>
                  <span className="block text-sm text-white">{user.username}</span>
                </div>
                <button 
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="w-full bg-red-500/80 hover:bg-red-600 px-4 py-2 rounded-lg
                    text-white transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link 
                  to="/login"
                  className="flex items-center justify-center space-x-2 bg-teal-500/80
                    hover:bg-teal-600 w-full px-4 py-2 rounded-lg text-white
                    transition-colors duration-300"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>

                <Link 
                  to="/register"
                  className="flex items-center justify-center space-x-2 bg-blue-500/80
                    hover:bg-blue-600 w-full px-4 py-2 rounded-lg text-white
                    transition-colors duration-300"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Register</span>
                </Link>
              </div>
            )}

            <a 
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 bg-purple-500/80
                hover:bg-purple-600 w-full px-4 py-2 rounded-lg text-white
                transition-colors duration-300"
            >
              <Smartphone className="w-4 h-4" />
              <span>Download App</span>
            </a>
          </div>
        </div>
      </div>

      {/* Add global styles for nav-link class */}
      <style>{`
        .nav-link {
          display: flex;
          align-items: center;
          color: #e5e7eb;
          position: relative;
          padding: 0.5rem 0;
        }

        .nav-link-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(to right, #2dd4bf, #60a5fa);
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #2dd4bf;
        }

        .nav-link:hover .nav-link-underline {
          width: 100%;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
