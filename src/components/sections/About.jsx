import useScrollReveal from '../../hooks/useScrollReveal';
import GlassContainer from '../common/GlassContainer';
import skillsData from '../../data/skillsData';
import EducationTimeline from '../common/about/EducationTimeline';
import ExperienceTimeline from '../common/about/ExperienceTimeline';

function About() {
  useScrollReveal([
    {
      selector: '.about-left-panel',
      config: {
        origin: 'left',
        distance: '80px',
        duration: 1500,
        delay: 200,
        reset: true,
      },
    },
    {
      selector: '.about-right-panel',
      config: {
        origin: 'right',
        distance: '80px',
        duration: 1500,
        delay: 200,
        reset: true,
      },
    },
  ]);

  return (
    <section id='about' className='py-20 px-4' aria-labelledby='about-heading'>
      <div className='container mx-auto'>
        <h2 id='about-heading' className='text-4xl font-bold text-center mb-12'>
          About Me
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <GlassContainer className='about-left-panel'>
            <h3 className='text-3xl font-bold mb-6 text-accent'>My Story</h3>
            <p className='text-text-secondary mb-8'>
              I’ve always loved turning creative ideas into something real.
              That’s what first led me to study Game Design—I had big ideas for
              stories that felt too hard to make into films, and I saw games as
              a way to bring them to life in a more interactive and expressive
              way.
              <br />
              <br />
              Later on, I did a Master’s in Business and Entrepreneurship, where
              I started thinking more about how to take creative concepts and
              turn them into real products that people actually use and find
              value in.
              <br />
              <br />
              Eventually, I got into web development because it brought those
              two worlds together. It lets me build things that are not only
              functional, but also thoughtful and creative. These days, I use
              everything I’ve learned—from game systems to business strategy—to
              build web apps that are useful, engaging, and fun to use.
            </p>
            <EducationTimeline />
            <ExperienceTimeline />
          </GlassContainer>
          <div className='about-right-panel space-y-8'>
            <h3 className='text-3xl font-bold text-accent text-center lg:text-left'>
              My Skills
            </h3>
            {Object.entries(skillsData).map(([category, skills]) => (
              <div key={category}>
                <h4 className='text-xl font-semibold text-text-primary mb-4'>
                  {category}
                </h4>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {skills.map((skill) => (
                    <GlassContainer
                      key={skill.name}
                      className='flex flex-col p-4'
                    >
                      <div className='flex items-center gap-3 mb-2'>
                        <div className='text-3xl'>{skill.icon}</div>
                        <h5 className='font-bold text-lg'>{skill.name}</h5>
                      </div>
                      <p className='text-sm text-text-secondary flex-grow mb-3'>
                        {skill.description}
                      </p>
                      <div className='mt-auto pt-2 border-t border-glass-border'>
                        <p className='text-xs text-text-secondary'>Used in:</p>
                        <p className='text-xs font-semibold'>
                          {skill.projects.join(', ')}
                        </p>
                      </div>
                    </GlassContainer>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
