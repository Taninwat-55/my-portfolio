import useScrollReveal from '../../hooks/useScrollReveal';

function About() {
  const categorizedSkills = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML', level: 10 },
        { name: 'CSS', level: 9 },
        { name: 'JavaScript', level: 8 },
        { name: 'React', level: 7 },
        { name: 'Tailwind', level: 9 },
        { name: 'TypeScript', level: 7 },
      ],
    },
    {
      category: 'Backend & Database',
      skills: [
        { name: 'Node.js & Express.js', level: 6 },
        { name: 'REST API', level: 6 },
        { name: 'SQL', level: 6 },
        { name: 'SQLite', level: 6 },
      ],
    },
    {
      category: 'Development Tools',
      skills: [
        { name: 'Git', level: 9 },
        { name: 'GitHub', level: 9 },
      ],
    },
    {
      category: 'Currently Learning',
      skills: [
        { name: 'Next.js', level: 3 },
        { name: 'MongoDB', level: 1 },
        { name: 'MySQL', level: 2 },
        { name: 'PostgreSQL', level: 1 },
      ],
    },
  ];

  useScrollReveal([
    {
      selector: '.about-left',
      config: {
        origin: 'left',
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: true,
      },
    },
    {
      selector: '.about-right',
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
    <section className='bg-gray-900/60 text-white py-20' id='about'>
      <div className='container mx-auto px-8 md:px-16 lg:px-24'>
        <h2 className='text-4xl font-bold text-center mb-12'>About Me</h2>

        <div className='flex flex-col md:flex-row md:space-x-12'>
          {/* LEFT SIDE – Timeline + Experience */}
          <div className='about-left md:w-1/2 space-y-10'>
            <img
              src='Formal_Ice_pic.jpg'
              alt=''
              className='about-img w-100 h-100 rounded object-cover mb-8 pb-8 md:mb-0'
            />

            {/* Education */}
            <div>
              <h3 className='text-2xl font-semibold text-amber-400 mb-4'>
                Education
              </h3>
              <ul className='border-l-4 border-amber-500 pl-6 space-y-6'>
                <li>
                  <h4 className='text-lg font-bold'>
                    Master of Social Science in Entrepreneurship
                  </h4>
                  <p className='text-sm'>
                    Uppsala University (Aug 2022 – Jun 2023)
                  </p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Courses: Design Thinking, Internationalizing the Firm
                    <br />
                    Thesis: <em>Entrepreneurial Learning in Incubators</em>
                  </p>
                </li>
                <li>
                  <h4 className='text-lg font-bold'>
                    BA in Game Design & Project Management
                  </h4>
                  <p className='text-sm'>
                    Uppsala University (Aug 2019 – Jun 2022)
                  </p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Projects: <em>Fly Away, Armored Division</em>
                    <br />
                    Thesis: <em>Cybersickness in VR Racing Games</em>
                  </p>
                </li>
                <li>
                  <h4 className='text-lg font-bold'>
                    Associate Degree in Frontend Development
                  </h4>
                  <p className='text-sm'>Jensen Yrkeshögskola (Ongoing)</p>
                  <p className='text-xs text-gray-400 mt-1'>
                    Projects: <em>Cinema Booking System, Forum App</em>
                  </p>
                </li>
              </ul>
            </div>

            {/* Experience */}
            <div>
              <h3 className='text-2xl font-semibold text-amber-400 mb-4'>
                Experience
              </h3>
              <div>
                <h4 className='font-bold'>
                  Head of Millennial Consulting <i>(Volunteer)</i>
                </h4>
                <p className='text-sm'>
                  Copenhagen, Denmark (Sep 2023 – May 2025)
                </p>
                <ul className='list-disc pl-6 text-sm text-gray-400 mt-1'>
                  <li>Led workshops and supported student teams.</li>
                  <li>Facilitated kick-offs and planning sessions.</li>
                  <li>Oversaw consulting projects for timely delivery.</li>
                  <li>
                    Expanded visibility in the Copenhagen startup ecosystem.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE – Skills */}
          <div className='about-right md:w-1/2 mt-12 md:mt-0'>
            <div className='space-y-8'>
              {categorizedSkills.map((group) => (
                <div key={group.category}>
                  <h4 className='text-md font-semibold text-amber-400 mb-2'>
                    {group.category}
                  </h4>
                  <div className='space-y-3'>
                    {group.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className='flex justify-between text-sm'>
                          <span>{skill.name}</span>
                          <span className='text-gray-400'>
                            {skill.level}/12
                          </span>
                        </div>
                        <div className='w-full bg-gray-800 rounded-full h-2'>
                          <div
                            className='bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full'
                            style={{ width: `${(skill.level / 12) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Summary Stats */}
            <div className='mt-10 flex justify-between text-center'>
              <div>
                <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                  In Progress
                </h3>
                <p className='text-sm text-gray-400'>Experience Gained</p>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                  2+
                </h3>
                <p className='text-sm text-gray-400'>Projects Built</p>
              </div>
              <div>
                <h3 className='text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500'>
                  100%
                </h3>
                <p className='text-sm text-gray-400'>Learning Mindset</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
