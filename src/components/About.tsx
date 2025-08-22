import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { educationData } from '../data/educationData';
import { experienceData } from '../data/experienceData';
import TimelineItem from './TimelineItem'; // <-- Import the new component

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the profile image
      gsap.fromTo(
        imgRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: 'power4.out',
          scrollTrigger: { trigger: imgRef.current, start: 'top 90%' },
        }
      );

      // Animate the timeline line "drawing" itself
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: 'top',
          duration: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: timelineLineRef.current,
            start: 'top 80%',
            end: 'bottom 80%',
            scrub: true,
          },
        }
      );

      // Animate each timeline item individually
      const items = gsap.utils.toArray<HTMLElement>('.timeline-item');
      items.forEach((item) => {
        const dot = item.querySelector('.timeline-dot');
        const card = item.querySelector('.card');
        const isReversed = item.classList.contains('flex-row-reverse');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });

        tl.fromTo(
          dot,
          { scale: 0 },
          { scale: 1, duration: 0.3, ease: 'back.out(1.7)' }
        ).fromTo(
          card,
          { opacity: 0, x: isReversed ? -50 : 50 },
          { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
          '-=0.2'
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id='about'
      ref={sectionRef}
      className='py-20 bg-dark-base text-text'
      aria-labelledby='about-heading'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2
          id='about-heading'
          className='text-5xl font-heading font-bold text-highlight mb-12 text-center'
        >
          About Me
        </h2>
        <div className='flex flex-col items-center'>
          <div className='relative mb-12'>
            <div className='hexagon w-64 h-64 relative overflow-hidden neon-glow'>
              <img
                ref={imgRef}
                src='Ice-img.png'
                alt='Taninwat Kaewpankan Image'
                className='absolute inset-0 w-full h-full object-cover'
              />
            </div>
          </div>
          <div className='text-center max-w-2xl mb-12'>
            <h3 className='text-3xl font-heading font-bold text-secondary mb-4'>
              My Journey
            </h3>
            <p className='font-family-body text-lg font-body text-text/80'>
              I've always loved building things, from video games to business
              ventures. Now, I get to build cool web apps as a Frontend
              Developer student at Jensen Yrkeshögskola, where I'm learning and
              studying programming languages and its library and framework like
              HTML, CSS, JavaScript, React, Node.js, and SQL.
            </p>
          </div>
          <div className='w-full max-w-3xl'>
            <div className='relative'>
              <div
                ref={timelineLineRef}
                className='absolute left-1/2 w-1 bg-highlight transform -translate-x-1/2 h-full'
              ></div>
              {[...educationData, ...experienceData].map((item, index) => (
                <TimelineItem key={index} item={item} index={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
