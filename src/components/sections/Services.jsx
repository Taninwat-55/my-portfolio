import useScrollReveal from '../../hooks/useScrollReveal';
import {services} from '../../data/servicesData';
import ServiceCard from '../common/ServiceCard';

function Services() {
  useScrollReveal([
    {
      selector: '.service-card',
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
      id='services'
      className='py-20 px-4'
      aria-labelledby='services-heading'
    >
      <div className='container mx-auto text-center'>
        <h2 id='services-heading' className='text-4xl font-bold mb-4'>
          What I Do
        </h2>
        <p className='max-w-2xl mx-auto text-text-secondary mb-12'>
          Through my projects and coursework, I've gained experience in the full
          lifecycle of web development. Here are the key areas I focus on.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
