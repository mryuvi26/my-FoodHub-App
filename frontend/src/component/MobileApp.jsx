import React from "react";
import { APP_DOWNLOAD, assets } from "../assets/frontend_assets/assets.js";

export default function MobileApp() {
  return (
    <section
      className="
        w-full py-20 pb-32 text-center
        bg-white dark:bg-[#0E1116]
        transition-colors duration-300
      "
    >
      {/* Heading */}
      <h2
        className="
          text-3xl sm:text-4xl font-bold
          text-gray-900 dark:text-white
        "
      >
        {APP_DOWNLOAD.title}
      </h2>
      
      <p
        className="
          mt-2 text-lg
          text-gray-700 dark:text-gray-400
        "
      >
        {APP_DOWNLOAD.subtitle}
      </p>

      {/* Download Buttons */}
      <div className="flex items-center justify-center gap-6 mt-10"> 
        <a href="#" className="w-40 sm:w-48"> 
          <img
            src={assets.play_store}
            alt="Play Store"
            className="w-full hover:scale-105 transition"
          />
        </a>

        <a href="#" className="w-40 sm:w-48">
          <img
            src={assets.app_store}
            alt="App Store"
            className="w-full hover:scale-105 transition"
          />
        </a>
      </div>
    </section>
  );
}
