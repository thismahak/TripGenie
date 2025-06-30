export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400 text-sm py-4 px-4">
      <div className="max-w-4xl mx-auto space-y-2">
        <p className="text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
          ⚠️ Travel info is AI-generated and may not be fully accurate.
          
            Please verify details from official sources before planning.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          &copy; {new Date().getFullYear()} <span className="font-semibold text-rose-500 dark:text-gray-300">TripGenie</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
