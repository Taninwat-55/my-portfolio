import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className='bg-gray-900/60 text-white py-8'>
      <div className='border-t border-gray-600 pt-4 w-[80%] mx-auto'>
        <div className='container mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center'>
          {/* LEFT SIDE */}
          <div className='mb-4 md:mb-0 text-left'>
            <h3 className='text-xl font-bold mb-1 sm:text-center md:text-start '>Taninwat Kaewpankan</h3>
            <p className='text-gray-400 sm:text-center md:text-start'>
              Full-Stack Developer in training — open to internship
              opportunities.
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className='flex flex-col-reverse md:flex-col-reverse items-center md:items-end text-center md:text-right'>
            <p className='text-gray-500 text-sm mt-2 md:mt-4'>
              &copy; {new Date().getFullYear()} Taninwat Kaewpankan
            </p>
            <div className='flex justify-center md:justify-end space-x-4'>
              <a
                href='https://github.com/Taninwat-55'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='GitHub'
              >
                <FaGithub className='text-gray-400 hover:text-white' />
              </a>
              <a
                href='https://www.linkedin.com/in/taninwat-k-a187951aa/'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='LinkedIn'
              >
                <FaLinkedin className='text-gray-400 hover:text-white' />
              </a>
              <a
                href='https://x.com/IceishhK'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Twitter'
              >
                <FaXTwitter className='text-gray-400 hover:text-white' />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
