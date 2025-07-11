const educationData = [
  {
    degree: "Professional Bachelor's Degree, Frontend Development",
    institution: 'Jensen Yrkeshögskola',
    period: 'Aug 2024 - May 2026',
    details:
      'An intensive, project-based program focused on building a strong foundation in modern web technologies, including hands-on experience with HTML, CSS, JavaScript, and React.',
  },
  {
    degree: 'M.S. in Business & Management - Entrepreneurship',
    institution: 'Uppsala University',
    period: '2022 – 2023',
    details:
      "A specialized Master's program focused on transforming innovative ideas into market-ready products through strategic planning, design thinking, and managing firm growth.",
  },
  {
    degree: 'B.A. in Game Design & Project Management',
    institution: 'Uppsala University',
    period: '2019 – 2022',
    details:
      'A project-driven degree centered on user-centric design principles, interactive systems, and agile project management methodologies within a collaborative production environment.',
  },
];

function EducationTimeline() {
  return (
    <div className='mb-8'>
      <h4 className='text-2xl font-semibold text-accent mb-4'>Education</h4>
      <ul className='border-l-2 border-accent/50 pl-6 space-y-6'>
        {educationData.map((edu) => (
          <li key={edu.degree}>
            <h5 className='font-bold'>{edu.degree}</h5>
            <p className='text-sm text-text-secondary'>
              {edu.institution} ({edu.period})
            </p>
            <p className='text-xs text-text-secondary mt-1'>{edu.details}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EducationTimeline;
