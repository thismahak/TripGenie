import { useState } from "react";
import { FaSuitcaseRolling } from "react-icons/fa";

export default function PackingForm() {
  const [form, setForm] = useState({
    destination: "",
    season: "",
    durationDays: "",
    activities: "",
  });
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    try {
      const payload = {
        ...form,
        activities: form.activities.split(",").map((a) => a.trim()),
      };

      const res = await fetch("https://tripgenie-backend-cmqd.onrender.com/api/packing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.result);
        setShowModal(true);
      } else {
        setResult(data.message || "Error occurred");
      }
    } catch (err) {
      setResult("Server error");
    }

    setLoading(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      alert("Copied to clipboard!");
    } catch {
      alert("Copy failed!");
    }
  };

  return (
    <>
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-blue-100 dark:border-gray-700 transition-all">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-blue-700 dark:text-white">
          <FaSuitcaseRolling className="text-2xl" />
          <h2 className="text-2xl font-bold">Packing Assistant</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {["destination", "season", "durationDays", "activities"].map((field) => (
            <input
              key={field}
              name={field}
              placeholder={
                field === "destination"
                  ? "Destination (e.g., Japan)"
                  : field === "season"
                  ? "Season (e.g., Summer)"
                  : field === "durationDays"
                  ? "Trip Duration (e.g., 10 days)"
                  : "Activities (e.g., Hiking, Swimming)"
              }
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-white bg-white dark:bg-gray-900 dark:text-white"
              value={form[field]}
              onChange={handleChange}
              required
            />
          ))}
          <button
            type="submit"
            disabled={loading}
            className={`dark:bg-white dark:text-black w-full bg-blue-600 text-white py-2 rounded-md font-medium transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700 dark:hover:bg-white"
            }`}
          >
            {loading ? "Loading..." : "Get Packing List"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white dark:bg-gray-900 max-w-3xl w-full  rounded-lg shadow-lg p-6 border border-blue-400 dark:border-gray-700 relative max-h-[70vh] overflow-y-auto animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-xl text-gray-500 dark:text-gray-300 font-bold hover:text-red-300"
            >
              ✖
            </button>

            <h2 className="flex justify-center items-center gap-1 text-lg font-bold text-blue-700 dark:text-blue-700 mb-3">
              <FaSuitcaseRolling/> Your Packing List
            </h2>

            <div className="whitespace-pre-wrap text-gray-900 dark:text-gray-100 font-medium text-sm">
              {result}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
              ⚠️ This content is AI-generated and should be verified before packing.
            </p>
            <div className="mt-4 flex gap-4 justify-end">
              <button
                onClick={handleCopy}
                className="text-sm px-4 py-2 border border-blue-500 text-blue-600 dark:text-blue-400 rounded hover:bg-blue-50 dark:hover:bg-gray-800"
              >
                📋 Copy to Clipboard
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-sm px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Close
              </button>
            </div>

            
          </div>
        </div>
      )}
    </>
  );
}
