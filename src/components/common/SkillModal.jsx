import { useEffect } from 'react';
import GlassContainer from './GlassContainer';

function SkillModal({ skill, onClose }) {
  // This effect handles closing the modal when the 'Escape' key is pressed
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  if (!skill) return null;

  return (
    <div
      className='fixed inset-0 bg-black/70 flex justify-center items-center z-50 p-4'
      onClick={onClose}
      role='dialog'
      aria-modal='true'
      aria-labelledby='skill-modal-heading'
    >
      <GlassContainer
        className='w-full max-w-md'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex items-center gap-4 mb-2'>
          <div className='text-4xl'>{skill.icon}</div>
          <h2
            id='skill-modal-heading'
            className='text-2xl font-bold text-white'
          >
            {skill.name}
          </h2>
        </div>

        {/* Progress Bar */}
        <p className='text-sm text-text-secondary mb-1'>
          Proficiency: {skill.level}/10
        </p>
        <div className='w-full bg-black/30 rounded-full h-2.5 mb-6'>
          <div
            className='bg-accent h-2.5 rounded-full'
            style={{ width: `${skill.level * 10}%` }}
          />
        </div>

        {/* Topics List */}
        <div className='text-sm space-y-4 max-h-60 overflow-y-auto pr-2'>
          {skill.topics.map((group, i) => (
            <div key={i}>
              <h3 className='font-semibold text-text-primary mb-2'>
                {group.group}
              </h3>
              <ul className='list-disc list-inside space-y-1 text-text-secondary'>
                {group.items.map((item, j) => (
                  <li key={j} className={item.completed ? 'text-accent' : ''}>
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <button
          className='mt-6 w-full bg-accent/80 hover:bg-accent text-white font-bold py-2 px-4 rounded-lg transition-colors'
          onClick={onClose}
          aria-label='Close skill details'
        >
          Close
        </button>
      </GlassContainer>
    </div>
  );
}

export default SkillModal;
