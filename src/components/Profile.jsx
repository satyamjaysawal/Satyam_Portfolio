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

  // ✅ Fetch User Profile
  const fetchUserProfile = useCallback(async () => {
    try {
      const data = await getUserProfile(token);
      setProfile(data);
      setUpdatedProfile(data);
    } catch {
      setMessage("Failed to fetch profile");
    }
  }, [token]);

  // ✅ Fetch Users (Admin)
  const fetchUsers = useCallback(async () => {
    if (user?.role !== "admin") return;
    try {
      const data = await getAllUsers(token);
      setUsers(data.users || []);
    } catch {
      setMessage("Failed to fetch users");
    }
  }, [token, user?.role]);

  // ✅ Fetch Profile & Users in Parallel
  useEffect(() => {
    if (token) {
      setLoading(true);
      Promise.all([fetchUserProfile(), fetchUsers()]).finally(() => setLoading(false));
    }
  }, [token, fetchUserProfile, fetchUsers]);

  // ✅ Handle Input Changes for Profile Edit
  const handleChange = (e) => {
    setUpdatedProfile({ ...updatedProfile, [e.target.name]: e.target.value });
  };

  // ✅ Save Profile Updates
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

  // ✅ Open User Modal (Admin)
  const handleOpenModal = async (userId) => {
    try {
      const { data } = await getAnyUserProfile(token, userId);
      setSelectedUser(data);
      setIsModalOpen(true);
    } catch {
      setMessage("Failed to fetch user details.");
    }
  };

  // ✅ Admin Update User Role
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

  // ✅ Admin Delete User
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

  // ✅ Close Modal if clicked outside or by X button
  const handleCloseModal = (e) => {
    if (e.target === e.currentTarget || e.target.classList.contains('close-modal')) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 max-w-5xl mt-12">
      <div className="space-y-8">
        {/* Profile Section */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <User className="h-5 w-5" />
              User Profile
            </h2>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>

          <div className="p-4">
            {loading ? (
              <div className="flex justify-center p-6">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              </div>
            ) : profile ? (
              <div className="space-y-4">
                {/* Profile Fields */}
                {["username", "email", "phone_number"].map((field) => (
                  <div key={field} className="border-b pb-3">
                    <label className="block text-sm font-medium text-gray-700">{field.replace("_", " ")}</label>
                    {editMode ? (
                      <input
                        type="text"
                        name={field}
                        value={updatedProfile[field] || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <p className="text-lg font-semibold text-gray-700">{profile[field]}</p>
                    )}
                  </div>
                ))}
                <p className="text-sm text-gray-500">Role: {profile.role}</p>

                {/* Edit Actions */}
                <div className="flex gap-4 pt-4">
                  {editMode ? (
                    <>
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-5 py-1.5 rounded-lg hover:bg-blue-600 transition"
                      >
                        <Save className="h-4 w-4 inline-block mr-2" />
                        Save
                      </button>
                      <button
                        onClick={() => setEditMode(false)}
                        className="border px-5 py-1.5 rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100 transition"
                      >
                        <X className="h-4 w-4 inline-block mr-2" />
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditMode(true)}
                      className="border px-5 py-1.5 rounded-lg text-gray-700 border-gray-300 hover:bg-gray-100 transition"
                    >
                      <Edit2 className="h-4 w-4 inline-block mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-red-100 text-red-700 px-4 py-3 rounded-lg">Error loading profile.</div>
            )}
          </div>
        </div>

        {/* Admin Panel */}
        {user?.role === "admin" && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 border-b bg-gray-100">
              <h2 className="text-lg font-medium flex items-center gap-2">
                <Users className="h-5 w-5" />
                Admin Panel: Manage Users
              </h2>
            </div>
            <div className="p-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {users.map((u) => (
                <div key={u.id} className="bg-gray-50 p-3 rounded-lg shadow-sm">
                  <p className="font-medium text-gray-800">{u.username}</p>
                  <p className="text-sm text-gray-500">Role: {u.role}</p>
                  <button
                    onClick={() => handleOpenModal(u.id)}
                    className="mt-2 px-4 py-1.5 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
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
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10 close-modal"
            onClick={handleCloseModal}
          >
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 z-20" // Ensure z-index is high enough
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-lg font-semibold mb-4">Manage User</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-700">Username: {selectedUser.username}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">Email: {selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-700">Phone: {selectedUser.phone_number}</p>
                </div>
                <div>
                  <label className="block text-sm text-gray-700">Role:</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    className="mt-2 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="customer">Customer</option>
                    <option value="vendor">Vendor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-between mt-4">
                <button
                  onClick={handleAdminUpdateUser}
                  className="px-5 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  <Save className="h-4 w-4 inline-block mr-2" />
                  Save
                </button>
                <button
                  onClick={handleDeleteUser}
                  className="px-5 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  <Trash2 className="h-4 w-4 inline-block mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}


        {/* Success/Error Messages */}
        {message && <div className="fixed bottom-4 right-4 p-4 bg-green-100 text-green-700 rounded-md">{message}</div>}
      </div>
    </div>
  );
};

export default Profile;
