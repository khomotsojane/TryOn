import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-10 py-4 bg-white shadow-sm">
      <h1 className="text-2xl font-bold">VTRYON</h1>

      <ul className="hidden md:flex gap-8 font-medium">
        <li className="cursor-pointer hover:text-gray-500">Men</li>
        <li className="cursor-pointer hover:text-gray-500">Women</li>
        <li className="cursor-pointer hover:text-gray-500">New</li>
        <li className="cursor-pointer hover:text-gray-500">Sale</li>
      </ul>

      <div className="flex gap-6 text-lg">
        <span className="cursor-pointer">🔍</span>
        <span className="cursor-pointer">🛒</span>
        <span className="cursor-pointer">👤</span>
      </div>
    </nav>
  );
};

export default Navbar;