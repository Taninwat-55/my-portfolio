import React, { useState } from 'react';

const projects = [
  {
    id: 1,
    title: 'Cinema Booking System',
    description:
      'A full-stack cinema booking system where users can browse movies, select seats, and book tickets. Admins can manage movies and showings.',
    technologies: 'React, Node.js, Express.js, SQLite',
    image: 'cinema-project-img.png',
    video: 'cinema-project-movie.mov',
    gif: 'cinema.gif',
    github: 'https://github.com/Taninwat-55/cinema-booking-system-project',
  },
  {
    id: 2,
    title: 'Forum Web Appplication',
    description:
      'A simple web application for a forum where users can add, edit and delete a thread as well as sharing ideas and discuss various topics.',
    technologies: 'React, Node.js, Express.js, SQLite',
    image: 'Forum-img.png',
    video: 'Forum-video.mov',
    gif: 'forum.gif',
    github: 'https://github.com/Taninwat-55/Forum-App-Project-React',
  },
  {
    id: 3,
    title: 'Sign-Up Form',
    description:
      'A responsive sign-up form with form validation, error handling, and hover effects built from a design challenge.',
    technologies: 'HTML, CSS, JavaScript',
    image: 'sign-up-form-project.png',
    video: 'signup-project.mov',
    gif: 'signup.gif',
    github: 'https://github.com/Taninwat-55/Intro-component-with-sign-up-form',
  },
];

function Portfolio() {
  const [playingId, setPlayingId] = useState(null);

  const handleClick = (id) => {
    setPlayingId(id);
  };

  return (
    <div>
      <div className='bg-black text-white py-20' id='projects'>
        <div className='container mx-auto px-8 md:px-16 lg:px-24'>
          <h2 className='text-4xl font-bold text-center mb-12'>Projects</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map((project) => (
              <div
                key={project.id}
                className='bg-gray-800 p-6 rounded-lg flex flex-col justify-between hover:shadow-lg transform transition-transform duration-300 hover:scale-105 '
              >
                <div
                  onClick={() => handleClick(project.id)}
                  className='cursor-pointer mb-4'
                >
                  {playingId === project.id ? (
                    <img
                      src={project.gif}
                      alt={`${project.title} preview`}
                      className='rounded-lg mb-4 w-full h-48 object-cover'
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className='rounded-lg mb-4 w-full h-48 object-cover'
                    />
                  )}
                  {/* {playingId === project.id ? (
                    <video
                      src={project.video}
                      controls
                      autoPlay
                      loop
                      muted
                      className='rounded-lg mb-4 w-full h-48 object-cover'
                    />
                  ) : (
                    <img
                      src={project.image}
                      alt={project.title}
                      className='rounded-lg mb-4 w-full h-48 object-cover'
                    />
                  )} */}
                </div>

                <div className='flex flex-col flex-grow justify-between'>
                  <h3 className='text-2xl font-bold mb-2 min-h-[56px]'>
                    {project.title}
                  </h3>
                  <p className='text-gray-400 mb-4 min-h-[96px]'>
                    {project.description}
                  </p>
                  <p className='text-gray-300 font-bold mb-4 min-h-[28px]'>
                    {project.technologies}
                  </p>
                  <a
                    href={project.github}
                    className='bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-full self-start'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Github
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
