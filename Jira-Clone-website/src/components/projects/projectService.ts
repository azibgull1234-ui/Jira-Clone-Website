import { mockProjects } from "./mockData";
import type { CreateProjectInput, Project } from "./types";

const STORAGE_KEY = "jira-projects";

const withLead = (input: CreateProjectInput): CreateProjectInput => {
  const members = input.members.includes(input.lead)
    ? input.members
    : [input.lead, ...input.members];
  return { ...input, members };
};

const loadProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Project[];
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Fall back to seed data.
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockProjects));
  return mockProjects;
};

const saveProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

const normalizeKey = (key: string) =>
  key.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 4);

export const getProjects = (): Project[] => loadProjects();

export const getProjectById = (id: string): Project | undefined =>
  loadProjects().find((project) => project.id === id);

export const createProject = (input: CreateProjectInput): Project => {
  const projects = loadProjects();
  const key = normalizeKey(input.key);
  const duplicate = projects.some((project) => project.key === key);
  if (duplicate) {
    throw new Error("A project with this key already exists");
  }

  const project: Project = {
    id: crypto.randomUUID(),
    ...withLead({ ...input, key }),
    createdAt: new Date().toISOString(),
  };
  saveProjects([project, ...projects]);
  return project;
};

export const updateProject = (
  id: string,
  input: CreateProjectInput
): Project | undefined => {
  const projects = loadProjects();
  const index = projects.findIndex((project) => project.id === id);
  if (index < 0) {
    return undefined;
  }

  const key = normalizeKey(input.key);
  const duplicate = projects.some(
    (project) => project.id !== id && project.key === key
  );
  if (duplicate) {
    throw new Error("A project with this key already exists");
  }

  const updated: Project = {
    ...projects[index],
    ...withLead({ ...input, key }),
  };
  const next = [...projects];
  next[index] = updated;
  saveProjects(next);
  return updated;
};

export const deleteProject = (id: string) => {
  saveProjects(loadProjects().filter((project) => project.id !== id));
};
