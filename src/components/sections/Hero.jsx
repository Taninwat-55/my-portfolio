import TypingEffect from '../TypingEffect';
import GradientButton from '../common/GradientButton';
import useScrollReveal from '../../hooks/useScrollReveal';

function Hero() {
  useScrollReveal([
    {
      selector: '.hero-img',
      config: {
        origin: 'bottom',
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: true,
      },
    },
    {
      selector: '.hero-title',
      config: {
        origin: 'top',
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: true,
      },
    },
  ]);

  return (
    <div id='hero' className='bg-gray-900/60 text-white text-center py-16'>
      <img
        src='Relaxed_pic_Ice.jpg'
        alt='Profile'
        className='hero-img mx-auto mb-8 w-48 h-48 rounded-full object-cover transform transition-transform duration-300 hover:scale-105'
      />
      <h1 className='hero-title text-4xl font-bold'>
        I'm{' '}
        <span className='text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
          Taninwat Kaewpankan
        </span>
        , <TypingEffect />
      </h1>
      <p className='mt-4 text-lg text-gray-300 px-4'>
        Currently learning by doing — check out my latest projects below.
      </p>
      <div className='mt-8 space-x-4'>
        <GradientButton
          onClick={() => {
            const el = document.getElementById('projects');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className='cursor-pointer bg-gradient-to-r from-green-400 to-blue-500'
        >
          See Projects
        </GradientButton>

        <GradientButton
          href='my-resume.pdf'
          className='bg-gradient-to-r from-orange-500 to-yellow-500'
        >
          Resume
        </GradientButton>
      </div>
    </div>
  );
}

export default Hero;
