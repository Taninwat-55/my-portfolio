export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string;
  image: string;
  github: string;
  demo: string;
}

declare const projects: Project[];
export { projects };