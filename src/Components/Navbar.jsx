import React from "react";

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed z-50 top-4 left-1/2 transform -translate-x-1/2 bg-[#3a2b58] bg-opacity-70 text-white py-2 px-6 rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)]">
      <ul className="flex justify-center gap-20 text-lg font-bold">
        <li>
          <button
            onClick={() => scrollToSection("home")}
            className="hover:text-[#9849ff] transition duration-300"
          >
            Home
          </button>
        </li>
        <li>
          <button
            onClick={() => scrollToSection("about")}
            className="hover:text-[#bb8bfa] transition duration-300"
          >
            
            About
          </button>
        </li>
        <li>
          <a
            href="https://github.com/yashsrivasta7a"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#bb8bfa] transition duration-300"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
