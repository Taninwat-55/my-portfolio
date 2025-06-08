const skillDetails = {
  HTML: {
    name: 'HTML',
    level: 7,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'HTML structure & tags', completed: true },
          { name: 'Links & images', completed: true },
          { name: 'Tables & forms', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'Semantic HTML5', completed: true },
          { name: 'Input types & validation', completed: true },
          { name: 'Embedding media', completed: true },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'ARIA & accessibility', completed: true },
          { name: 'Meta tags for SEO', completed: false },
          { name: 'Web components', completed: false },
        ],
      },
    ],
  },
  CSS: {
    name: 'CSS',
    level: 7,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'Box model & box-sizing', completed: true },
          { name: 'Cascade & specificity', completed: true },
          { name: 'Units: px, %, em, rem', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'Flexbox & Grid layouts', completed: true },
          { name: 'Media queries & responsiveness', completed: true },
          { name: 'Positioning & display types', completed: true },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'CSS variables', completed: true },
          { name: 'CSS animations & keyframes', completed: false },
          { name: 'CSS methodologies (BEM)', completed: false },
        ],
      },
    ],
  },
  JavaScript: {
    name: 'JavaScript',
    level: 8,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'Variables & data types', completed: true },
          { name: 'Control flow (if, loops)', completed: true },
          { name: 'Functions & scope', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'DOM manipulation', completed: true },
          { name: 'Array methods (map, filter)', completed: true },
          { name: 'ES6 features (arrow, destructuring)', completed: true },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'Promises & async/await', completed: true },
          { name: 'Fetch API & JSON', completed: true },
          { name: 'Event loop', completed: false },
        ],
      },
    ],
  },
  React: {
    name: 'React',
    level: 7,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'JSX & props', completed: true },
          { name: 'Functional components', completed: true },
          { name: 'useState', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'useEffect', completed: true },
          { name: 'useContext', completed: true },
          { name: 'Conditional rendering', completed: true },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'React Router v6', completed: true },
          { name: 'Lazy loading', completed: false },
          { name: 'Global state (Redux/Zustand)', completed: false },
        ],
      },
    ],
  },
  Tailwind: {
    name: 'Tailwind CSS',
    level: 6,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'Utility classes', completed: true },
          { name: 'Layout & spacing', completed: true },
          { name: 'Typography & colors', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'Responsive breakpoints', completed: true },
          { name: 'Dark mode', completed: true },
          { name: 'Custom classes with @apply', completed: false },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'JIT mode', completed: false },
          { name: 'Animations & transitions', completed: false },
          { name: 'Plugins & configuration', completed: false },
        ],
      },
    ],
  },
  TypeScript: {
    name: 'TypeScript',
    level: 4,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'Type annotations', completed: true },
          { name: 'Basic types', completed: true },
          { name: 'Interfaces & aliases', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'Generics', completed: false },
          { name: 'Type narrowing', completed: false },
          { name: 'Modules', completed: false },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'Utility types', completed: false },
          { name: 'Mapped types', completed: false },
          { name: 'Conditional types', completed: false },
        ],
      },
    ],
  },
  Nodeandexpress: {
    name: 'Node.js & Express.js',
    level: 6,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'Event loop', completed: true },
          { name: 'Core modules', completed: true },
          { name: 'Express routing', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'REST APIs & CRUD', completed: true },
          { name: 'Middleware & express.json()', completed: true },
          { name: 'Error handling', completed: true },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'Authentication (JWT)', completed: false },
          { name: 'bcrypt for hashing', completed: false },
          { name: 'Custom middleware', completed: false },
        ],
      },
    ],
  },
  RESTAPI: {
    name: 'REST API',
    level: 6,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'What is REST & HTTP methods', completed: true },
          { name: 'GET & POST basics', completed: true },
          { name: 'Understanding endpoints', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'PUT, PATCH, DELETE', completed: true },
          { name: 'Status codes & conventions', completed: true },
          { name: 'Query & route params', completed: true },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'Versioning & HATEOAS', completed: false },
          { name: 'RESTful error handling', completed: false },
          { name: 'Authentication in APIs', completed: false },
        ],
      },
    ],
  },

  SQL: {
    name: 'SQL',
    level: 5,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'SELECT, WHERE, ORDER BY', completed: true },
          { name: 'INSERT, UPDATE, DELETE', completed: true },
          { name: 'Basic filtering & logic', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'JOINs (INNER, LEFT)', completed: true },
          { name: 'GROUP BY & aggregation', completed: true },
          { name: 'Subqueries & aliases', completed: false },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'Indexes & optimization', completed: false },
          { name: 'Stored procedures & triggers', completed: false },
          { name: 'Normalization & schema design', completed: false },
        ],
      },
    ],
  },

//   SQLite: {
//     name: 'SQLite',
//     level: 6,
//     topics: [
//       {
//         group: 'Beginner',
//         items: [
//           { name: 'sqlite3 CLI basics', completed: true },
//           { name: 'Creating & reading tables', completed: true },
//           { name: 'Simple CRUD operations', completed: true },
//         ],
//       },
//       {
//         group: 'Intermediate',
//         items: [
//           { name: 'Using foreign keys', completed: true },
//           { name: 'Data types & constraints', completed: true },
//           { name: 'Joins & indexing', completed: true },
//         ],
//       },
//       {
//         group: 'Advanced',
//         items: [
//           { name: 'PRAGMA & settings', completed: false },
//           { name: 'Triggers & views', completed: false },
//           { name: 'Migration & versioning', completed: false },
//         ],
//       },
//     ],
//   },

  GitGithub: {
    name: 'Git & GitHub',
    level: 8,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'git init & commit', completed: true },
          { name: 'git clone & push', completed: true },
          { name: 'git status & log', completed: true },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'Branching & merging', completed: true },
          { name: 'Conflict resolution', completed: true },
          { name: 'Remote & upstreams', completed: true },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'Rebase & squash', completed: false },
          { name: 'Git workflows', completed: true },
          { name: 'Pull requests & code review', completed: true },
        ],
      },
    ],
  },
  NextJS: {
    name: 'Next.js',
    level: 1,
    topics: [
      {
        group: 'Beginner',
        items: [
          { name: 'File-based routing', completed: true },
          { name: 'next/link', completed: false },
          { name: 'Static assets & CSS', completed: false },
        ],
      },
      {
        group: 'Intermediate',
        items: [
          { name: 'getStaticProps & SSR', completed: false },
          { name: 'API routes', completed: false },
          { name: 'Dynamic routes', completed: false },
        ],
      },
      {
        group: 'Advanced',
        items: [
          { name: 'App Router', completed: false },
          { name: 'Auth (NextAuth.js)', completed: false },
          { name: 'Deployment with Vercel', completed: false },
        ],
      },
    ],
  },
};

export default skillDetails;
