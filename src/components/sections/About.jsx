import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import SkillModal from '../common/SkillModal';
import SkillDetails from '../../data/SkillDetails.jsx'; // UPDATED THIS LINE
import GlassContainer from '../common/GlassContainer';

function About() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // The skill data can remain here or be moved to a separate data file
  const categorizedSkills = [
    {
      category: 'Frontend',
      skills: [
        { name: 'HTML', level: 8 },
        { name: 'CSS', level: 8 },
        { name: 'JavaScript', level: 8 },
        { name: 'React', level: 7 },
        { name: 'Tailwind', level: 6 },
        { name: 'TypeScript', level: 3 },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { name: 'Node.js & Express.js', level: 6 },
        { name: 'SQL', level: 5 },
      ],
    },
    {
      category: 'Dev Tools & Version Control',
      skills: [{ name: 'Git & Github', level: 8 }],
    },
    {
      category: 'Currently Learning',
      skills: [
        { name: 'Next.js', level: 3 },
        { name: 'MongoDB & PostgreSQL', level: 1 },
        { name: 'AWS & Docker', level: 1 },
      ],
    },
  ];

  // This hook is updated to target the new GlassContainer components
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

  // A helper object to map display names to keys in skillDetails.js
  const skillLookup = {
    HTML: 'HTML',
    CSS: 'CSS',
    JavaScript: 'JavaScript',
    React: 'React',
    Tailwind: 'Tailwind',
    TypeScript: 'TypeScript',
    'Node.js & Express.js': 'Nodeandexpress',
    'Git & Github': 'GitGithub',
    'Next.js': 'NextJS',
    SQL: 'SQL',
  };

  return (
    <section id='about' className='py-20 px-4' aria-labelledby='about-heading'>
      <div className='container mx-auto'>
        <h2 id='about-heading' className='text-4xl font-bold text-center mb-12'>
          About Me
        </h2>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {/* LEFT PANEL – Bio, Education, Experience */}
          <GlassContainer className='about-left-panel'>
            <h3 className='text-3xl font-bold mb-6 text-accent'>My Story</h3>
            <p className='text-text-secondary mb-8'>
              I'm a business and economics graduate from Uppsala University who
              discovered a passion for building things, which led me to the
              world of web development. My background in entrepreneurship and
              project management gives me a unique perspective on creating
              valuable, user-focused applications. I thrive on solving problems
              and am constantly learning to keep up with the ever-evolving tech
              landscape.
            </p>

            {/* Education Timeline */}
            <div className='mb-8'>
              <h4 className='text-2xl font-semibold text-accent mb-4'>
                Education
              </h4>
              <ul className='border-l-2 border-accent/50 pl-6 space-y-6'>
                <li>
                  <h5 className='font-bold'>M.S. in Business & Management</h5>
                  <p className='text-sm text-text-secondary'>
                    Uppsala University (2022 – 2023)
                  </p>
                </li>
                <li>
                  <h5 className='font-bold'>
                    B.A. in Game Design & Project Management
                  </h5>
                  <p className='text-sm text-text-secondary'>
                    Uppsala University (2019 – 2022)
                  </p>
                </li>
                <li>
                  <h5 className='font-bold'>
                    Professional Degree, Frontend Development
                  </h5>
                  <p className='text-sm text-text-secondary'>
                    Jensen Yrkeshögskola (Ongoing)
                  </p>
                </li>
              </ul>
            </div>

            {/* Experience */}
            <div>
              <h4 className='text-2xl font-semibold text-accent mb-4'>
                Experience
              </h4>
              <div>
                <h5 className='font-bold'>
                  Head of Millennial Consulting (Volunteer)
                </h5>
                <p className='text-sm text-text-secondary'>
                  Copenhagen, Denmark (2023 – 2025)
                </p>
                <ul className='list-disc pl-6 text-sm text-text-secondary mt-2 space-y-1'>
                  <li>
                    Led workshops and supported student teams in consulting
                    projects.
                  </li>
                  <li>Facilitated project kick-offs and planning sessions.</li>
                </ul>
              </div>
            </div>
          </GlassContainer>

          {/* RIGHT PANEL – Skills */}
          <GlassContainer className='about-right-panel'>
            <h3 className='text-3xl font-bold mb-6 text-accent'>My Skills</h3>
            <div className='space-y-6'>
              {categorizedSkills.map((group) => (
                <div key={group.category}>
                  <h4 className='text-md font-semibold text-text-primary mb-3'>
                    {group.category}
                  </h4>
                  <div className='space-y-3'>
                    {group.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className='cursor-pointer p-2 rounded-md transition-colors duration-200 hover:bg-white/10'
                        title='Click to view details'
                        onClick={() => {
                          const key = skillLookup[skill.name];
                          if (key && SkillDetails[key]) {
                            setSelectedSkill(SkillDetails[key]);
                          } else {
                            setSelectedSkill(null); // Handle cases where details might not exist
                          }
                        }}
                      >
                        <div className='flex justify-between items-center text-sm mb-1'>
                          <span>{skill.name}</span>
                          <span className='text-text-secondary'>
                            {skill.level}/10
                          </span>
                        </div>
                        <div className='w-full bg-black/30 rounded-full h-2'>
                          <div
                            className='bg-accent h-2 rounded-full'
                            style={{ width: `${skill.level * 10}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassContainer>
        </div>
      </div>

      {/* The SkillModal is called here, we will refactor it in the final step */}
      {selectedSkill && (
        <SkillModal
          skill={selectedSkill}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </section>
  );
}

export default About;
