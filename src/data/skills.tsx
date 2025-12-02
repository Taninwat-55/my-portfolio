
// We need to import the icons here so they can be used in the data object
// Note: You might need to adjust imports if you want to keep the data file pure, 
// but for this project structure, keeping icons here is fine for simplicity.
// However, to keep data pure, usually we store string names and map them in the component.
// For now, let's stick to the structure you had but make it TS compliant.
// If you get errors about JSX in a .ts file, rename this to skills.tsx (but keep it in data folder).

export interface TopicItem {
  name: string;
  completed: boolean;
}

export interface TopicGroup {
  group: string;
  items: TopicItem[];
}

export interface Skill {
  name: string;
  description: string;
  projects: string[];
  level: number; // 1-10
  // We will remove the 'icon' component from data to keep it serializable if needed, 
  // but if you prefer keeping it, rename this file to skills.tsx
  iconName: string; 
  topics: TopicGroup[];
}

export const skills: Skill[] = [
  {
    name: 'React',
    description: 'Building interactive and responsive user interfaces with modern hooks and state management.',
    projects: ['Cinema Booking System', 'Forum Web App', 'Racha Beauty & Wellness'],
    level: 7,
    iconName: 'FaReact',
    topics: [
      {
        group: 'Core Concepts',
        items: [
          { name: 'Modern React with Functional Components & JSX', completed: true },
          { name: 'State Management with `useState` & `useReducer`', completed: true },
          { name: 'Lifecycle & Side Effects with `useEffect`', completed: true },
        ],
      },
      {
        group: 'Hooks & Ecosystem',
        items: [
          { name: 'Context API for State Propagation', completed: true },
          { name: 'Client-Side Routing with React Router v6', completed: true },
          { name: 'Performance Optimization (Lazy Loading)', completed: true },
        ],
      },
      {
        group: 'Further Learning',
        items: [{ name: 'Advanced State Management (Redux/Zustand)', completed: false }],
      },
    ],
  },
  {
    name: 'JavaScript',
    description: 'Leveraging modern ES6+ features to create dynamic web experiences.',
    projects: ['Cinema Booking System', 'Forum Web App'],
    level: 8,
    iconName: 'FaJs',
    topics: [
      {
        group: 'Language Fundamentals',
        items: [
          { name: 'Data Structures & Control Flow', completed: true },
          { name: 'Modern ES6+ Syntax', completed: true },
          { name: 'Asynchronous JS (Promises, async/await)', completed: true },
        ],
      },
      {
        group: 'Browser APIs',
        items: [
          { name: 'DOM Manipulation & Events', completed: true },
          { name: 'Fetch API & JSON', completed: true },
        ],
      },
    ],
  },
  {
    name: 'Tailwind CSS',
    description: 'Rapidly styling responsive layouts with a utility-first approach.',
    projects: ['Racha Beauty & Wellness', 'My Portfolio'],
    level: 7,
    iconName: 'SiTailwindcss',
    topics: [
      {
        group: 'Fundamentals',
        items: [
          { name: 'Utility-First Workflow', completed: true },
          { name: 'Responsive Design', completed: true },
          { name: 'Dark Mode Implementation', completed: true },
        ],
      },
    ],
  },
  {
    name: 'HTML & CSS',
    description: 'Crafting semantic markup and responsive styles.',
    projects: ['Interactive Sign-Up Form'],
    level: 8,
    iconName: 'FaHtml5',
    topics: [
      {
        group: 'Core',
        items: [
          { name: 'Semantic HTML', completed: true },
          { name: 'Flexbox & Grid', completed: true },
          { name: 'Accessibility (ARIA)', completed: true },
        ],
      },
    ],
  },
  {
    name: 'Node.js & Express',
    description: 'Developing robust RESTful APIs and middleware.',
    projects: ['Cinema Booking System', 'Forum Web App'],
    level: 6,
    iconName: 'FaNodeJs',
    topics: [
      {
        group: 'Backend',
        items: [
          { name: 'RESTful API Design', completed: true },
          { name: 'Middleware Integration', completed: true },
          { name: 'JWT Authentication', completed: false },
        ],
      },
    ],
  },
  {
    name: 'SQL',
    description: 'Managing relational data schemas and queries.',
    projects: ['Cinema Booking System'],
    level: 5,
    iconName: 'TbSql',
    topics: [
      {
        group: 'Database',
        items: [
          { name: 'CRUD Operations', completed: true },
          { name: 'Joins & Relations', completed: true },
          { name: 'Normalization', completed: true },
        ],
      },
    ],
  },
  {
    name: 'Git & GitHub',
    description: 'Version control and collaboration workflows.',
    projects: ['All Projects'],
    level: 8,
    iconName: 'FaGitAlt',
    topics: [
      {
        group: 'VCS',
        items: [
          { name: 'Branching & Merging', completed: true },
          { name: 'Pull Requests', completed: true },
          { name: 'Conflict Resolution', completed: true },
        ],
      },
    ],
  },
  {
    name: 'TypeScript',
    description: 'Adding static typing for better code quality.',
    projects: ['Currently Integrating'],
    level: 4,
    iconName: 'SiTypescript',
    topics: [
      {
        group: 'Basics',
        items: [
          { name: 'Types & Interfaces', completed: true },
          { name: 'Generics', completed: false },
        ],
      },
    ],
  },
  {
    name: 'Next.js',
    description: 'React Framework for Production.',
    projects: ['Learning'],
    level: 3,
    iconName: 'SiNextdotjs',
    topics: [
      {
        group: 'Core',
        items: [
          { name: 'App Router', completed: true },
          { name: 'SSR & SSG', completed: false },
        ],
      },
    ],
  },
];