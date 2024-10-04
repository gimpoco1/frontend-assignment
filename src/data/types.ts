export interface Project {
  id: string;
  name: string;
  url: string;
  rating: number;
  created_at: string;
}

export type GHProject = Project[];
