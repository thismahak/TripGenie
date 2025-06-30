import { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function DestinationForm() {
  const [form, setForm] = useState({
    destination: "",
    tripType: "Sightseeing",
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
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/explore`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setResult(data.response);
        setShowModal(true);
      } else {
        setResult(data.message || "Something went wrong.");
      }
    } catch (err) {
      setResult("Server error. Try again later.");
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
      {/* Form Container */}
      <div className="max-w-xl mx-auto bg-white p-8 dark:bg-gray-800 rounded-xl shadow-xl border border-green-100 dark:border-gray-700 ">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6 text-green-700 dark:text-white">
          <FaMapMarkedAlt className="text-2xl" />
          <h2 className="text-2xl font-bold">Explore a Destination</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="destination"
            placeholder="Enter destination (e.g., Paris)"
            className="w-full px-4 py-2 border border-gray-300 rounded-md dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-white dark:bg-gray-900 dark:text-white"
            value={form.destination}
            onChange={handleChange}
            required
          />
          <select
            name="tripType"
            value={form.tripType}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 dark:bg-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-white"
          >
            {["Sightseeing", "Foodie", "Nature", "Romantic", "Adventure"].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>

          <button
            type="submit"
            disabled={loading}
            className={`dark:bg-white dark:text-black w-full bg-green-600 text-white py-2 rounded-md font-medium transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700 dark:hover:bg-white"
            }`}
          >
            {loading ? "Loading..." : "Explore"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className=" fixed inset-0 bg-black/50  flex items-center justify-center z-50">
          <div className="dark:bg-gray-900  bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg border border-green-200 dark:border-gray-700 relative animate-fade-in max-h-[70vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 dark:text-gray-300 hover:text-red-600 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="flex justify-center items-center gap-1 text-lg font-bold mb-3 text-green-600 dark:text-green-600"><FaMapMarkedAlt/>AI Destination Explorer</h2>
            <div className="dark:text-gray-100 text-gray-900 whitespace-pre-wrap font-medium text-sm">
              {result}
            </div>
            <p className="dark:text-gray-400 dark:text-sm text-xs text-gray-500 mt-3 italic">
              ⚠️ This content is AI-generated and should be verified before planning.
            </p>
            <div className="mt-4 flex justify-end gap-4">
              
              <button
                onClick={handleCopy}
                className="text-sm px-4 py-2 border border-green-500 text-green-600 dark:text-green-400 rounded hover:bg-green-50 dark:hover:bg-gray-800"
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
