import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className='bg-base text-text/70 py-8 px-4'>
      <div className='max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6'>
        {/* Social Links */}
        <div className='flex items-center gap-4'>
          <a
            href='https://github.com/Taninwat-55'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='GitHub'
            className='text-2xl hover:text-secondary transition-colors'
          >
            <FaGithub />
          </a>
          <a
            href='https://www.linkedin.com/in/taninwat-kaewpankan/'
            target='_blank'
            rel='noopener noreferrer'
            aria-label='LinkedIn'
            className='text-2xl hover:text-secondary transition-colors'
          >
            <FaLinkedin />
          </a>
          <a
            href='mailto:taninwat.kaewpankan@gmail.com'
            aria-label='Email'
            className='text-2xl hover:text-secondary transition-colors'
          >
            <FaEnvelope />
          </a>
        </div>

        {/* Copyright */}
        <p className='text-sm font-body order-last md:order-none'>
          &copy; {new Date().getFullYear()} Taninwat Kaewpankan. All Rights Reserved.
        </p>

        {/* Built With */}
        <div className='flex items-center gap-2 text-sm'>
          <span>Built with</span>
          <FaReact className='text-sky-400' />
          <span>&</span>
          <SiTailwindcss className='text-teal-400' />
        </div>
      </div>
    </footer>
  );
};

export default Footer;