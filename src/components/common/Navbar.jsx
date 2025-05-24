import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa6';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='bg-black text-white px-8 md:px-16 lg:px-24'>
      <div className='py-4 flex justify-between items-center relative'>
        {/* Logo (Visible on all screens) */}
        <div className='text-2xl font-bold border-2 px-2'>Taninwat</div>

        {/* Links (hidden on small, visible on md+) */}
        <div className='space-x-6 hidden md:flex'>
          <a href='#hero' className='hover:text-gray-400'>
            Home
          </a>
          <a href='#services' className='hover:text-gray-400'>
            Services
          </a>
          <a href='#projects' className='hover:text-gray-400'>
            Projects
          </a>
          <a href='#about' className='hover:text-gray-400'>
            About
          </a>
          <a href='#contact' className='hover:text-gray-400'>
            Contact
          </a>
        </div>

        {/* CTA Button (only on md+) */}
        <button
          onClick={() => {
            const el = document.getElementById('contact');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className='hidden md:inline bg-gradient-to-r from-green-400 to-blue-500 text-white transform transition-transform duration-300 hover:scale-105 px-4 py-2 rounded-full'
        >
          Contact Me
        </button>

        {/* Hamburger Icon (only on small screens, right-aligned) */}
        <div className='md:hidden text-2xl cursor-pointer'>
          <FaBars onClick={handleToggle} />
        </div>
      </div>

      {/* Mobile Menu (horizontal) */}
      {isOpen && (
        <div className='flex flex-row flex-wrap justify-center gap-4 px-4 py-2 md:hidden border-t border-gray-700'>
          <a
            href='#hero'
            className='hover:text-gray-400'
            onClick={handleToggle}
          >
            Home
          </a>
          <a
            href='#services'
            className='hover:text-gray-400'
            onClick={handleToggle}
          >
            Services
          </a>
          <a
            href='#projects'
            className='hover:text-gray-400'
            onClick={handleToggle}
          >
            Projects
          </a>
          <a
            href='#about'
            className='hover:text-gray-400'
            onClick={handleToggle}
          >
            About
          </a>
          <a
            href='#contact'
            className='hover:text-gray-400'
            onClick={handleToggle}
          >
            Contact
          </a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
