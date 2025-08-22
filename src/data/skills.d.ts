import React from 'react';

export interface Skill {
  name: string;
  description: string;
  projects: string[];
  level: number;
  icon: React.ReactNode;
  topics: {
    group: string;
    items: { name: string; completed: boolean }[];
  }[];
}

declare const skills: Skill[];
export { skills };