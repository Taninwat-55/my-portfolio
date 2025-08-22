import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaBars, FaTimes } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );

      ScrollTrigger.create({
        trigger: 'body',
        start: 'top -50px',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.direction === 1) {
            navRef.current?.classList.add('scrolled');
          } else {
            navRef.current?.classList.remove('scrolled');
          }
        },
      });

      const sections = gsap.utils.toArray<HTMLElement>('section');
      sections.forEach((section) => {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) {
              const id = section.getAttribute('id');
              document.querySelectorAll('.nav-link').forEach((link) => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                  link.classList.add('active');
                }
              });
            }
          },
        });
      });
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className='navbar fixed top-0 left-0 w-full z-50 transition-all duration-300'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4'>
        <a
          href='#hero'
          className='text-2xl font-heading font-bold border border-primary p-2 text-primary'
        >
          Taninwat
        </a>

        <ul className='hidden md:flex space-x-6'>
          {navLinks.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className='nav-link nav-link-animated text-text dark:text-dark-text hover:text-secondary transition-colors font-body'
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-4'>
          <a
            href='/my-resume.pdf'
            download='Taninwat-Kaewpankan-Resume.pdf'
            className='hidden md:block px-4 py-2 text-sm rounded-full bg-primary/20 text-text dark:text-dark-text hover:bg-highlight/40 transition-colors font-body'
          >
            Resume
          </a>

          <button
            onClick={toggleDarkMode}
            className='p-2 rounded-full bg-primary/20 text-dark-text hover:bg-secondary/40 transition-colors'
            aria-label='Toggle dark mode'
          >
            {isDark ? '☀️' : '🌙'}
          </button>

          <button
            className='md:hidden text-2xl text-text dark:text-dark-text relative w-6 h-6'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='Toggle mobile menu'
            aria-expanded={isMenuOpen}
          >
            <FaBars
              className={`absolute top-0 left-0 transition-all duration-300 ${
                isMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
              }`}
            />
            <FaTimes
              className={`absolute top-0 left-0 transition-all duration-300 ${
                isMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
              }`}
            />
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className='md:hidden absolute top-full left-0 w-full bg-base/90 dark:bg-dark-base/90 backdrop-blur-sm transition-all duration-300 ease-in-out'>
          <ul className='flex flex-col items-center space-y-4 py-4'>
            <li>
              <a
                href='/my-resume.pdf'
                download='Taninwat-Kaewpankan-Resume.pdf'
                onClick={() => setIsMenuOpen(false)}
                className='nav-link text-text dark:text-dark-text hover:text-secondary transition-colors font-body text-lg'
              >
                Resume
              </a>
            </li>
            {navLinks.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className='nav-link text-text dark:text-dark-text hover:text-secondary transition-colors font-body text-lg'
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
