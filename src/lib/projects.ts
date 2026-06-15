import portfolioData from '@/data/portfolio.json';
import type { Project } from '@/types/project';

export const projects = portfolioData.projects as Project[];

export const getProjectById = (id: string): Project | undefined =>
  projects.find((project) => project.id === id);

export const encodeAssetPath = (path: string): string =>
  path
    .split('/')
    .map((segment, index) => (index === 0 ? segment : encodeURIComponent(segment)))
    .join('/');
