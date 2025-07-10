import GlassContainer from '../common/GlassContainer';
import GlassButton from '../common/GlassButton';
import useScrollReveal from '../../hooks/useScrollReveal';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

// This project data will be moved to a separate file in /src/data later
const projects = [
  {
    id: 1,
    title: 'Cinema Booking System',
    description:
      'A full-stack application featuring real-time seat selection, user booking management, and a secure admin panel for content management. Built to demonstrate proficiency in RESTful API design and state management in React.',
    technologies: 'React (Vite), Node.js, Express.js, SQLite',
    image: 'cinema-project-img.png',
    github: 'https://github.com/Taninwat-55/cinema-booking-system-project',
    demo: 'https://cinema-booking-system-project.vercel.app',
  },
  {
    id: 2,
    title: 'Forum Web Application',
    description:
      'A dynamic forum where users can manage their own content. This project focuses on full CRUD (Create, Read, Update, Delete) functionality, user-generated content, and building a structured backend with a relational database.',
    technologies: 'React (Vite), Node.js, Express.js, SQLite',
    image: 'Forum-img.webp',
    github: 'https://github.com/Taninwat-55/Forum-App-Project-React',
    demo: 'https://forum-app-project-react.vercel.app',
  },
  {
    id: 3,
    title: 'Racha Beauty & Wellness',
    description:
      'A responsive, SEO-optimized website built for a real-world client to enhance their online presence and streamline appointment inquiries. Features a clean design and a functional contact form.',
    technologies: 'React (Vite), Node.js, Express.js, Tailwind CSS',
    image: 'Racha_img.webp',
    github: 'https://github.com/Taninwat-55/rachabeautywellness',
    demo: 'https://rachabeautywellness.com',
  },
  // {
  //   id: 4,
  //   title: 'Interactive Sign-Up Form',
  //   description:
  //     'A pixel-perfect implementation of a design challenge, focusing on advanced client-side form validation, custom error handling, and responsive design principles without relying on a framework.',
  //   technologies: 'HTML, CSS',
  //   image: 'sign-up-form-project.webp',
  //   github: 'https://github.com/Taninwat-55/Intro-component-with-sign-up-form',
  //   demo: 'https://taninwat-55.github.io/Intro-component-with-sign-up-form/',
  // },
];

function Projects() {
  useScrollReveal([
    {
      selector: '.project-card',
      config: {
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        interval: 200,
        reset: true,
      },
    },
  ]);

  return (
    <section
      id='projects'
      className='py-20 px-4'
      aria-labelledby='projects-heading'
    >
      <div className='container mx-auto'>
        <h2
          id='projects-heading'
          className='text-4xl font-bold text-center mb-12'
        >
          My Work
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {projects.map((project) => (
            <GlassContainer
              key={project.id}
              className='project-card flex flex-col'
            >
              {/* <img
                src={project.image}
                alt={`Screenshot of the ${project.title} project`}
                className='rounded-lg mb-4 w-full h-56 object-cover object-top'
                loading='lazy'
              /> */}
              <LazyLoadImage
                alt={`Screenshot of the ${project.title} project`}
                src={project.image}
                effect='blur' // Adds a nice blur-up effect while loading
                className='rounded-lg mb-4 w-full h-56 object-cover object-top'
              />
              <div className='flex flex-col flex-grow'>
                <h3 className='text-2xl font-bold mb-2'>{project.title}</h3>
                <p className='text-text-secondary mb-4 flex-grow'>
                  {project.description}
                </p>
                <p className='text-sm text-accent font-semibold mb-6'>
                  {project.technologies}
                </p>
                <div className='flex flex-wrap gap-3 mt-auto'>
                  <GlassButton href={project.github}>GitHub</GlassButton>
                  <GlassButton href={project.demo}>Live Demo</GlassButton>
                </div>
              </div>
            </GlassContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
