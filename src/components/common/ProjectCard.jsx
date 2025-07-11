import GlassContainer from '../common/GlassContainer';
import GlassButton from '../common/GlassButton';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function ProjectCard({ project }) {
  return (
    <GlassContainer className='project-card flex flex-col'>
      <LazyLoadImage
        alt={`Screenshot of the ${project.title} project`}
        src={project.image}
        effect='blur'
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
  );
}

export default ProjectCard;
