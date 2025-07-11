import useScrollReveal from '../../hooks/useScrollReveal';
import { projects } from '../../data/projectsData';
import ProjectCard from '../common/ProjectCard';

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

        {/* 3. The mapping logic is now much cleaner */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto'>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
