import { useState } from "react";
import PackingForm from "../components/PackingForm";
import VisaForm from "../components/VisaForm";
import DestinationForm from "../components/DestinationForm";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaPassport } from "react-icons/fa";
import { FaSuitcaseRolling } from "react-icons/fa";
import { FaMapMarkedAlt } from "react-icons/fa";
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("visa");

  const tabs = [
    { id: "visa", label: "Documents Info", icon: <FaPassport/> },
    { id: "packing", label: "Packing Guide", icon:<FaSuitcaseRolling/> },
    { id: "explore", label: "Explore Places", icon: <FaMapMarkedAlt/> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-black transition-colors duration-300">
      <Navbar />

      {/* Header */}
      <div className="relative bg-white dark:bg-gray-900 py-16 text-center overflow-hidden shadow-sm">
        <img
          src="/images/dashboard-bg-1.avif"
          alt="Illustration"
          className="absolute left-0 bottom-[-20px] w-60 sm:w-72 md:w-80 opacity-20 dark:opacity-10 pointer-events-none select-none"
          style={{ objectFit: "contain" }}
        />

        <div className="relative z-10">
          <h1 className="dark:text-purple-500 text-4xl font-extrabold text-rose-500 mb-2">Your Travel Assistant</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
            AI-powered tools to help you pack smart, plan better, and explore confidently.
          </p>
        </div>

        <img
          src="/images/dashboard-bg-2.avif"
          alt="Illustration"
          className="absolute right-0 bottom-[-50px] w-60 sm:w-72 md:w-80 opacity-20 dark:opacity-10 pointer-events-none select-none"
          style={{ objectFit: "contain" }}
        />

        {/* Soft blob for depth */}
        <div className="absolute -top-10 -left-20 w-96 h-96 bg-purple-100 dark:bg-purple-900 rounded-full opacity-20 blur-2xl z-0"></div>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-full px-2 py-2 shadow-lg flex gap-3 md:gap-5 border border-purple-100 dark:border-gray-600">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-full font-medium flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? "dark:bg-purple-500 bg-rose-500 text-white shadow-md"
                  : "dark:text-purple-500 text-rose-500 hover:bg-purple-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="text-xl">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Area */}
      <div className="max-w-3xl mx-auto px-4 py-10">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6 animate-fade-in-up transition-colors duration-300">
          {activeTab === "visa" && <VisaForm />}
          {activeTab === "packing" && <PackingForm />}
          {activeTab === "explore" && <DestinationForm />}
        </div>
      </div>

      <Footer />
    </div>
  );
}
