import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTop = () => {
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
    visible && (
      <button
        onClick={scrollToTop}
        className='fixed bottom-4 right-4 bg-gradient-to-r from-green-400 to-blue-500 text-white p-2 md:p-3 rounded-full shadow-lg hover:scale-110 transition-transform'
        aria-label='Scroll to Top'
        aria-hidden="true"
      >
        <FaArrowUp />
      </button>
    )
  );
};

export default ScrollToTop;
