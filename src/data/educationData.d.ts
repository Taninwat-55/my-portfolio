export interface Education {
  degree: string;
  institution: string;
  period: string;
  details: string;
}

declare const educationData: Education[];
export { educationData };