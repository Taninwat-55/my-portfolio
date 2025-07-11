import GlassContainer from '../common/GlassContainer';

function ServiceCard({ service }) {
  return (
    <GlassContainer className='service-card text-left'>
      <h3 className='text-2xl font-bold text-accent mb-2'>{service.title}</h3>
      <p className='text-text-secondary'>{service.description}</p>
    </GlassContainer>
  );
}

export default ServiceCard;
