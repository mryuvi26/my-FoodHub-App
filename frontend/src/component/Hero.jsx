import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";

const Hero = () => {
  return (
    <div
      className="
        w-full pt-8 p-4 md:px-24 py-8 space-y-14
        bg-white dark:bg-[#0E1116]
        transition-colors duration-300
      "
    >
      <div
        className="
          relative w-full rounded-3xl overflow-hidden mb-16
          min-h-[350px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[560px]
          shadow-md flex items-center
        "
      >
        {/* Background Image */}
        <img
          src={assets.header_img}
          alt="hero"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Content */}
        <div
          className="
            relative z-10 flex flex-col gap-5
            px-6 sm:px-10 md:px-16 lg:px-20
            py-10 mt-8 max-w-4xl
          "
        >
          {/* Heading */}
          <h1
            className="
              text-white dark:text-gray-100
              text-4xl sm:text-5xl md:text-6xl
              font-bold leading-tight
            "
          >
            Order your
          </h1>

          <h1
            className="
              text-white dark:text-gray-100
              text-4xl sm:text-5xl md:text-6xl
              font-bold leading-tight
            "
          >
            favourite food here
          </h1>

          {/* Paragraph */}
          <p
            className="
              text-white/90 dark:text-gray-300
              text-sm sm:text-base md:text-lg
              leading-relaxed
            "
          >
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise.
          </p>

          {/* Button */}
          <a href="#menu">
            <button
              className="
                bg-white text-black
                dark:bg-orange-500 dark:text-white
                px-7 py-3 rounded-full
                shadow-md font-semibold
                text-base sm:text-lg w-fit
                hover:bg-orange-300 dark:hover:bg-orange-600
                transition
              "
            >
              View Menu
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;