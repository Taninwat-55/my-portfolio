import { useEffect, useRef, useState } from 'react';
import { experienceData } from '../data/experience';
import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const workExperience = experienceData.filter(item => item.type === 'work');
  const education = experienceData.filter(item => item.type === 'education');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const TimelineItem = ({ item }: { item: any }) => {
    const isEducation = item.type === 'education';
    return (
      <div className="flex gap-4 group p-4 rounded bg-white/5 border border-transparent hover:border-primary/30 transition-all duration-300">
        <div className="flex-shrink-0 mt-1">
          <div className="w-8 h-8 rounded bg-dark-base border border-text/20 flex items-center justify-center text-primary">
            {isEducation ? <FaGraduationCap size={14} /> : <FaBriefcase size={14} />}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-base text-white">
            {item.role}
          </h4>
          <p className="font-code text-xs text-primary/80 mb-2 mt-1">
            {item.organization} | {item.period}
          </p>
          <p className="font-body text-xs text-gray-300 leading-relaxed">
            {Array.isArray(item.details) ? item.details.join(' ') : item.details}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 h-full items-start pt-4 lg:pt-10">
      
      {/* Left Column: Bio */}
      <div className={`space-y-8 text-center lg:text-left transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
        <div className="hexagon w-48 h-48 md:w-64 md:h-64 relative overflow-hidden neon-border mx-auto lg:mx-0">
          <img
            src="/Ice-img.png"
            alt="Taninwat Kaewpankan"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        
        <div className="bg-white/5 p-6 rounded-lg border-l-4 border-primary text-left">
          <h3 className="text-2xl font-heading text-white mb-4">Who am I?</h3>
          <p 
            className="font-body leading-relaxed mb-4 text-sm md:text-base" 
            style={{ color: 'white' }}
          >
            I've always loved building things, from video games to business ventures. 
            Now, I engineer web applications using <span className="text-primary font-bold">React, Node.js, and SQL</span>.
          </p>
          <div className="font-code text-xs text-gray-400 mt-4 pt-4 border-t border-white/10">
            <p>📍 Copenhagen, Denmark</p>
            <p>🎓 Frontend Development Student</p>
          </div>
        </div>
      </div>

      {/* Right Column: Timeline */}
      <div className={`h-[60vh] overflow-y-auto pr-2 custom-scrollbar transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
        
        {/* Experience Section */}
        {workExperience.length > 0 && (
          <div className="mb-8">
            <h3 className="text-lg font-heading text-primary mb-4 flex items-center gap-2">
              <FaBriefcase /> Work Experience
            </h3>
            <div className="space-y-4">
              {workExperience.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {education.length > 0 && (
          <div>
            <h3 className="text-lg font-heading text-primary mb-4 flex items-center gap-2">
              <FaGraduationCap /> Education
            </h3>
            <div className="space-y-4">
              {education.map((item) => (
                <TimelineItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default About;