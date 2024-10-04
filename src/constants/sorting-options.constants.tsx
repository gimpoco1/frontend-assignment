import { Project } from "../data/types";

export interface SortOption {
  label: string;
  value: string;
  sortFn: (a: Project, b: Project) => number;
}

const SORT_OPTIONS: SortOption[] = [
  {
    label: "Newest",
    value: "Newest",
    sortFn: (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  },
  {
    label: "Oldest",
    value: "Oldest",
    sortFn: (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  },
  {
    label: "Rating (Low to High)",
    value: "Rating (Low to High)",
    sortFn: (a, b) => a.rating - b.rating,
  },
  {
    label: "Rating (High to Low)",
    value: "Rating (High to Low)",
    sortFn: (a, b) => b.rating - a.rating,
  },
];

export default SORT_OPTIONS;
