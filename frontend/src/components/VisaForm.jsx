import { useState } from "react";
import { FaPassport } from "react-icons/fa";

export default function VisaForm() {
  const [form, setForm] = useState({
    nationality: "",
    destination: "",
    tripType: "",
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
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}api/visa`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(form),
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
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl border border-teal-100 dark:border-gray-700 transition-colors">
        {/* Header */}
        <div className="dark:text-white flex items-center gap-2 mb-6 text-teal-500">
          <FaPassport className="text-2xl" />
          <h2 className="dark:text-white text-2xl font-bold text-teal-400">Visa & Document Info</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="nationality"
            placeholder="Your Nationality (e.g., Indian)"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-white bg-white dark:bg-gray-900 dark:text-white"
            value={form.nationality}
            onChange={handleChange}
            required
          />
          <input
            name="destination"
            placeholder="Destination Country (e.g., Canada)"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-white bg-white dark:bg-gray-900 dark:text-white"
            value={form.destination}
            onChange={handleChange}
            required
          />
          <input
            name="tripType"
            placeholder="Trip Purpose (e.g., Tourism, Study)"
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-white bg-white dark:bg-gray-900 dark:text-white"
            value={form.tripType}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`dark:bg-white dark:text-black w-full bg-teal-500 text-white py-2 rounded-md font-medium transition duration-300 ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-teal-700 dark:hover:bg-white"
            }`}
          >
            {loading ? "Processing..." : "Get Visa Information"}
          </button>
        </form>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 w-full max-w-3xl p-6 rounded-lg shadow-lg border border-teal-200 dark:border-gray-700 relative animate-fade-in max-h-[70vh] overflow-y-auto">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-3 text-gray-500 dark:text-gray-300 hover:text-red-600 text-xl font-bold"
            >
              ✖
            </button>
            <h2 className="flex justify-center items-center gap-1 text-lg font-bold mb-3 text-teal-600 dark:text-teal-600"><FaPassport/> AI Visa Info</h2>
            <div className="text-gray-900 dark:text-gray-100 whitespace-pre-wrap font-medium text-sm">
              {result}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-3 italic">
              ⚠️ This content is AI-generated and should be verified before planning.
            </p>
            <div className="mt-4 flex justify-end gap-4">
              
              <button
                onClick={handleCopy}
                className="text-sm px-4 py-2 border border-teal-500 text-teal-600 dark:text-teal-400 rounded hover:bg-teal-50 dark:hover:bg-gray-800"
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
