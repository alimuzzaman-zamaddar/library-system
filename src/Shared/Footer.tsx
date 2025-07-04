const Footer = () => {
  return (
    <footer className="bg-[#041345] text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-2">My Library</h2>
          <p className="text-gray-300">
            A smart way to manage, borrow, and explore books in your collection.
          </p>
        </div>

        {/* Column 2 - Links */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>
            <li>
              <a href="/create-book" className="hover:text-white transition">
                Add Book
              </a>
            </li>
            <li>
              <a href="/borrow-summary" className="hover:text-white transition">
                Borrow Summary
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 - Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Resources</h3>
          <ul className="space-y-1 text-gray-300">
            <li>
              <a href="#" className="hover:text-white transition">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                GitHub
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition">
                Support
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4 - Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Contact</h3>
          <ul className="space-y-1 text-gray-300">
            <li>
              Email:{" "}
              <a href="mailto:info@mylibrary.com" className="hover:text-white">
                info@mylibrary.com
              </a>
            </li>
            <li>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:text-white">
                +1 (234) 567-890
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} My Library. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
