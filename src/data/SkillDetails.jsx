import {
  FaCss3Alt,
  FaJs,
  FaReact,
} from 'react-icons/fa';
import { FaHtml5, FaGitAlt, FaNodeJs } from 'react-icons/fa6';
import {
  SiTailwindcss,
  SiTypescript,
  SiNextdotjs,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si';
import { TbSql } from 'react-icons/tb';

const SkillDetails = {
  HTML: {
    name: 'HTML',
    level: 8,
    icon: <FaHtml5 className='text-orange-500' />,
    topics: [
      {
        group: 'Fundamentals',
        items: [
          { name: 'Core Document Structure & Semantics', completed: true },
          { name: 'Forms, Tables, and Media Elements', completed: true },
          { name: 'Semantic HTML5 for Modern Web Layouts', completed: true },
        ],
      },
      {
        group: 'Advanced Concepts',
        items: [
          { name: 'WCAG & ARIA for Accessibility (A11y)', completed: true },
          { name: 'SEO Best Practices & Meta Tags', completed: true },
          { name: 'Web Components (Concept)', completed: false },
        ],
      },
    ],
  },
  CSS: {
    name: 'CSS',
    level: 8,
    icon: <FaCss3Alt className='text-blue-500' />,
    topics: [
      {
        group: 'Core Concepts',
        items: [
          { name: 'The Box Model & Specificity', completed: true },
          { name: 'Responsive Design with Media Queries', completed: true },
          { name: 'Advanced Layouts with Flexbox & Grid', completed: true },
        ],
      },
      {
        group: 'Modern CSS',
        items: [
          { name: 'CSS Custom Properties (Variables)', completed: true },
          { name: 'Transitions & Keyframe Animations', completed: true },
          { name: 'Scalable CSS Architecture (e.g., BEM)', completed: false },
        ],
      },
    ],
  },
  JavaScript: {
    name: 'JavaScript',
    level: 8,
    icon: <FaJs className='text-yellow-400' />,
    topics: [
      {
        group: 'Language Fundamentals',
        items: [
          { name: 'Data Structures & Control Flow', completed: true },
          {
            name: 'Modern ES6+ Syntax (Arrow Functions, Destructuring)',
            completed: true,
          },
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
  React: {
    name: 'React',
    level: 7,
    icon: <FaReact className='text-sky-400' />,
    topics: [
      {
        group: 'Core Concepts',
        items: [
          {
            name: 'Modern React with Functional Components & JSX',
            completed: true,
          },
          {
            name: 'State Management with `useState` & `useReducer`',
            completed: true,
          },
          {
            name: 'Lifecycle & Side Effects with `useEffect`',
            completed: true,
          },
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
        items: [
          {
            name: 'Advanced State Management (Redux/Zustand)',
            completed: false,
          },
        ],
      },
    ],
  },
  Tailwind: {
    name: 'Tailwind CSS (v4)',
    level: 6,
    icon: <SiTailwindcss className='text-teal-400' />,
    topics: [
      {
        group: 'Fundamentals',
        items: [
          { name: 'Utility-First Workflow', completed: true },
          { name: 'Responsive Design & Breakpoints', completed: true },
          { name: 'Implementing Dark Mode', completed: true },
        ],
      },
      {
        group: 'Customization',
        items: [
          { name: 'Configuring `tailwind.config.js`', completed: true },
          { name: 'Creating Themes with `@theme`', completed: true },
          { name: 'Custom Utilities with `@apply`', completed: true },
        ],
      },
    ],
  },
  TypeScript: {
    name: 'TypeScript',
    level: 3,
    icon: <SiTypescript className='text-blue-600' />,
    topics: [
      {
        group: 'Core Concepts',
        items: [
          { name: 'Static Typing & Type Annotations', completed: true },
          { name: 'Creating Reusable Types with Interfaces', completed: true },
          { name: 'Defining Custom Types with Aliases', completed: true },
        ],
      },
      {
        group: 'Next Steps',
        items: [
          { name: 'Working with Generics', completed: false },
          { name: 'Type Narrowing & Guards', completed: false },
          { name: 'Typing React Components & Props', completed: false },
        ],
      },
    ],
  },
  Nodeandexpress: {
    name: 'Node.js & Express.js',
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
  SQL: {
    name: 'SQL',
    level: 5,
    icon: <TbSql className='text-indigo-400' />,
    topics: [
      {
        group: 'Data Manipulation',
        items: [
          { name: 'Data Querying (SELECT, WHERE, ORDER BY)', completed: true },
          {
            name: 'Data Modification (INSERT, UPDATE, DELETE)',
            completed: true,
          },
          { name: 'Data Aggregation (GROUP BY, COUNT, SUM)', completed: true },
        ],
      },
      {
        group: 'Relational Databases',
        items: [
          { name: 'Table Relationships with JOINs', completed: true },
          { name: 'Using Subqueries', completed: false },
          { name: 'Database Schema Design & Normalization', completed: true },
        ],
      },
    ],
  },
  GitGithub: {
    name: 'Git & GitHub',
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
  NextJS: {
    name: 'Next.js',
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
      {
        group: 'Ecosystem',
        items: [
          { name: 'Authentication with NextAuth.js', completed: false },
          { name: 'Deployment on Vercel', completed: true },
        ],
      },
    ],
  },
};

export default SkillDetails;
