import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const ITEMS_PER_PAGE = 5;

export default function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const res = await fetch("https://tripgenie-backend-cmqd.onrender.com/api/history", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setHistory(data.history.reverse());
      } else {
        console.error(data.message);
      }
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter((item) => {
    const matchesType = activeFilter === "all" || item.type === activeFilter;
    const matchesSearch = item.response
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

  const totalPages = Math.ceil(filteredHistory.length / ITEMS_PER_PAGE);
  const paginatedHistory = filteredHistory.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getBadgeClasses = (type) => {
    switch (type) {
      case "visa":
        return "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200";
      case "packing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "explore":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-rose-100 text-rose-800 dark:bg-rose-900 dark:text-rose-200";
    }
  };

  const getBorderClasses = (type) => {
    switch (type) {
      case "visa":
        return "border-l-[6px] border-teal-500";
      case "packing":
        return "border-l-[6px] border-blue-500";
      case "explore":
        return "border-l-[6px] border-green-500";
      default:
        return "border-l-[6px] border-rose-500";
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-r from-purple-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 min-h-screen p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-6 border-b-4 border-green-600 pb-3">
            🕘 Your History
          </h1>

          {/* Filter Tabs */}
          <div className="flex gap-4 mb-4 flex-wrap">
            {["all", "visa", "packing", "explore"].map((type) => (
              <button
                key={type}
                onClick={() => {
                  setActiveFilter(type);
                  setCurrentPage(1);
                }}
                className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
                  activeFilter === type
                    ? "bg-rose-500 text-white"
                    : "bg-white dark:bg-gray-800 text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-gray-700"
                }`}
              >
                {type === "all"
                  ? "All"
                  : type === "visa"
                  ? "Documents Info"
                  : type === "packing"
                  ? "Packing Info"
                  : "Explore Info"}
              </button>
            ))}
          </div>

          {/* Search */}
          <input
            type="text"
            placeholder="Search history..."
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-rose-400"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />

          {loading ? (
            <div className="text-center text-gray-600 dark:text-gray-300 text-lg">Loading...</div>
          ) : filteredHistory.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 italic text-lg">
              No matching history found.
            </p>
          ) : (
            <>
              <div className="space-y-6">
                {paginatedHistory.map((item, i) => (
                  <div
                    key={i}
                    className={`bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 hover:shadow-xl transition-all duration-200 ${getBorderClasses(
                      item.type
                    )}`}
                  >
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                        📅 {new Date(item.createdAt).toLocaleString()}
                      </p>
                      <span
                        className={`text-xs font-bold uppercase px-3 py-1 rounded-full ${getBadgeClasses(
                          item.type
                        )}`}
                      >
                        {item.type === "visa"
                          ? "Documents Info"
                          : item.type === "packing"
                          ? "Packing Info"
                          : item.type === "explore"
                          ? "Explore Info"
                          : "Other"}
                      </span>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4 text-[15px] text-gray-900 dark:text-gray-100 font-semibold leading-relaxed whitespace-pre-wrap">
                      {item.response}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 gap-2 flex-wrap">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm rounded bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-40"
                >
                  Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm font-semibold rounded ${
                      currentPage === i + 1
                        ? "bg-rose-500 text-white"
                        : "bg-white dark:bg-gray-800 border text-rose-700 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-gray-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(p + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm rounded bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
