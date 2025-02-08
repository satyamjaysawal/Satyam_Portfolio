import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  getAnyUserProfile,
  updateUserByAdmin,
  deleteUser,
} from "../api/api";
import { Loader2, Edit2, Save, X, Trash2, User, Users } from "lucide-react";

const Profile = () => {
  const { token, user, logout } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Callback functions remain the same
  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await getUserProfile(token);
      setProfile(data);
      setUpdatedProfile(data);
    } catch {
      setMessage("Failed to fetch profile");
    }
  }, [token]);

  const fetchUsers = useCallback(async () => {
    if (user?.role !== "admin") return;
    try {
      const data = await getAllUsers(token);
      setUsers(data.users || []);
    } catch {
      setMessage("Failed to fetch users");
    }
  }, [token, user?.role]);

  useEffect(() => {
    if (token) {
      setLoading(true);
      Promise.all([fetchUserProfile(), fetchUsers()]).finally(() => setLoading(false));
    }
  }, [token, fetchUserProfile, fetchUsers]);

  // Event handlers remain the same
  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(token, updatedProfile);
      setProfile(updatedProfile);
      setEditMode(false);
      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to update profile");
    }
  };

  const handleOpenModal = async (userId) => {
    try {
      const { data } = await getAnyUserProfile(token, userId);
      setSelectedUser(data);
      setIsModalOpen(true);
    } catch {
      setMessage("Failed to fetch user details.");
    }
  };

  const handleAdminUpdateUser = async () => {
    if (!selectedUser) return;
    try {
      await updateUserByAdmin(token, selectedUser.id, { role: selectedUser.role });
      setMessage(`Updated ${selectedUser.username}'s role successfully`);
      fetchUsers();
      setIsModalOpen(false);
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to update user role.");
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser || !window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await deleteUser(token, selectedUser.id);
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setMessage("User deleted successfully");
      setIsModalOpen(false);
      setTimeout(() => setMessage(""), 3000);
    } catch {
      setMessage("Failed to delete user.");
    }
  };

  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('close-modal')) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="space-y-8">
          {/* Profile Section */}
          <div className="backdrop-blur-lg bg-gray-900/40 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl">
            <div className="flex justify-between items-center p-6 bg-gradient-to-r from-gray-800/80 to-gray-900/80 border-b border-gray-700/50">
              <h2 className="text-2xl font-semibold flex items-center gap-3 text-gray-100">
                <User className="h-6 w-6 text-blue-400" />
                Profile Dashboard
              </h2>
              <button
                onClick={logout}
                className="bg-red-500/80 hover:bg-red-600/80 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-red-500/20"
              >
                Logout
              </button>
            </div>

            <div className="p-6">
              {loading ? (
                <div className="flex justify-center p-8">
                  <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
                </div>
              ) : profile ? (
                <div className="space-y-6">
                  {["username", "email", "phone_number"].map((field) => (
                    <div key={field} className="group border-b border-gray-700/50 pb-4 transition-all duration-200">
                      <label className="block text-sm font-medium text-gray-400 mb-2">
                        {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </label>
                      {editMode ? (
                        <input
                          type="text"
                          name={field}
                          value={updatedProfile[field] || ""}
                          onChange={handleChange}
                          className="w-full px-4 py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-100 transition-all duration-200"
                        />
                      ) : (
                        <p className="text-lg font-medium text-gray-100">{profile[field]}</p>
                      )}
                    </div>
                  ))}
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full">
                      {profile.role.charAt(0).toUpperCase() + profile.role.slice(1)}
                    </p>
                    <div className="flex gap-4">
                      {editMode ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-600/80 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/20"
                          >
                            <Save className="h-4 w-4" />
                            Save Changes
                          </button>
                          <button
                            onClick={() => setEditMode(false)}
                            className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-gray-300 font-medium transition-all duration-200"
                          >
                            <X className="h-4 w-4" />
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setEditMode(true)}
                          className="flex items-center gap-2 bg-gray-700/50 hover:bg-gray-600/50 px-4 py-2 rounded-lg text-gray-300 font-medium transition-all duration-200"
                        >
                          <Edit2 className="h-4 w-4" />
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg">
                  Error loading profile data.
                </div>
              )}
            </div>
          </div>

          {/* Admin Panel */}
          {user?.role === "admin" && (
            <div className="backdrop-blur-lg bg-gray-900/40 rounded-xl overflow-hidden border border-gray-700/50 shadow-2xl">
              <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/80 to-gray-900/80">
                <h2 className="text-xl font-semibold flex items-center gap-3 text-gray-100">
                  <Users className="h-6 w-6 text-purple-400" />
                  User Management
                </h2>
              </div>
              <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {users.map((u) => (
                  <div key={u.id} className="group bg-gray-800/30 hover:bg-gray-800/50 p-4 rounded-xl border border-gray-700/50 transition-all duration-200 hover:shadow-lg">
                    <p className="font-medium text-gray-100 mb-2">{u.username}</p>
                    <p className="text-sm px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full inline-block mb-3">
                      {u.role.charAt(0).toUpperCase() + u.role.slice(1)}
                    </p>
                    <button
                      onClick={() => handleOpenModal(u.id)}
                      className="w-full mt-2 px-4 py-2 bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-lg transition-all duration-200 font-medium"
                    >
                      Manage User
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Modal */}
          {isModalOpen && selectedUser && (
            <div
              className="fixed inset-0 flex items-center justify-center bg-gray-900/90 backdrop-blur-sm z-50 close-modal"
              onClick={handleCloseModal}
            >
              <div 
                className="bg-gray-800/90 backdrop-blur-lg rounded-xl max-w-md w-full p-6 relative border border-gray-700/50 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                >
                  <X className="h-6 w-6" />
                </button>
                <h3 className="text-xl font-semibold mb-6 text-gray-100">Manage User</h3>
                <div className="space-y-4">
                  {["username", "email", "phone_number"].map((field) => (
                    <div key={field} className="group">
                      <label className="block text-sm font-medium text-gray-400 mb-1">
                        {field.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </label>
                      <p className="text-gray-100">{selectedUser[field]}</p>
                    </div>
                  ))}
                  <div className="pt-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Role</label>
                    <select
                      value={selectedUser.role}
                      onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-gray-100"
                    >
                      <option value="customer">Customer</option>
                      <option value="vendor">Vendor</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
                <div className="flex justify-between mt-6 pt-4 border-t border-gray-700/50">
                  <button
                    onClick={handleAdminUpdateUser}
                    className="flex items-center gap-2 bg-blue-500/80 hover:bg-blue-600/80 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleDeleteUser}
                    className="flex items-center gap-2 bg-red-500/80 hover:bg-red-600/80 px-4 py-2 rounded-lg text-white font-medium transition-all duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete User
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Toast Messages */}
          {message && (
            <div className="fixed bottom-6 right-6 px-6 py-3 bg-green-500/20 border border-green-500/30 text-green-300 rounded-lg shadow-xl backdrop-blur-sm transition-all duration-500 animate-fade-in">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;