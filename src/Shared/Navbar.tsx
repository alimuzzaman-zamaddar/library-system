import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav className="bg-[#041345] text-white fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/">My Library</Link>
        </div>

        {/* Hamburger Toggle Button - visible only on mobile */}
        <button
          onClick={() => setIsOpen(true)}
          className="focus:outline-none block lg:hidden"
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Desktop Menu - visible only on tablet+ */}
        <div className="hidden lg:flex space-x-6 text-lg font-medium">
          <Link to="/" className="hover:text-blue-300 transition">
            Home
          </Link>
          <Link to="/create-book" className="hover:text-blue-300 transition">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:text-blue-300 transition">
            Borrow Summary
          </Link>
        </div>
      </div>

      {/* Mobile Slide-out Menu (always mounted for animation) */}
      <div
        ref={menuRef}
        className={`fixed top-0 left-0 w-64 h-full bg-[#041345]  z-50 p-5 transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white hover:text-red-400 transition"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-4 text-lg font-medium">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-300 transition"
          >
            Home
          </Link>
          <Link
            to="/create-book"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-300 transition"
          >
            Add Book
          </Link>
          <Link
            to="/borrow-summary"
            onClick={() => setIsOpen(false)}
            className="hover:text-blue-300 transition"
          >
            Borrow Summary
          </Link>
        </nav>
      </div>

      {/* Background overlay only visible when menu is open */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-40 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
    </nav>
  );
};

export default Navbar;
