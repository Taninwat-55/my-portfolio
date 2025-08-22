import { FaCss3Alt, FaJs, FaReact, FaHtml5, FaGitAlt, FaNodeJs } from 'react-icons/fa';
import { SiTailwindcss, SiTypescript, SiNextdotjs } from 'react-icons/si';
import { TbSql } from 'react-icons/tb';

export const skills = [
  // Frontend
  {
    name: 'React',
    description: 'Building interactive and responsive user interfaces with modern hooks and state management.',
    projects: ['Cinema Booking System', 'Forum Web App', 'Racha Beauty & Wellness'],
    level: 7,
    icon: <FaReact className='text-sky-400' />,
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
    description: 'Leveraging modern ES6+ features, including asynchronous programming, to create dynamic web experiences.',
    projects: ['Cinema Booking System', 'Forum Web App'],
    level: 8,
    icon: <FaJs className='text-yellow-400' />,
    topics: [
      {
        group: 'Language Fundamentals',
        items: [
          { name: 'Data Structures & Control Flow', completed: true },
          { name: 'Modern ES6+ Syntax (Arrow Functions, Destructuring)', completed: true },
          { name: 'Asynchronous JS (Promises, async/await)', completed: true },
        ],
      },
      {
        group: 'Browser APIs & DOM',
        items: [
          { name: 'DOM Manipulation & Events', completed: true },
          { name: 'Working with JSON & Fetch API', completed: true },
          { name: 'Understanding the Event Loop', completed: true },
        ],
      },
    ],
  },
  {
    name: 'Tailwind CSS',
    description: 'Rapidly styling responsive layouts with a utility-first approach and custom themes.',
    projects: ['Racha Beauty & Wellness', 'My Portfolio'],
    level: 7,
    icon: <SiTailwindcss className='text-teal-400' />,
    topics: [
      {
        group: 'Fundamentals',
        items: [
          { name: 'Utility-First Workflow & Core Concepts', completed: true },
          { name: 'Responsive Design & Breakpoints', completed: true },
          { name: 'Implementing Dark Mode', completed: true },
        ],
      },
      {
        group: 'Customization & Advanced Features',
        items: [
          { name: 'Configuring `tailwind.config.js` (v3)', completed: true },
          { name: 'Creating Themes with `@theme` (v4)', completed: true },
          { name: 'Optimizing for Production with `purge`', completed: true },
        ],
      },
    ],
  },
  {
    name: 'HTML & CSS',
    description: 'Crafting semantic, accessible markup and creating custom, responsive styles.',
    projects: ['Interactive Sign-Up Form'],
    level: 8,
    icon: <div className="flex -space-x-2"><FaHtml5 className='text-orange-500' /><FaCss3Alt className='text-blue-500' /></div>,
    topics: [
      {
        group: 'HTML Core',
        items: [
          { name: 'Core Document Structure & Semantics', completed: true },
          { name: 'WCAG & ARIA for Accessibility (A11y)', completed: true },
          { name: 'SEO Best Practices & Meta Tags', completed: true },
        ],
      },
      {
        group: 'CSS Core',
        items: [
          { name: 'Advanced Layouts with Flexbox & Grid', completed: true },
          { name: 'Responsive Design with Media Queries', completed: true },
          { name: 'CSS Custom Properties (Variables)', completed: true },
        ],
      },
    ],
  },
  // Backend
  {
    name: 'Node.js & Express',
    description: 'Developing robust RESTful APIs and middleware to handle server-side logic.',
    projects: ['Cinema Booking System', 'Forum Web App', 'Racha Beauty & Wellness'],
    level: 6,
    icon: <FaNodeJs className='text-green-500' />,
    topics: [
      {
        group: 'Backend Fundamentals',
        items: [
          { name: 'Building RESTful APIs with Express.js', completed: true },
          { name: 'Request/Response Handling & Routing', completed: true },
          { name: 'Handling Server-Side Errors', completed: true },
        ],
      },
      {
        group: 'API Development',
        items: [
          { name: 'Creating & Integrating Middleware', completed: true },
          { name: 'Password Hashing with `bcrypt`', completed: false },
          { name: 'API Authentication with JWT', completed: false },
        ],
      },
    ],
  },
  {
    name: 'SQL',
    description: 'Designing schemas and writing queries to manage data in relational databases.',
    projects: ['Cinema Booking System', 'Forum Web App'],
    level: 5,
    icon: <TbSql className='text-indigo-400' />,
    topics: [
      {
        group: 'Data Manipulation',
        items: [
          { name: 'Data Querying (SELECT, WHERE, ORDER BY)', completed: true },
          { name: 'Data Modification (INSERT, UPDATE, DELETE)', completed: true },
          { name: 'Data Aggregation (GROUP BY, COUNT, SUM)', completed: true },
        ],
      },
      {
        group: 'Relational Databases',
        items: [
          { name: 'Table Relationships with JOINs', completed: true },
          { name: 'Database Schema Design & Normalization', completed: true },
          { name: 'Using Subqueries', completed: false },
        ],
      },
    ],
  },
  // Dev Tools & Learning
  {
    name: 'Git & GitHub',
    description: 'Managing version control and collaborating on codebases using standard workflows.',
    projects: ['All Projects'],
    level: 8,
    icon: <FaGitAlt className='text-orange-600' />,
    topics: [
      {
        group: 'Core Version Control',
        items: [
          { name: 'Committing, Pushing, and Pulling Changes', completed: true },
          { name: 'Branching Strategies (e.g., Git Flow)', completed: true },
          { name: 'Resolving Merge Conflicts', completed: true },
        ],
      },
      {
        group: 'Collaborative Workflows',
        items: [
          { name: 'Creating & Reviewing Pull Requests', completed: true },
          { name: 'Managing Remotes & Upstreams', completed: true },
          { name: 'Interactive Rebase for Clean History', completed: false },
        ],
      },
    ],
  },
  {
    name: 'TypeScript',
    description: 'Enhancing code quality and maintainability by adding static types to JavaScript.',
    projects: ['Currently Integrating'],
    level: 4,
    icon: <SiTypescript className='text-blue-600' />,
    topics: [
      {
        group: 'Core Concepts',
        items: [
          { name: 'Static Typing & Type Annotations', completed: true },
          { name: 'Creating Reusable Types with Interfaces', completed: true },
          { name: 'Typing React Components & Props', completed: true },
        ],
      },
      {
        group: 'Next Steps',
        items: [
          { name: 'Working with Generics', completed: false },
          { name: 'Type Narrowing & Guards', completed: false },
        ],
      },
    ],
  },
  {
    name: 'Next.js',
    description: 'Exploring full-stack development with a focus on server-side rendering and API routes.',
    projects: ['Currently Learning'],
    level: 3,
    icon: <SiNextdotjs className='text-white' />,
    topics: [
      {
        group: 'Core Features',
        items: [
          { name: 'App Router & File-Based Routing', completed: true },
          { name: 'Optimized Navigation with `next/link`', completed: true },
          { name: 'Styling with CSS Modules & Tailwind CSS', completed: true },
        ],
      },
      {
        group: 'Rendering & Data Fetching',
        items: [
          { name: 'Server-Side Rendering (SSR)', completed: false },
          { name: 'Static Site Generation (SSG)', completed: false },
          { name: 'Building API Routes', completed: false },
        ],
      },
    ],
  },
];