import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";

const Contact = () => {
  return (
    <div className="bg-[#302f2f] text-white py-12 px-4 sm:px-8 md:px-16">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 md:gap-x-16 text-center md:text-left">
          
          {/* Left side */}
          <div className="flex flex-col items-center md:items-start">
            <h1 className="text-3xl font-bold text-orange-400 font-serif"> Food-hub </h1>
            <p className="text-gray-300 mt-4 leading-7 max-w-xl">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis atque accusantium ut numquam, sequi labore porro nulla! Veritatis perspiciatis quis laudantium velit laboriosam corrupti aliquid incidunt dicta, impedit hic quo! </p>

            {/* Social icons */}
            <div className="flex items-center gap-5 mt-6 justify-center md:justify-start">
              <button className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-400 hover:bg-orange-400 transition"> <img src={assets.facebook_icon} alt="facebook" className="w-5" /></button>
              <button className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-400 hover:bg-orange-400 transition"> <img src={assets.twitter_icon} alt="twitter" className="w-5" /></button>
              <button className="w-11 h-11 flex items-center justify-center rounded-full border border-gray-400 hover:bg-orange-400 transition"> <img src={assets.linkedin_icon} alt="linkedin" className="w-5" /></button>
            </div>
          </div>

          {/* Company section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-4">COMPANY</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="hover:text-orange-400 cursor-pointer">Home</li>
              <li className="hover:text-orange-400 cursor-pointer">About us</li>
              <li className="hover:text-orange-400 cursor-pointer">Delivery</li>
              <li className="hover:text-orange-400 cursor-pointer">Privacy policy</li>
            </ul>
          </div>

          {/* Contact section */}
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-xl font-bold mb-4">GET IN TOUCH</h2>
            <p className="text-gray-300">+1-212-456-980</p>
            <p className="text-gray-300 mt-2">contact@food-hub.com</p>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-10 border-t border-gray-500" />

        <p className="text-center text-gray-300 mt-4 text-sm sm:text-base"> Copyright © 2025 Food-hub.com – All Right Reserved </p>
      </div>
    </div>
  );
};

export default Contact;