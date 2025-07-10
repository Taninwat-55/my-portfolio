import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import GlassButton from './GlassButton';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header 
      role="banner"
      className="sticky top-4 z-50 mx-auto w-[95%] max-w-7xl"
    >
      <div className="relative rounded-xl border border-glass-border bg-glass-bg p-4 backdrop-blur-lg">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="text-2xl font-bold">
            Taninwat
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex" aria-label="Main navigation">
            <ul className="flex items-center space-x-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-text-secondary hover:text-text-hover transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:block">
            <GlassButton onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Contact Me
            </GlassButton>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" aria-expanded={isOpen} className="text-2xl">
              <FaBars />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="mt-4 border-t border-glass-border pt-4 md:hidden" aria-label="Mobile navigation">
            <ul className="flex flex-col items-center space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a 
                    href={link.href}
                    className="text-text-secondary hover:text-text-hover"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <GlassButton onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  setIsOpen(false);
              }}>
                Contact Me
              </GlassButton>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;