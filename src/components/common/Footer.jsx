import React from 'react';
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

function Footer() {
  return (
    <footer className='bg-black text-white py-8'>
  <div className='border-t border-gray-600 pt-4'>
    <div className='container mx-auto px-8 md:px-16 lg:px-24 flex flex-col md:flex-row justify-between items-center'>
      {/* LEFT SIDE */}
      <div className='mb-4 md:mb-0 text-left'>
        <h3 className='text-xl font-bold mb-1'>Taninwat Kaewpankan</h3>
        <p className='text-gray-400'>
          Full-Stack Developer in training — open to internship opportunities.
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
    // <footer className='bg-black text-white py-8'>
    //   <div className='container mx-auto px-8 md:px-16 lg:px-24'>
    //     <div className='flex flex-col md:flex-row md:space-x-12 items-center mb-4'>
    //       <div className='flex-1 mb-4 md:db-0'>
    //         <h3 className='text-2xl font-bold mb-2'>Taninwat</h3>
    //         <p className='text-gray-400'>
    //           Full-Stack Developer based in Copenhagen, Denmark, specializing in
    //           web development
    //         </p>
    //       </div>
    //       <div className='flex-1 w-full'>
    //         <form className='flex items-center justify-center'>
    //           <input
    //             type='email'
    //             placeholder='Enter Email'
    //             className='w-full p-2 rounded-l-lg bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400'
    //           />
    //           <button
    //             type='submit'
    //             className='bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-r-lg'
    //           >
    //             Subscribe
    //           </button>
    //         </form>
    //       </div>
    //     </div>

    //     <div className='border-t border-gray-600 pt-4 flex flex-col md:flex-row justify-between items-center'>
    //       <p className='text-gray-400'>&copy; {new Date().getFullYear()}</p>

    //       <div className='flex space-x-4 my-4 md:my-0'>
    //         <a
    //           href='https://www.linkedin.com/in/taninwat-k-a187951aa/'
    //           aria-label='LinkedIn profile'
    //           target='_blank'
    //           rel='noopener noreferrer'
    //           className='text-gray-400 hover:text-white'
    //         >
    //           <FaLinkedin />
    //         </a>
    //         <a
    //           href='https://x.com/IceishhK'
    //           aria-label='X profile'
    //           target='_blank'
    //           rel='noopener noreferrer'
    //           className='text-gray-400 hover:text-white'
    //         >
    //           <FaXTwitter />
    //         </a>
    //         <a
    //           href='https://github.com/Taninwat-55'
    //           aria-label='GitHub profile'
    //           target='_blank'
    //           rel='noopener noreferrer'
    //           className='text-gray-400 hover:text-white'
    //         >
    //           <FaGithub />
    //         </a>
    //       </div>
    //       <div className='flex space-x-4'>
    //         <a href='' className='text-gray-400 hover:text-white'>
    //           Privacy
    //         </a>
    //         <a href='' className='text-gray-400 hover:text-white'>
    //           Terms of Services
    //         </a>
    //       </div>
    //     </div>
    //   </div>
    // </footer>
  );
}

export default Footer;
