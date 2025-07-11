const experienceData = [
  {
    role: 'Head of Millennial Consulting (Volunteer)',
    company: 'Copenhagen, Denmark',
    period: 'Sep 2023 – May 2025',
    duties: [
      'Managed and monitored two-month consulting projects, ensuring timely delivery and high client satisfaction.',
      'Facilitated project kick-offs, planning workshops, and mentor-led sessions to support student development.',
      'Implemented a hybrid project management approach (structured + agile) to improve team efficiency.',
    ],
  },
  {
    role: 'Business Development Intern',
    company: 'Spreadly, Munich, Germany (Remote)',
    period: 'Jan 2023 – Mar 2023',
    duties: [
      'Conducted market research and analysis to identify new business opportunities.',
      'Supported the implementation of business development strategies.',
      'Created and maintained sales and marketing materials.',
    ],
  },
];

function ExperienceTimeline() {
  return (
    <div>
      <h4 className='text-2xl font-semibold text-accent mb-4'>Experience</h4>
      <div className='space-y-6'>
        {experienceData.map((exp) => (
          <div key={exp.role}>
            <h5 className='font-bold'>{exp.role}</h5>
            <p className='text-sm text-text-secondary'>
              {exp.company} ({exp.period})
            </p>
            <ul className='list-disc pl-6 text-sm text-text-secondary mt-2 space-y-1'>
              {exp.duties.map((duty, index) => (
                <li key={index}>{duty}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperienceTimeline;
