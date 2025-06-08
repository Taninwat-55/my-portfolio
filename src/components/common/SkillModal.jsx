import { useEffect } from 'react';

export default function SkillModal({ skill, onClose }) {
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
      className='fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white dark:bg-gray-900 text-black dark:text-white rounded-lg p-6 w-11/12 max-w-md shadow-lg transform scale-100 transition-all'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='mb-4'>
          <h2 className='text-xl font-bold mb-1 text-amber-500'>
            {skill.name}
          </h2>
          <p className='text-sm text-gray-500 mb-2'>
            Estimated level: {skill.level}/10
          </p>
          <div className='w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4'>
            <div
              className='bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full'
              style={{ width: `${(skill.level / 10) * 100}%` }}
            />
          </div>
        </div>
        <div className='text-sm space-y-3'>
          {skill.topics.map((group, i) => (
            <div key={i}>
              <h4 className='font-semibold text-amber-400 mb-1'>
                {group.group}
              </h4>
              <ul className='list-disc list-inside space-y-1'>
                {group.items.map((item, j) => (
                  <li
                    key={j}
                    className={
                      item.completed ? 'text-green-400' : 'text-gray-400'
                    }
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button
          className='mt-6 w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded transition'
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
