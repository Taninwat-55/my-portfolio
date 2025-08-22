export interface Experience {
  role: string;
  company: string;
  period: string;
  duties: string[];
}

declare const experienceData: Experience[];
export { experienceData };