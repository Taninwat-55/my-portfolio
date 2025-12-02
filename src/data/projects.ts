export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  image: string;
  github: string;
  demo: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Cinema Booking System',
    description:
      'A full-stack application featuring real-time seat selection, user booking management, and a secure admin panel.',
    technologies: 'React (Vite), Node.js, REST API, Express.js, SQLite',
    image: 'cinema-project-img.png',
    github: 'https://github.com/Taninwat-55/cinema-booking-system-project',
    demo: 'https://cinema-booking-system-project.vercel.app',
  },
  {
    id: 2,
    title: 'Satoshi-Standard',
    description:
      'Change your perspective on money by pricing everyday items in "sats" (the smallest unit of Bitcoin).',
    technologies: 'React (Vite), REST API, Tailwind CSS, Vitest',
    image: 'satoshi-standard.webp',
    github: 'https://github.com/Taninwat-55/Satoshi-Standard',
    demo: 'https://www.satoshi-standard.xyz/',
  },
  {
    id: 3,
    title: 'Racha Beauty & Wellness',
    description:
      'A responsive, SEO-optimized website built for a real-world client to enhance their online presence.',
    technologies: 'React (Vite), Node.js, Express.js, Tailwind CSS',
    image: 'Racha_img.webp',
    github: 'https://github.com/Taninwat-55/rachabeautywellness',
    demo: 'https://rachabeautywellness.com',
  },
  {
    id: 4,
    title: 'Forum Web Application',
    description:
      'A dynamic forum focused on full CRUD functionality and user-generated content.',
    technologies: 'React (Vite), Node.js, Express.js, SQLite',
    image: 'Forum-img.webp',
    github: 'https://github.com/Taninwat-55/Forum-App-Project-React',
    demo: 'https://forum-app-project-react.vercel.app',
  },
  {
    id: 5,
    title: 'Product List with Cart',
    description:
      'A pixel-perfect implementation of a product list with a functional cart system.',
    technologies: 'HTML, CSS, JavaScript',
    image: 'Product-list-with-cart-img.webp',
    github: 'https://github.com/Taninwat-55/Product-list-with-cart',
    demo: 'https://taninwat-55.github.io/Product-list-with-cart/',
  },
  {
    id: 6,
    title: 'Travel Plan (Voyager)',
    description:
      'Voyager is a dynamic application designed to simplify the travel planning process.',
    technologies: 'React (Vite), Tailwind CSS, REST API',
    image: 'travel-plan.webp',
    github: 'https://github.com/Taninwat-55/travel-planner-voyager',
    demo: '#',
  },
  {
    id: 7,
    title: 'Interactive Sign-Up',
    description:
      'Focusing on advanced client-side form validation and custom error handling.',
    technologies: 'HTML, CSS',
    image: 'sign-up-form-project.webp',
    github: 'https://github.com/Taninwat-55/Intro-component-with-sign-up-form',
    demo: 'https://taninwat-55.github.io/Intro-component-with-sign-up-form/',
  },
  {
    id: 8,
    title: 'React Trafiklab App',
    description:
      'The purpose of this project is to mainly practice fetching an external API.',
    technologies: 'React (Vite), TypeScript, Tailwind CSS',
    image: '/assets/Trafiklab-app-img.webp',
    github: 'https://github.com/Taninwat-55/react-trafiklab-app',
    demo: 'https://react-trafiklab-app.vercel.app',
  },
];