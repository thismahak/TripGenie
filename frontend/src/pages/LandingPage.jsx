import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";

export default function LandingPage() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative text-gray-100 dark:text-gray-200"
      style={{
        backgroundImage: "url('/images/bg.jpg')",
        backgroundSize: "100%",
        backgroundPosition: "center 20%",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 dark:bg-black/40"></div>

      {/* Hero Section */}
      <section className="relative z-10 text-center px-4 py-24 sm:py-32 animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 flex items-center justify-center gap-2">
          <img
            src="/images/logo2.jpg"
            alt="TripGenie Logo"
            className="h-12 sm:h-14 rounded-full shadow-lg"
          />
          TripGenie
        </h1>
        <p className="text-xl sm:text-2xl max-w-2xl mx-auto mb-8 text-white/90 dark:text-gray-300">
          Plan smarter. Travel safer. Let AI handle the rest.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/register")}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded shadow-lg transition duration-300"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-white text-white px-6 py-3 rounded hover:bg-white hover:text-purple-700 dark:hover:bg-gray-100 dark:hover:text-purple-700 transition duration-300"
              >
                Login
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded shadow-lg transition duration-300"
            >
              Go to Dashboard →
            </button>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section className="relative bg-purple-50 dark:bg-gray-900 py-20 px-6 text-center">
        <h2 className="text-3xl font-bold mb-12 text-purple-700 dark:text-purple-300">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "✈️",
              title: "Step 1",
              desc: "Choose Documents Required, Packing or Explore",
            },
            {
              icon: "🤖",
              title: "Step 2",
              desc: "Receive Smart AI Suggestions Instantly",
            },
            {
              icon: "🕘",
              title: "Step 3",
              desc: "Track and Review Your Search History and Responses",
            },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg transform transition hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-5xl mb-3">{icon}</div>
              <h4 className="font-semibold text-xl mb-1 text-purple-800 dark:text-purple-300">{title}</h4>
              <p className="text-gray-700 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why TripGenie */}
      <section className="bg-gradient-to-r from-purple-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-10 text-purple-800 dark:text-purple-300">Why TripGenie?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: "🧠", title: "AI Powered", desc: "Get curated advice in seconds." },
            { icon: "⏱️", title: "Saves Time", desc: "No more endless Google searches." },
            { icon: "🔐", title: "Secure", desc: "Your travel data stays private." },
            { icon: "🧼", title: "Clean UI", desc: "Smooth, clutter-free experience." },
          ].map(({ icon, title, desc }, i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md hover:shadow-2xl transition duration-300 border border-purple-100 dark:border-gray-700"
            >
              <div className="text-4xl mb-3">{icon}</div>
              <h4 className="font-bold text-lg text-purple-700 dark:text-purple-300 mb-1">{title}</h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-purple-50 dark:bg-gray-900 text-center py-20 px-6">
        <div className="max-w-xl mx-auto">
          <p className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
            Ready to plan your next adventure with ease and confidence?
          </p>
          {!isLoggedIn ? (
            <button
              onClick={() => navigate("/register")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition-all"
            >
              Get Started Now →
            </button>
          ) : (
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full text-lg shadow-lg transition-all"
            >
              Go to Dashboard →
            </button>
          )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
