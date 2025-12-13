import React, { useState } from "react";
import ButtonSm from "../Common/Button";
import { Menu, X } from "lucide-react";

const TopNav: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm px-6 py-3 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logoHori.webp"
            alt="Logo"
            className="w-32 h-10 object-contain"
          />
        </div>

        {/* Center Links (Desktop Only) */}
        <div className="hidden md:flex items-center gap-10 text-blue-900 font-medium">
          <a href="#why" className="hover:text-blue-700 transition">Why Choose Us</a>
          <a href="#courses" className="hover:text-blue-700 transition">Courses</a>
          
          <a href="#faq" className="hover:text-blue-700 transition">FAQ</a>
        </div>

        {/* Right: Apply Now Button */}
        <div className="hidden md:flex">
          <ButtonSm
            state="default"
            text="Apply Now"
            onClick={() => console.log("Applying...")}
          />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-blue-900"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={28} />
        </button>
      </nav>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transition-transform duration-300 z-50 
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex justify-between items-center px-5 py-4 border-b">
          <span className="text-lg font-semibold text-blue-900">Menu</span>
          <button onClick={() => setSidebarOpen(false)}>
            <X size={26} className="text-blue-900" />
          </button>
        </div>

        {/* Links */}
        <div className="flex flex-col px-5 py-6 gap-6 text-blue-900 text-lg">
           <a href="#why" className="hover:text-blue-700" onClick={() => setSidebarOpen(false)}>
            Why Choose Us
          </a>
          <a href="#courses"  className="hover:text-blue-700" onClick={() => setSidebarOpen(false)}>
            Courses
          </a>
         
          <a href="#faq" className="hover:text-blue-700" onClick={() => setSidebarOpen(false)}>
            FAQ
          </a>

          {/* Apply Button */}
          <ButtonSm
            state="default"
            text="Apply Now"
            className="mt-4"
            onClick={() => {
              setSidebarOpen(false);
              console.log("Applying...");
            }}
          />
        </div>
      </div>

      {/* Overlay (click to close) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        ></div>
      )}
    </>
  );
};

export default TopNav;
