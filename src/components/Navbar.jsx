import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="flex items-center w-full px-6  ">
      <img src="/assets/images/logos/logo.svg" className="flex shrink-0" alt="logo" />
      <ul className="flex items-center gap-10 ml-auto">
        <li className="font-semibold transition-all duration-300 hover:text-[#1E40AF] text-black">
          <Link to="#">Home</Link>
        </li>
        <li className="font-semibold transition-all duration-300 hover:text-[#1E40AF] text-black">
          <Link to="#">Pricing</Link>
        </li>
        <li className="font-semibold transition-all duration-300 hover:text-[#1E40AF] text-black">
          <Link to="#">Features</Link>
        </li>
        <li className="font-semibold transition-all duration-300 hover:text-[#1E40AF] text-black">
          <Link to="#">Testimonials</Link>
        </li>
      </ul>
    </div>
  );
}
