import SkillDetails from './SkillDetails.jsx';

const skillsData = {
  Frontend: [
    {
      name: 'React',
      description:
        'Building interactive and responsive user interfaces with modern hooks and state management.',
      projects: [
        'Cinema Booking System',
        'Forum Web App',
        'Racha Beauty & Wellness',
      ],
      icon: SkillDetails.React.icon,
    },
    {
      name: 'JavaScript',
      description:
        'Leveraging modern ES6+ features, including asynchronous programming, to create dynamic web experiences.',
      projects: ['Cinema Booking System', 'Forum Web App'],
      icon: SkillDetails.JavaScript.icon,
    },
    {
      name: 'Tailwind CSS',
      description:
        'Rapidly styling responsive layouts with a utility-first approach and custom themes.',
      projects: ['Racha Beauty & Wellness', 'My Portfolio'],
      icon: SkillDetails.Tailwind.icon,
    },
    {
      name: 'HTML & CSS',
      description:
        'Crafting semantic, accessible markup and creating custom, responsive styles without frameworks.',
      projects: ['Interactive Sign-Up Form'],
      icon: SkillDetails.HTML.icon,
    },
  ],
  Backend: [
    {
      name: 'Node.js & Express',
      description:
        'Developing robust RESTful APIs and middleware to handle server-side logic and data processing.',
      projects: [
        'Cinema Booking System',
        'Forum Web App',
        'Racha Beauty & Wellness',
      ],
      icon: SkillDetails.Nodeandexpress.icon,
    },
    {
      name: 'SQL',
      description:
        'Designing schemas and writing queries to efficiently create, read, update, and delete data in relational databases.',
      projects: ['Cinema Booking System', 'Forum Web App'],
      icon: SkillDetails.SQL.icon,
    },
  ],
  'Dev Tools & Learning': [
    {
      name: 'Git & GitHub',
      description:
        'Managing version control and collaborating on codebases using standard branching and pull request workflows.',
      projects: ['All Projects'],
      icon: SkillDetails.GitGithub.icon,
    },
    {
      name: 'TypeScript',
      description:
        'Enhancing code quality and maintainability by adding static types to JavaScript applications.',
      projects: ['Currently Integrating'],
      icon: SkillDetails.TypeScript.icon,
    },
    {
      name: 'Next.js',
      description:
        'Exploring full-stack development with a focus on server-side rendering and API routes.',
      projects: ['Currently Learning'],
      icon: SkillDetails.NextJS.icon,
    },
  ],
};

export default skillsData;
