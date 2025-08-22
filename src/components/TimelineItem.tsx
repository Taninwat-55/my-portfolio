import { FaGraduationCap, FaBriefcase } from 'react-icons/fa';
import { educationData } from '../data/educationData';
import { experienceData } from '../data/experienceData';

type TimelineItemProps = {
  item: typeof educationData[0] | typeof experienceData[0];
  index: number;
};

const TimelineItem = ({ item, index }: TimelineItemProps) => {
  const isEducation = 'degree' in item;

  return (
    <div
      className={`timeline-item mb-8 flex items-center relative ${
        index % 2 === 0 ? 'flex-row-reverse' : ''
      }`}
    >
      <div className='timeline-dot absolute left-1/2 w-8 h-8 bg-secondary rounded-full border-2 border-dark-base transform -translate-x-1/2 flex items-center justify-center'>
        {isEducation ? (
          <FaGraduationCap className='text-md text-dark-base' />
        ) : (
          <FaBriefcase className='text-md text-dark-base' />
        )}
      </div>
      <div
        className={`w-1/2 ${
          index % 2 === 0 ? 'pl-8 text-right' : 'pr-8'
        }`}
      >
        <div className='card bg-base p-6 rounded-lg neon-glow'>
          <h4 className='text-xl font-heading font-semibold text-secondary'>
            {isEducation ? item.degree : item.role}
          </h4>
          <p className='text-sm font-body text-text/80'>
            {isEducation ? item.institution : item.company}
          </p>
          <p className='text-sm font-body text-text/60'>{item.period}</p>
          {isEducation ? (
            <p className='text-sm font-body text-text/80 mt-2'>
              {item.details}
            </p>
          ) : (
            <ul className='text-sm font-body text-text/80 mt-2 list-disc list-inside text-left'>
              {item.duties.map((duty, i) => (
                <li key={i}>{duty}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className='w-1/2'></div>
    </div>
  );
};

export default TimelineItem;