import TypingEffect from '../TypingEffect';
import GlassButton from '../common/GlassButton';
import useScrollReveal from '../../hooks/useScrollReveal';

function Hero() {
  useScrollReveal([
    {
      selector: '.hero-content',
      config: {
        origin: 'top',
        distance: '50px',
        duration: 1500,
        delay: 200,
        reset: true,
      },
    },
  ]);

  return (
    <section
      id='hero'
      className='relative flex items-center justify-center min-h-[calc(100vh-88px)] text-center px-4 pt-10 pb-20'
      aria-labelledby='hero-heading'
    >
      <div className='hero-content z-10'>
        <img
          src='Ice-img.webp'
          alt='A relaxed portrait of Taninwat Kaewpankan'
          className='float-image mx-auto mb-8 w-48 h-48 object-cover border-4 border-glass-border shadow-lg'
          loading='lazy'
        />

        <h1 id='hero-heading' className='text-4xl sm:text-5xl font-bold'>
          I'm{' '}
          <span className='text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-hover'>
            Taninwat Kaewpankan
          </span>
          , <br /> a <TypingEffect />
        </h1>

        <p className='mt-4 max-w-xl mx-auto text-lg text-text-secondary'>
          A full-stack developer in training, passionate about building
          beautiful and functional applications from scratch.
        </p>

        <div className='mt-8 flex flex-wrap justify-center gap-4'>
          <GlassButton
            onClick={() =>
              document
                .getElementById('projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            View My Work
          </GlassButton>
          <GlassButton href='/my-resume.pdf'>View Resume</GlassButton>
        </div>
      </div>
    </section>
  );
}

export default Hero;
