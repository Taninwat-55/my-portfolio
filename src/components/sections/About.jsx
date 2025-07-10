import { useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import SkillModal from '../common/SkillModal';
import SkillDetails from '../../data/SkillDetails.jsx';
import GlassContainer from '../common/GlassContainer';

function About() {
  const [selectedSkill, setSelectedSkill] = useState(null);

  // The skill data will be moved to a separate data file later
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
              My journey began with a desire to turn creative ideas into
              something real. I’ve always been drawn to storytelling and big
              imaginative concepts—especially ones that feel too complex or
              abstract for traditional formats like film. That’s what led me to
              study Game Design. I saw it as a way to bring ideas to life
              through interaction, systems, and design—where users could
              experience a story, not just watch it.
              <br />
              <br />
              Later on, during my Master’s in Business and Entrepreneurship, I
              shifted focus toward creating real-world value from creative
              concepts. I learned how to take ideas, structure them, and turn
              them into usable, meaningful products.
              <br />
              <br />
              Eventually, I found that web development was a natural next step.
              It gives me the tools to combine creative thinking with practical
              problem-solving. Now, I use that mix of design thinking,
              storytelling instincts, and business awareness to build web
              applications that are functional, purposeful, and human-centered.
            </p>

            {/* Education Timeline */}
            <div className='mb-8'>
              <h4 className='text-2xl font-semibold text-accent mb-4'>
                Education
              </h4>
              <ul className='border-l-2 border-accent/50 pl-6 space-y-6'>
                <li>
                  <h5 className='font-bold'>
                    M.S. in Business & Management - Entrepreneurship
                  </h5>
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
                    Professional Bachelor's Degree, Frontend Development
                  </h5>
                  <p className='text-sm text-text-secondary'>
                    Jensen Yrkeshögskola (Aug 2024 - May 2026)
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
                    Managed and monitored two-month consulting projects from
                    start to finish, ensuring timely delivery and maintaining a
                    high standard of client engagement and satisfaction.
                  </li>
                  <li>
                    Facilitated project kick-offs, planning workshops, and
                    mentor-led sessions to support student development; created
                    an inclusive environment focused on learning, initiative,
                    and real-world problem-solving.
                  </li>
                  <li>
                    Managed operations and internal communications; implemented
                    a hybrid project management approach (structured + agile) to
                    improve efficiency and team coordination.
                  </li>
                  <li>
                    Spearheaded improvements in workflows, documentation, and
                    internal knowledge-sharing; developed sustainability
                    strategies to ensure the continued success of future cycles.
                  </li>
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
