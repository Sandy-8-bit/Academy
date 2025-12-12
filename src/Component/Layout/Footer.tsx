import React from "react";
import { Instagram, Linkedin, Youtube } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-white border-t py-4">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.webp"
            alt="DMIF Academy Logo"
            className="w-10 h-10 object-contain"
          />
        </div>

        {/* CENTER: Copyright */}
        <div className="text-center text-gray-600 text-sm">
          © {new Date().getFullYear()} DMIF Academy. All rights reserved.
        </div>

        {/* RIGHT: Social Icons */}
        <div className="flex items-center gap-4 text-blue-900">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <Instagram size={22} className="hover:text-blue-700 transition" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <Linkedin size={22} className="hover:text-blue-700 transition" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noreferrer">
            <Youtube size={22} className="hover:text-blue-700 transition" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
