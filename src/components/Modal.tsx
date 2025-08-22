import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
      gsap.to(backdropRef.current, { opacity: 1, duration: 0.3 });
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power3.out' }
      );
    } else {
      document.body.style.overflow = 'auto'; // Re-enable scrolling
      gsap.to(modalRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.2,
        ease: 'power3.in',
      });
      gsap.to(backdropRef.current, { opacity: 0, duration: 0.2 });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={backdropRef}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 opacity-0'
      onClick={onClose}
      aria-modal='true'
      role='dialog'
    >
      <div
        ref={modalRef}
        className='relative w-full max-w-lg rounded-lg bg-dark-base p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        <button
          onClick={onClose}
          className='absolute top-3 right-3 text-2xl text-text/50 hover:text-secondary transition-colors'
          aria-label='Close modal'
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;