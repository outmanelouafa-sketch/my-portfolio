export interface ProjectTool {
  name: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  fullStory: string;
  thumbnail: string;
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  platform?: string;
  framework?: string;
  year?: string;
  features?: string[];
  tools?: ProjectTool[];
  screenshots?: string[];
  isPrivate?: boolean;
}
