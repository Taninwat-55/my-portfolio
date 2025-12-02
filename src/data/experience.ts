export interface ExperienceItem {
  id: string;
  type: 'education' | 'work';
  role: string; // or Degree
  organization: string; // or Institution
  period: string;
  details: string | string[];
}

export const experienceData: ExperienceItem[] = [
  // Education
  {
    id: 'edu-1',
    type: 'education',
    role: "Professional Bachelor's Degree, Frontend Development",
    organization: 'Jensen Yrkeshögskola',
    period: 'Aug 2024 - May 2026',
    details:
      'An intensive program building my frontend skills through hands-on projects in modern web technologies like HTML, CSS, JavaScript, NodeJS and React.',
  },
  {
    id: 'edu-2',
    type: 'education',
    role: 'M.S. in Business & Management - Entrepreneurship',
    organization: 'Uppsala University',
    period: '2022 – 2023',
    details:
      'Learned how to turn creative ideas into real-world products through strategic planning and design thinking.',
  },
  {
    id: 'edu-3',
    type: 'education',
    role: 'B.A. in Game Design & Project Management',
    organization: 'Uppsala University',
    period: '2019 – 2022',
    details:
      'A project-focused degree where I learned to design interactive systems and manage projects using agile methods.',
  },
  // Experience
  {
    id: 'work-1',
    type: 'work',
    role: 'Head of Millennial Consulting (Volunteer)',
    organization: 'Copenhagen, Denmark',
    period: 'Sep 2023 – May 2025',
    details: [
      'Led and oversaw two-month consulting projects, making sure we delivered on time and kept clients happy.',
      'Helped teams get started with project planning and guided them through workshops.',
    ],
  },
  {
    id: 'work-2',
    type: 'work',
    role: 'Business Development Intern',
    organization: 'Spreadly, Munich (Remote)',
    period: 'Jan 2023 – Mar 2023',
    details: [
      'Researched and analyzed the market to find new business opportunities.',
      'Created and kept up-to-date sales and marketing materials.',
    ],
  },
];