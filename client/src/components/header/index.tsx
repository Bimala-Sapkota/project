import React from "react";
import NavLinks from "./nau-links"; // Corrected the import path
import { LuClipboardPlus } from "react-icons/lu";
import { GrFavorite } from "react-icons/gr"; // Corrected the import for the wishlist icon

const NavBar = () => {
  return (
    <nav className="w-full flex justify-between items-center p-4 bg-gray-800 text-white tracking-wider px-36">
      {/* Logo */}
      <div>
        <img src="./logo.png" alt="Logo" className="object-cover h-20" />
      </div>

      {/* Nav Links */}
      <div>
        <NavLinks />
      </div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {" "}
        {/* Corrected class name */}
        {/* Wishlist */}
        <div className="cursor-pointer w-fit bg-black p-3 rounded-full flex items-center justify-center hover:bg-gray-600 transition">
          {" "}
          {/* Added hover effect */}
          <GrFavorite aria-label="Wishlist" />
        </div>
        {/* Clipboard Icon */}
        <div className="cursor-pointer w-fit bg-black p-3 rounded-full flex items-center justify-center hover:bg-gray-600 transition">
          {" "}
          {/* Added hover effect */}
          <LuClipboardPlus aria-label="Clipboard" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
