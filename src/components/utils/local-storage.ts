import LOCAL_STORAGE_KEYS from "../../constants/local-storage.constants";
import githubProjects from "../../data";
import { Project } from "../../data/types";

// Function to clear projects from local storage
export function clearProjectsFromLocalStorage(): void {
  if (!localStorage) return;
  localStorage.removeItem(LOCAL_STORAGE_KEYS.projects);
}

// Function to save projects to local storage
export function saveProjectsToLocalStorage(projects: Project[]): void {
  try {
    if (Array.isArray(projects) && projects.length > 0) {
      localStorage.setItem("projects", JSON.stringify(projects));
      console.log("Projects successfully saved to localStorage");
    } else {
      console.warn(
        "Projects array is empty or invalid, not saving to localStorage."
      );
    }
  } catch (error) {
    console.error("Error saving projects to localStorage:", error);
  }
}

// Function to safely get projects from local storage
export function getProjectsFromLocalStorage(): Project[] {
  try {
    const savedProjects = localStorage.getItem("projects");
    if (savedProjects) {
      const parsedProjects = JSON.parse(savedProjects);
      if (Array.isArray(parsedProjects)) {
        console.log("Projects retrieved from localStorage:", parsedProjects);
        return parsedProjects;
      }
    }
    console.warn(
      "No valid projects found in localStorage, using default projects."
    );
    return githubProjects; // Fallback to default projects
  } catch (error) {
    console.error("Error retrieving projects from localStorage:", error);
    return githubProjects; // Fallback to default projects on error
  }
}

// Function to save sorting option to local storage
export function saveSortOptionToLocalStorage(sortOption: string): void {
  if (!localStorage) return;
  localStorage.setItem(LOCAL_STORAGE_KEYS.sorting, sortOption);
}

// Function to get sorting option from local storage
export function getSortOptionFromLocalStorage(): string | null {
  if (!localStorage) return null;
  return localStorage.getItem(LOCAL_STORAGE_KEYS.sorting);
}
