import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 px-6 md:px-10 py-4 flex items-center justify-between transition-all duration-300
        ${
          scrolled
            ? "bg-white/80 backdrop-blur-md shadow-md"
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <h1 className="text-2xl font-bold">
          <Link to="/">VTRYON</Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 font-medium">
          <li>
            <Link to="/men" className="hover:text-gray-500">Men</Link>
          </li>
          <li>
            <Link to="/women" className="hover:text-gray-500">Women</Link>
          </li>
          <li>
            <Link to="/new" className="hover:text-gray-500">New</Link>
          </li>
          <li>
            <Link to="/sale" className="hover:text-gray-500">Sale</Link>
          </li>
        </ul>

        {/* Right Icons */}
        <div className="hidden md:flex gap-6 text-lg">
          <Link to="/search">🔍</Link>
          <Link to="/cart">🛒</Link>
          <Link to="/profile">👤</Link>
        </div>

        {/* Mobile Menu */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-8 text-xl">
          <Link to="/men" onClick={() => setMenuOpen(false)}>Men</Link>
          <Link to="/women" onClick={() => setMenuOpen(false)}>Women</Link>
          <Link to="/new" onClick={() => setMenuOpen(false)}>New</Link>
          <Link to="/sale" onClick={() => setMenuOpen(false)}>Sale</Link>
          <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
          <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
        </div>
      )}
    </>
  );
};

export default Navbar;