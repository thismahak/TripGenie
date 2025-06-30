import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaHome, FaHistory, FaSignOutAlt, FaRocket, FaSun, FaMoon } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // check saved preference on initial load
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50 transition-all">
      {/* Logo */}
      <div
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => navigate("/dashboard")}
      >
        <img
          src="/images/logo2.jpg"
          alt="TripGenie Logo"
          className="h-8 w-8 rounded-full shadow-md transition-transform group-hover:scale-110"
        />
        <h1 className="dark:text-white dark:group-hover:text-white text-3xl font-extrabold text-rose-500 group-hover:text-rose-600 transition">
          TripGenie
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 font-medium text-black dark:text-white">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-gray-300 transition"
        >
          <FaHome />
          Home
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-gray-300 transition"
        >
          <FaRocket />
          Dashboard
        </button>

        <button
          onClick={() => navigate("/history")}
          className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-gray-300 transition"
        >
          <FaHistory />
          History
        </button>

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-1 hover:text-rose-600 dark:hover:text-gray-300 transition"
        >
          <MdAccountCircle />
          Profile
        </button>

        {/* 🌗 Theme Toggle */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-1 text-yellow-600 dark:text-yellow-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition text-xl"
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
        </button>

        <button
          onClick={handleLogout}
          className="dark:bg-white dark:hover:bg-gray-300 dark:text-black bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded flex items-center gap-1 transition"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </nav>
  );
}
