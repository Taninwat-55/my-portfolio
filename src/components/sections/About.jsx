import useScrollReveal from '../../hooks/useScrollReveal';
import GradientButton from '../common/GradientButton';

function About() {
  const skillGroups = [
    {
      label: 'Frontend',
      level: 'w-10/12',
      skills: 'HTML, CSS, JavaScript, React, Tailwind, TypeScript',
    },
    {
      label: 'Backend',
      level: 'w-8/12',
      skills: 'Node.js, Express.js, REST API, SQL, SQLite',
    },
    {
      label: 'Development Tools',
      level: 'w-9/12',
      skills: 'Git, GitHub, Vercel, Render, Netlify',
    },
    {
      label: 'Currently Learning',
      level: 'w-6/12',
      skills: 'Next.js, MongoDB, MySQL, PostgreSQL',
    },
  ];

  useScrollReveal([
    {
      selector: '.about-img',
      config: {
        origin: 'left',
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: true,
      },
    },
    {
      selector: '.about-container',
      config: {
        origin: 'right',
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: true,
      },
    },
  ]);

  return (
    <div className='bg-gray-900/60 text-white py-20' id='about'>
      <div className='container about-container mx-auto px-8 md:px-16 lg:px-24'>
        <h2 className='text-4xl font-bold text-center mb-12'>About Me</h2>
        <div className='flex flex-col md:flex-row items-center md:space-x-12'>
          <img
            src='Formal_Ice_pic.jpg'
            alt=''
            className='about-img w-70 h-80 rounded object-cover mb-8 md:mb-0'
          />
          <div className='flex-1'>
            <p className='text-lg mb-8'>
              I'm a full stack developer in training, actively building
              real-world projects through hands-on learning. I've worked with
              tools like React, Express.js, Node.js, and SQL to create
              responsive and functional applications. I enjoy problem-solving,
              writing clean code, and collaborating in team-based projects using
              Agile workflows.
            </p>
            <div className='space-y-4'>
              {skillGroups.map((group) => (
                <div className='mb-4' key={group.label}>
                  <div className='flex justify-between mb-1'>
                    <span className='text-sm font-medium text-white'>
                      <strong>{group.label}:</strong>
                    </span>
                    <span className='text-sm text-gray-400'>
                      {group.skills}
                    </span>
                  </div>
                  <div className='w-full bg-gray-800 rounded-full h-2.5'>
                    <div
                      className={`bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full ${group.level}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className='mt-8 flex justify-between text-center'>
              <div>
                <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                  In Progress
                </h3>
                <p>Experience Gained</p>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                  2+
                </h3>
                <p>Project Built</p>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                  100%
                </h3>
                <p>Learning Mindset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
