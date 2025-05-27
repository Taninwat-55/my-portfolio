import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <div className='bg-gray-900/60 text-white py-20' id='contact'>
      <div className='container mx-auto px-8 md:px-16 lg:px-24'>
        <h2 className='text-4xl font-bold text-center mb-12'>Contact</h2>
        <div className='flex flex-col md:flex-row items-center md:space-x-12'>
          <div className='flex-1'>
            <h3 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 mb-4'>
              Let's Connect
            </h3>
            <p className='text-lg mb-4'>
              I'm actively looking for an internship opportunity in full-stack
              development. If you think I might be a good fit for your team,
              feel free to reach out!
            </p>
            <div className='mb-4'>
              <FaEnvelope className='inline-block text-green-400 mr-2'></FaEnvelope>
              <a
                href='mailto:taninwat.kaewpankan@gmail.com'
                className='hover:underline'
              >
                taninwat.kaewpankan@gmail.com
              </a>
            </div>
          </div>
          <div className='flex-1 w-full text-center md:text-left bg-gray-800 p-6 rounded-lg shadow-md'>
            <h4 className='text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
              What I’m Looking For
            </h4>
            <p className='text-gray-300 mb-2'>
              I'm available for a frontend or full-stack internship starting
              immediately. I’m especially excited about working with React,
              Node.js, Next.js or anything that helps me grow as a developer.
            </p>
            <p className='text-gray-400'>
              Remote or hybrid opportunities preferred — based in Copenhagen, Denmark,
              and open to commuting around the Copenhagen–Malmö area.
            </p>
          </div>
          {/* Keep this for now */}
          {/* <div className='flex-1 w-full'>
            <form className='space-y-4'>
              <div>
                <label htmlFor='name' className='block mb-2'>
                  Your Name
                </label>
                <input
                  type='text'
                  className='w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400'
                  placeholder='Enter Your Name'
                />
              </div>
              <div>
                <label htmlFor='email' className='block mb-2'>
                  Email
                </label>
                <input
                  type='text'
                  className='w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400'
                  placeholder='Enter Your Email'
                />
              </div>
              <div>
                <label htmlFor='message' className='block mb-2'>
                  Message
                </label>
                <textarea
                  rows='5'
                  type='text'
                  className='w-full p-2 rounded bg-gray-800 border border-gray-600 focus:outline-none focus:border-green-400'
                  placeholder='Enter Your Message'
                />
              </div>
              <button className='bg-gradient-to-r from-green-400 to-blue-500 text-white hidden md:inline transform transition-transform duration-300 hover:scale-105 px-6 py-2 rounded-full'>
                Send
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Contact;
