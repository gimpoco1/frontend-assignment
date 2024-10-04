import LOCAL_STORAGE_KEYS from "../../constants/local-storage.constants";
import { Project } from "../../data/types";

export function clearProjectsFromLocalStorage(): void {
  if (!localStorage) return;
  localStorage.removeItem(LOCAL_STORAGE_KEYS.projects);
}

export function saveProjectsToLocalStorage(projects: Project[]): void {
  if (!localStorage) return;
  localStorage.setItem(LOCAL_STORAGE_KEYS.projects, JSON.stringify(projects));
}

export function getProjectsFromLocalStorage(): Project[] | null {
  if (!localStorage) return null;
  const projects = localStorage.getItem(LOCAL_STORAGE_KEYS.projects);
  if (!projects) return null;
  return JSON.parse(projects) as Project[];
}

export function saveSortOptionToLocalStorage(sortOption: string): void {
  if (!localStorage) return;
  localStorage.setItem(LOCAL_STORAGE_KEYS.sorting, sortOption);
}

export function getSortOptionFromLocalStorage(): string | null {
  if (!localStorage) return null;
  return localStorage.getItem(LOCAL_STORAGE_KEYS.sorting);
}