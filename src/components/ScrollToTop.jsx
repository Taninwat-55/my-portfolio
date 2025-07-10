import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 p-3 rounded-full
                  border border-glass-border bg-glass-bg backdrop-blur-sm
                  shadow-lg transition-all duration-300
                  hover:bg-white/20 hover:border-white/50 hover:scale-110
                  ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}
      aria-label="Scroll to Top"
    >
      <FaArrowUp />
    </button>
  );
}

export default ScrollToTop;