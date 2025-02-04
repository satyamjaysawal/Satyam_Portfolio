import React, { useState } from 'react';
import { Book, X, ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const UserManualChatbot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [openSections, setOpenSections] = useState({});

  const manualSections = [
    {
      role: 'Customer',
      color: 'emerald',
      topics: [
        {
          title: 'Registration',
          content: (
            <div>
              <h3 className="font-bold mb-2">Registration Steps</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Visit Sign Up page</li>
                <li>Enter personal details</li>
                <li>Create account credentials</li>
                <li>Verify email</li>
              </ol>
            </div>
          )
        },
        {
          title: 'Shopping Process',
          content: (
            <div>
              <h3 className="font-bold mb-2">Shopping Guide</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Browse product catalog</li>
                <li>Select desired items</li>
                <li>Add to cart</li>
                <li>Complete checkout</li>
              </ol>
            </div>
          )
        }
      ]
    },
    {
      role: 'Vendor',
      color: 'sky',
      topics: [
        {
          title: 'Product Management',
          content: (
            <div>
              <h3 className="font-bold mb-2">Product Operations</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Add new products</li>
                <li>Update inventory</li>
                <li>Manage pricing</li>
                <li>Track product performance</li>
              </ol>
            </div>
          )
        },
        {
          title: 'Order Processing',
          content: (
            <div>
              <h3 className="font-bold mb-2">Order Handling</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Review incoming orders</li>
                <li>Confirm order details</li>
                <li>Prepare shipment</li>
                <li>Update shipping status</li>
              </ol>
            </div>
          )
        }
      ]
    },
    {
      role: 'Admin',
      color: 'violet',
      topics: [
        {
          title: 'User Management',
          content: (
            <div>
              <h3 className="font-bold mb-2">User Control</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>View user accounts</li>
                <li>Manage user roles</li>
                <li>Monitor activities</li>
                <li>Handle account permissions</li>
              </ol>
            </div>
          )
        },
        {
          title: 'Analytics',
          content: (
            <div>
              <h3 className="font-bold mb-2">Sales Insights</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Generate reports</li>
                <li>Analyze revenue trends</li>
                <li>Identify top products</li>
                <li>Create sales forecasts</li>
              </ol>
            </div>
          )
        }
      ]
    }
  ];

  const toggleSection = (role, topicTitle) => {
    setOpenSections(prev => ({
      ...prev,
      [`${role}-${topicTitle}`]: !prev[`${role}-${topicTitle}`]
    }));
  };

  return (
    <div className="fixed top-24 right-6 z-50">
      {/* Manual Bubble */}
      {!isChatOpen && (
        <button 
          onClick={() => setIsChatOpen(true)}
          className="bg-yellow-400 text-black p-4 rounded-full shadow-2xl hover:bg-yellow-500 transition-transform flex items-center space-x-2"
        >
          <HelpCircle className="w-6 h-6" />
          <div>
            <span className="text-sm font-medium">User Manual</span>
            <span className="text-xs mt-1 block">How to use application</span>
          </div>
        </button>
      )}

      {/* Manual Window */}
      {isChatOpen && (
        <div className="w-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Book className="w-5 h-5" />
              <h2 className="font-bold">E-Commerce User Manual</h2>
            </div>
            <button 
              onClick={() => setIsChatOpen(false)}
              className="hover:bg-purple-500 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Manual Sections */}
          <div className="flex-grow overflow-y-auto p-4 space-y-3">
            {manualSections.map((section) => (
              <div key={section.role} className="bg-gray-50 rounded-lg">
                <div className={`p-3 bg-${section.color}-100 rounded-t-lg`}>
                  <h3 className={`font-bold text-${section.color}-800`}>{section.role} Role</h3>
                </div>
                
                {section.topics.map((topic) => (
                  <div key={topic.title} className="border-b last:border-b-0 border-gray-200">
                    <button 
                      onClick={() => toggleSection(section.role, topic.title)}
                      className="w-full flex justify-between items-center p-3 hover:bg-gray-100 transition"
                    >
                      <span className="font-medium">{topic.title}</span>
                      {openSections[`${section.role}-${topic.title}`] 
                        ? <ChevronUp className="text-gray-500" /> 
                        : <ChevronDown className="text-gray-500" />
                      }
                    </button>
                    
                    {openSections[`${section.role}-${topic.title}`] && (
                      <div className="p-3 bg-white">
                        {topic.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManualChatbot;
