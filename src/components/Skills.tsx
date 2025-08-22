import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../data/skills.jsx';
import Modal from './Modal';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

import { Skill } from '../data/skills';

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const handleOpenModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('.skill-card');

      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
        }
      );

      cards.forEach((card) => {
        const hoverTween = gsap.to(card, { scale: 1.05, rotationY: 10, duration: 0.3, paused: true });
        card.addEventListener('mouseenter', () => hoverTween.play());
        card.addEventListener('mouseleave', () => hoverTween.reverse());
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id='skills' ref={sectionRef} className='py-20 bg-base dark:bg-dark-base'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-4xl font-heading font-bold text-text dark:text-dark-text mb-8 text-center'>
          My Skills
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {skills.map((skill) => (
            <div
              key={skill.name}
              className='skill-card p-6 bg-dark-base/20 rounded-lg border border-highlight/50 flex flex-col cursor-pointer hover:border-secondary transition-colors'
              onClick={() => handleOpenModal(skill)}
            >
              <div className='flex items-center gap-3 mb-2'>
                {skill.icon}
                <h3 className='text-lg font-heading font-semibold text-text dark:text-dark-text'>
                  {skill.name}
                </h3>
              </div>
              <p className='text-sm font-body text-text/70 dark:text-dark-text/70 flex-grow'>
                {skill.description}
              </p>
              <div className='mt-2'>
                <p className='text-xs font-body text-text/70 dark:text-dark-text/70'>
                  Used in:
                </p>
                <p className='text-xs font-body font-semibold text-text dark:text-dark-text'>
                  {skill.projects.join(', ')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedSkill && (
          <div>
            <div className='flex items-center gap-4 mb-4'>
              <div className='text-4xl'>{selectedSkill.icon}</div>
              <h3 className='text-3xl font-heading font-bold text-dark-text'>
                {selectedSkill.name}
              </h3>
            </div>
            {selectedSkill.topics.map((topicGroup) => (
              <div key={topicGroup.group} className='mb-4'>
                <h4 className='font-heading text-secondary font-semibold mb-2'>
                  {topicGroup.group}
                </h4>
                <ul className='space-y-2'>
                  {topicGroup.items.map((item) => (
                    <li
                      key={item.name}
                      className='flex items-center gap-3 font-body text-sm text-dark-text/80'
                    >
                      {item.completed ? (
                        <FaCheckCircle className='text-green-400 flex-shrink-0' />
                      ) : (
                        <FaCircle className='text-dark-text/30 text-[10px] flex-shrink-0' />
                      )}
                      <span>{item.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </section>
  );
};

export default Skills;