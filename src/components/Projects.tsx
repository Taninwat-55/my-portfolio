import { useState } from 'react';
import { projects } from '../data/projects';
import { FaGithub, FaExternalLinkAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextProject = () => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const currentProject = projects[currentIndex];

  return (
    <div className="flex flex-col h-full justify-center">
      {/* Header removed to avoid clash with BlockWrapper title */}
      
      {/* Navigation Controls moved to align with content */}
      <div className="flex justify-end mb-4">
        <div className="flex gap-2">
          <button onClick={prevProject} className="p-3 border border-text/20 hover:border-primary hover:text-primary transition-colors text-white rounded bg-dark-base">
            <FaChevronLeft />
          </button>
          <button onClick={nextProject} className="p-3 border border-text/20 hover:border-primary hover:text-primary transition-colors text-white rounded bg-dark-base">
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Project Image Area */}
        <div className="lg:col-span-7 relative group">
          <div className="absolute inset-0 bg-primary/20 transform translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform duration-300"></div>
          <div className="relative border border-text/10 bg-dark-base overflow-hidden h-[300px] md:h-[450px]">
             {/* No blur, clean image */}
             <img
                src={`/assets/${currentProject.image}`}
                alt={currentProject.title}
                className="w-full h-full object-cover object-top opacity-100"
             />
          </div>
        </div>

        {/* Project Details */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <h3 className="text-3xl font-heading font-bold mb-4 text-white leading-tight">
            {currentProject.title}
          </h3>
          
          <div className="bg-white/5 p-6 border-l-2 border-primary mb-6 backdrop-blur-sm rounded-r">
            <p className="font-body text-gray-300 leading-relaxed text-sm md:text-base">
              {currentProject.description}
            </p>
          </div>

          <div className="mb-8">
            <span className="font-code text-primary text-xs mb-2 block tracking-wider">TECH STACK:</span>
            <div className="flex flex-wrap gap-2 font-code text-xs">
              {currentProject.technologies.split(', ').map((tech, i) => (
                <span key={i} className="px-3 py-1 bg-dark-base border border-white/10 text-gray-300 rounded-full">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 mt-auto">
            <a href={currentProject.github} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center border border-white/20 text-white hover:border-primary hover:text-primary font-bold font-heading tracking-wide transition-colors rounded">
              <span className="flex items-center justify-center gap-2"><FaGithub /> CODE</span>
            </a>
            <a href={currentProject.demo} target="_blank" rel="noreferrer" className="flex-1 py-3 text-center bg-primary text-dark-base hover:bg-white transition-colors font-bold font-heading tracking-wide rounded">
               <span className="flex items-center justify-center gap-2"><FaExternalLinkAlt /> LIVE</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Progress Dots */}
      <div className="flex gap-1 mt-8 justify-center">
        {projects.map((_, idx) => (
          <div 
            key={idx} 
            className={`h-1 w-8 rounded-full transition-colors duration-300 ${idx === currentIndex ? 'bg-primary' : 'bg-white/10'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;