import GlassContainer from '../common/GlassContainer';
import useScrollReveal from '../../hooks/useScrollReveal';

// You can keep this data array at the top of the file or move it to your data folder.
const services = [
  {
    id: 1,
    title: 'Web Development',
    description: 'Developing responsive, accessible, and performant web applications from scratch.',
  },
  {
    id: 2,
    title: 'Frontend Development',
    description: 'Building interactive UIs with React, styled using Tailwind CSS or modern CSS practices.',
  },
  {
    id: 3,
    title: 'Backend Development',
    description: 'Creating RESTful APIs and managing databases using Node.js, Express, and SQL.',
  },
  {
    id: 4,
    title: 'Full Stack Development',
    description: 'Connecting the frontend and backend into a seamless, functional application.',
  },
  {
    id: 5,
    title: 'API Development',
    description: 'Working with external APIs and integrating third-party services into applications.',
  },
  {
    id: 6,
    title: 'UI/UX Principles',
    description: 'Designing clean and intuitive user flows, with a focus on usability and clarity.',
  },
];

function Services() {
  useScrollReveal([
    {
      selector: '.service-card',
      config: {
        origin: 'bottom',
        distance: '50px',
        duration: 1000,
        interval: 200, // This will animate each card one after the other
        reset: true,
      },
    },
  ]);

  return (
    <section 
      id="services" 
      className="py-20 px-4"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto text-center">
        <h2 id="services-heading" className="text-4xl font-bold mb-4">
          What I Do
        </h2>
        <p className="max-w-2xl mx-auto text-text-secondary mb-12">
          Through my projects and coursework, I've gained experience in the full lifecycle of web development. Here are the key areas I focus on.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <GlassContainer key={service.id} className="service-card text-left">
              <h3 className="text-2xl font-bold text-accent mb-2">
                {service.title}
              </h3>
              <p className="text-text-secondary">
                {service.description}
              </p>
            </GlassContainer>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;