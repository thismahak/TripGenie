import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaUserCircle } from "react-icons/fa";
import Footer from "../components/Footer";
export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setUser(data.user);
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
        <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-indigo-100 dark:border-gray-700 p-8 relative">
          {/* Profile avatar */}
          <div className="flex justify-center mb-6">
            <div className="bg-rose-100 dark:bg-rose-900 rounded-full p-3 shadow-md">
              <FaUserCircle className="text-rose-600 dark:text-rose-300 text-6xl" />
            </div>
          </div>

          <h2 className="text-3xl font-extrabold text-center text-rose-500 dark:text-rose-300 mb-6">
            Welcome, {user?.name?.split(" ")[0] || "User"} 👋
          </h2>

          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-300 text-lg">Loading profile...</p>
          ) : user ? (
            <div className="space-y-5">
              <div className="bg-indigo-50 dark:bg-gray-800 p-4 rounded-md shadow-sm border border-indigo-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">Full Name</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.name}</p>
              </div>
              <div className="bg-indigo-50 dark:bg-gray-800 p-4 rounded-md shadow-sm border border-indigo-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">Email Address</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">{user.email}</p>
              </div>
              <div className="bg-indigo-50 dark:bg-gray-800 p-4 rounded-md shadow-sm border border-indigo-100 dark:border-gray-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">Joined On</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={handleLogout}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white py-2.5 rounded-md font-semibold mt-4 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <p className="text-center text-red-600 dark:text-red-400">
              Unable to load profile details.
            </p>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
}
