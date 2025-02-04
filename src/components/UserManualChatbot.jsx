import React, { useState } from 'react';
import { Book, X, HelpCircle, Search, Heart, ShoppingCart, User, CreditCard, Package, Settings } from 'lucide-react';

const UserManualChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('frontend');
  const [activeSubsection, setActiveSubsection] = useState(null);

  const sections = {
    frontend: [
      {
        title: 'Registering and Logging In',
        icon: User,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Registration Process</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Navigate to the Sign Up page</li>
              <li>Complete registration form with:
                <ul className="list-disc pl-5">
                  <li>Username</li>
                  <li>Email Address</li>
                  <li>Password</li>
                  <li>Phone Number</li>
                </ul>
              </li>
              <li>Click 'Register' to create account</li>
            </ol>
            <h3 className="text-lg font-semibold mt-6 mb-4 text-indigo-700">Login Process</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Go to Login page</li>
              <li>Enter Username and Password</li>
              <li>Click 'Login' to access account</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Browsing Products',
        icon: Search,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Product Discovery</h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li><strong>Categories:</strong> Browse products by category (Electronics, Clothing, Home Goods)</li>
              <li><strong>Search Bar:</strong> Find specific products by name or category</li>
              <li><strong>Filters Available:</strong>
                <ul className="list-disc pl-5">
                  <li>Price (Low to High / High to Low)</li>
                  <li>Rating (1 to 5 stars)</li>
                  <li>Product Category</li>
                </ul>
              </li>
            </ul>
          </div>
        )
      },
      {
        title: 'Cart & Wishlist',
        icon: Heart,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Adding to Cart</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Go to product details page</li>
              <li>Select quantity</li>
              <li>Click 'Add to Cart'</li>
            </ol>
            <h3 className="text-lg font-semibold mt-6 mb-4 text-indigo-700">Adding to Wishlist</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Click heart icon next to product</li>
              <li>Item saved for future reference</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Placing an Order',
        icon: ShoppingCart,
        content: (
          <div>
            <ol className="space-y-3 list-decimal pl-5 text-gray-700 text-sm">
              <li>View Cart by clicking cart icon</li>
              <li>Review products and quantities</li>
              <li>Click 'Proceed to Checkout'</li>
              <li>Enter shipping address</li>
              <li>Choose payment method</li>
              <li>Review order summary</li>
              <li>Click 'Place Order'</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Payment',
        icon: CreditCard,
        content: (
          <div>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Redirected to Payment page after order placement</li>
              <li>Select preferred payment method</li>
              <li>Enter payment details</li>
              <li>Click 'Pay Now'</li>
              <li>Receive transaction confirmation</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Orders & Profile',
        icon: User,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Viewing Orders</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Go to Profile page</li>
              <li>Click 'My Orders'</li>
              <li>View past order details and status</li>
            </ol>
            <h3 className="text-lg font-semibold mt-6 mb-4 text-indigo-700">Updating Profile</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Navigate to Profile Settings</li>
              <li>Update Username, Email, Password, Shipping Address</li>
            </ol>
          </div>
        )
      }
    ],
    backend: [
      {
        title: 'User Management',
        icon: User,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">User Operations</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Log in as Admin</li>
              <li>Navigate to User Management</li>
              <li>View all users</li>
              <li>Add/remove users as needed</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Product Management',
        icon: Package,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Product Operations</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Go to Products section</li>
              <li>Add new products with full details</li>
              <li>Edit or delete existing products</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Order Management',
        icon: ShoppingCart,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Order Tracking</h3>
            <ol className="space-y-2 list-decimal pl-5 text-gray-700 text-sm">
              <li>Navigate to Orders section</li>
              <li>View comprehensive order list</li>
              <li>Update order status</li>
            </ol>
          </div>
        )
      },
      {
        title: 'Sales Analytics',
        icon: Settings,
        content: (
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Sales Reporting</h3>
            <ul className="space-y-2 list-disc pl-5 text-gray-700 text-sm">
              <li>Total Revenue</li>
              <li>Monthly Revenue</li>
              <li>Top Products</li>
              <li>Daily Sales Trend</li>
              <li>Export data as CSV or PDF</li>
            </ul>
          </div>
        )
      }
    ]
  };

  return (
    <div className="fixed top-24 right-6 z-50 h-full">
      {/* Manual Bubble */}
      {!isChatOpen && (
        <div className="animate-bounce-slow">
          <button 
            onClick={() => setIsChatOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center space-x-3 group"
          >
            <HelpCircle className="w-6 h-6 group-hover:rotate-12 transition-transform" />
            <div className="text-left">
              <span className="text-sm font-semibold">User Manual</span>
              <span className="text-xs block opacity-75">How to use application</span>
            </div>
          </button>
        </div>
      )}

      {/* Manual Window */}
      {isChatOpen && (
        <div className="w-[450px] h-full bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform transition-all duration-300 ease-in-out">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-5 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Book className="w-6 h-6" />
              <h2 className="font-bold text-lg">E-Commerce Application Guide</h2>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-purple-500 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b">
            {['frontend', 'backend'].map(section => (
              <button 
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  setActiveSubsection(null);
                }} 
                className={`flex-1 p-3 font-semibold transition-colors ${
                  activeSection === section 
                    ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-600' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {section === 'frontend' ? 'Frontend Guide' : 'Backend Guide'}
              </button>
            ))}
          </div>

          {/* Sections */}
          <div className="relative h-full">
            {/* Sidebar Navigation */}
            <div className="w-48 absolute left-0 top-0 h-full bg-gray-50 border-r p-4 space-y-2">
              {sections[activeSection].map((section, index) => (
                <button
                  key={index}
                  onClick={() => setActiveSubsection(index)}
                  className={`w-full text-left p-2 rounded-md flex items-center space-x-2 transition-colors ${
                    activeSubsection === index 
                      ? 'bg-indigo-100 text-indigo-700' 
                      : 'hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <section.icon className="w-5 h-5 opacity-70" />
                  <span className="text-sm font-medium">{section.title}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="pl-48 p-6 max-h-[calc(100%-2rem)] overflow-y-auto bg-gray-50">
              {activeSubsection !== null ? (
                sections[activeSection][activeSubsection].content
              ) : (
                <div className="text-center text-gray-500 py-10">
                  <p>Select a section to view details</p>
                </div>
              )}
            </div>
          </div>

          {/* Troubleshooting */}
          <div className="bg-red-50 border-t border-red-100 p-5 space-y-3">
            <h3 className="text-lg font-semibold text-red-700">Need Assistance?</h3>
            <div className="space-y-1 text-gray-700">
              <p><strong>Email:</strong> support@ecommerce.com</p>
              <p><strong>Phone:</strong> +1-800-123-456</p>
              <p><strong>Live Chat:</strong> 24/7 Support Available</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManualChatbot;
