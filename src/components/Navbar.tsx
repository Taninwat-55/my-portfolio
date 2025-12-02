import { useState } from 'react';
import { FaBars, FaTimes, FaDownload } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Projects', id: 'projects' },
  { name: 'Skills', id: 'skills' },
  { name: 'Contact', id: 'contact' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    const container = document.querySelector('.horizontal-scroll-container');
    const element = document.getElementById(id);
    
    if (container && element) {
      // Calculate the position of the element inside the container
      const offsetLeft = element.offsetLeft;
      container.scrollTo({
        left: offsetLeft,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className='fixed top-0 left-0 w-full z-50 border-b border-text/10 bg-dark-base/90 backdrop-blur-md'>
      <div className='max-w-full mx-auto px-6 lg:px-12 flex justify-between items-center h-16'>
        <button onClick={() => handleNavClick('hero')} className='text-xl font-heading font-bold tracking-tighter cursor-pointer'>
          <span className="text-primary">TK</span>.PORTFOLIO
        </button>

        {/* Desktop Nav */}
        <ul className='hidden md:flex space-x-8'>
          {navLinks.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => handleNavClick(item.id)}
                className='font-body text-sm text-text/70 hover:text-primary transition-colors uppercase tracking-wider font-bold'
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>

        <div className='hidden md:block'>
           <a
            href='/my-resume.pdf'
            download='Taninwat-Kaewpankan-Resume.pdf'
            className='flex items-center gap-2 px-4 py-2 text-xs font-bold bg-primary text-dark-base hover:bg-white transition-colors font-heading rounded-sm'
          >
            <FaDownload /> RESUME
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className='md:hidden text-2xl text-primary'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='md:hidden absolute top-16 left-0 w-full bg-dark-base border-b border-text/10'>
          <ul className='flex flex-col items-center space-y-6 py-8'>
            {navLinks.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className='font-heading text-lg text-text hover:text-primary uppercase'
                >
                  {item.name}
                </button>
              </li>
            ))}
             <li>
              <a
                href='/my-resume.pdf'
                className='text-primary font-bold font-body'
              >
                DOWNLOAD RESUME
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;