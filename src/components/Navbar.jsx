import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faUser, faSignInAlt, faPenNib, faBook, faGlobe, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-[#F0F1FE] text-[#333] p-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <FontAwesomeIcon icon={faGlobe} />
        <span className="font-bold">CCC.</span>
      </div>
      <button className="lg:hidden text-[#333]" onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </button>
      <ul className={`lg:flex lg:items-center lg:gap-6 ${menuOpen ? 'block' : 'hidden'} mt-4 lg:mt-0`}>
        <li className="relative group">
          <button onClick={toggleDropdown} className="flex items-center gap-2 text-[#333] hover:text-white">
            <FontAwesomeIcon icon={faBars} /> Explore
          </button>
          {dropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white text-[#333] shadow-lg rounded-lg w-48 py-2">
              <a href="#section1" className="block px-4 py-2 hover:bg-[#575757] hover:text-white">Section 1</a>
              <a href="#section2" className="block px-4 py-2 hover:bg-[#575757] hover:text-white">Section 2</a>
              <a href="#section3" className="block px-4 py-2 hover:bg-[#575757] hover:text-white">Section 3</a>
              <a href="#section4" className="block px-4 py-2 hover:bg-[#575757] hover:text-white">Section 4</a>
            </div>
          )}
        </li>
        <li><a href="#need-writer" className="flex items-center gap-2 text-[#333] hover:text-white"><FontAwesomeIcon icon={faPenNib} /> I need Writer</a></li>
        <li><a href="#am-writer" className="flex items-center gap-2 text-[#333] hover:text-white"><FontAwesomeIcon icon={faPenNib} /> I am Writer</a></li>
        <li><a href="#am-publisher" className="flex items-center gap-2 text-[#333] hover:text-white"><FontAwesomeIcon icon={faBook} /> I am Publisher</a></li>
      </ul>
      <div className="flex items-center gap-4 mt-4 lg:mt-0">
        <button className="bg-[#444] text-white py-2 px-4 rounded hover:bg-white hover:text-[#444] flex items-center gap-2">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </button>
        <button className="bg-[#007bff] text-white py-2 px-4 rounded hover:bg-white hover:text-[#007bff] flex items-center gap-2">
          <FontAwesomeIcon icon={faUser} /> Sign Up
        </button>
        <button className="bg-[#007bff] text-white py-2 px-4 rounded hover:bg-white hover:text-[#007bff] flex items-center gap-2">
          <FontAwesomeIcon icon={faQuoteRight} /> Request a Quote
        </button>
      </div>
    </nav>
  );
}
