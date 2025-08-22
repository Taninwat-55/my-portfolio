import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { projects as importedProjects } from '../data/projectsData';
import Modal from './Modal';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaGithub } from 'react-icons/fa';
import { FaExternalLinkAlt } from 'react-icons/fa';
import ProjectDetails from './ProjectDetails';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  image: string;
  github: string;
  demo: string;
}

const projects: Project[] = importedProjects;

const Projects = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleOpenModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (projectsRef.current) {
      const scrollAmount = direction === 'right' ? 330 : -330;
      projectsRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const projectsElement = projectsRef.current;
      if (projectsElement) {
        const cards = gsap.utils.toArray<HTMLElement>(
          projectsElement.querySelectorAll('.project-card')
        );

        // Animate the cards in on scroll
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
          }
        );

        // --- FIXED: Refactored hover animation with a cleaner approach ---
        cards.forEach((card) => {
          const hoverTween = gsap.to(card, { scale: 1.05, duration: 0.3, paused: true, });

          card.addEventListener('mouseenter', () => hoverTween.play());
          card.addEventListener('mouseleave', () => hoverTween.reverse());
        });
        // --- END OF FIX ---
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id='projects' ref={sectionRef} className='py-20 bg-dark-base text-dark-text'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-4xl font-heading font-bold mb-8 text-center'>
          My Projects
        </h2>
        <div className='relative'>
          <div
            className='flex space-x-6 overflow-x-auto projects-gallery'
            ref={projectsRef}
          >
            {projects.map((project) => (
              <div
                key={project.id}
                className='project-card flex flex-col min-w-[300px] bg-base dark:bg-dark-base rounded-lg shadow-lg overflow-hidden cursor-pointer'
                onClick={() => handleOpenModal(project)}
              >
                <LazyLoadImage
                  src={`/assets/${project.image}`}
                  alt={project.title}
                  className='w-full h-48 object-cover'
                  effect='blur'
                  placeholderSrc='/assets/placeholder.jpg'
                />
                <div className='p-4 flex flex-col flex-grow'>
                  <h3 className='text-xl font-heading font-bold mb-1'>
                    {project.title}
                  </h3>
                  <p className='text-sm font-body text-text/70 dark:text-dark-text/70 mb-3'>
                    {project.technologies}
                  </p>
                  <p className='text-sm font-body text-text/70 dark:text-dark-text/70 flex-grow'>
                    {project.description}
                  </p>
                  <div className='mt-4 flex gap-2'>
                    <a
                      href={project.github}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 px-3 py-1 bg-highlight/20 text-text rounded-full hover:bg-highlight/40 transition-colors font-body text-sm'
                    >
                      <FaGithub />
                      GitHub
                    </a>
                    <a
                      href={project.demo}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='flex items-center gap-2 px-3 py-1 bg-secondary/20 text-text rounded-full hover:bg-secondary/40 transition-colors font-body text-sm'
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => scroll('left')}
            className='absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-primary/80 hover:bg-primary transition-colors text-white z-10 hidden md:block'
            aria-label='Scroll projects left'
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={() => scroll('right')}
            className='absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-primary/80 hover:bg-primary transition-colors text-white z-10 hidden md:block'
            aria-label='Scroll projects right'
          >
            <FaArrowRight />
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedProject && <ProjectDetails project={selectedProject} />}
      </Modal>
    </section>
  );
};

export default Projects;