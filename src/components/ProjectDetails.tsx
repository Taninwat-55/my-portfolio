import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  image: string;
  github: string;
  demo: string;
}

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <div className='text-dark-text'>
      <h3 className='text-4xl font-heading font-bold mb-4'>{project.title}</h3>
      <div className='mb-4'>
        <LazyLoadImage
          src={`/assets/${project.image}`}
          alt={project.title}
          className='w-full h-auto rounded-lg mb-4'
          effect='blur'
          placeholderSrc='/assets/placeholder.jpg'
        />
        <h4 className='font-heading text-secondary font-semibold text-sm'>
          Technologies
        </h4>
        <p className='text-sm font-body text-text/70 dark:text-dark-text/70 mb-4'>
          {project.technologies}
        </p>
        <h4 className='font-heading text-secondary font-semibold text-sm'>
          Description
        </h4>
        <p className='text-lg font-body mt-2'>{project.description}</p>
      </div>
      <div className='flex gap-4'>
        <a
          href={project.github}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block px-4 py-2 bg-secondary/20 text-base rounded-full font-body hover:bg-highlight/40 transition-colors'
        >
          <span className='flex items-center gap-2'>
            <FaGithub /> View on GitHub
          </span>
        </a>
        <a
          href={project.demo}
          target='_blank'
          rel='noopener noreferrer'
          className='inline-block px-4 py-2 bg-secondary/20 text-base rounded-full font-body hover:bg-highlight/40 transition-colors'
        >
          <span className='flex items-center gap-2'>
            <FaExternalLinkAlt /> Live Demo
          </span>
        </a>
      </div>
    </div>
  );
};

export default ProjectDetails;
