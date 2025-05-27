import React from 'react';

const services = [
  {
    id: 1,
    title: 'Web Development',
    description:
      'Developing responsive, accessible, and performant web applications from scratch.',
  },
  {
    id: 2,
    title: 'Frontend Development',
    description:
      'Building interactive UIs with React, styled using Tailwind CSS or modern CSS practices.',
  },
  {
    id: 3,
    title: 'Backend Development',
    description:
      'Creating RESTful APIs and managing databases using Node.js, Express, and SQL.',
  },
  {
    id: 4,
    title: 'Full Stack Development',
    description:
      'Connecting the frontend and backend into a seamless, functional application.',
  },
  {
    id: 5,
    title: 'UI/UX Design',
    description:
      'Designing clean and intuitive user flows, with a focus on usability and clarity.',
  },
  {
    id: 6,
    title: 'API Development',
    description:
      'Working with external APIs and integrating third-party services into applications.',
  },
];

function Services() {
  return (
    <div className='bg-gray-900/60 text-white py-20' id='services'>
      <div className='container mx-auto px-8 md:px-16 lg:px-24'>
        <h2 className='text-4xl font-bold text-center mb-8'>What I Can Do</h2>
        <p className='text-center text-gray-400 mb-8'>
          These are the areas I’ve practiced through real-world projects and
          coursework as a full-stack developer in training.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service) => (
            <div
              key={service.id}
              className='bg-gray-800 px-6 pb-6 rounded-lg hover:shadow-lg transform transition-transform duration-300 hover:scale-105'
            >
              <div className='text-right mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-400'>
                {service.id}
              </div>
              <h3 className='mt-2 text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                {service.title}
              </h3>
              <p className='mt-2 text-gray-300'>{service.description}</p>
              {/* <a
                href='#'
                className='mt-4 inline-block text-green-400 hover:text-blue-500'
              >
                Read More
              </a> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
