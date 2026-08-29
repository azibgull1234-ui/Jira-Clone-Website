import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createProject as createProjectRecord,
  deleteProject as deleteProjectRecord,
  getProjects,
  updateProject as updateProjectRecord,
} from "../components/projects/projectService";
import type { CreateProjectInput, Project } from "../components/projects/types";

interface ProjectsContextValue {
  projects: Project[];
  createProject: (input: CreateProjectInput) => Project;
  updateProject: (id: string, input: CreateProjectInput) => Project | undefined;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
}

const ProjectsContext = createContext<ProjectsContextValue | undefined>(undefined);

export const ProjectsProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>(() => getProjects());

  const createProject = useCallback((input: CreateProjectInput) => {
    const created = createProjectRecord(input);
    setProjects(getProjects());
    return created;
  }, []);

  const updateProject = useCallback((id: string, input: CreateProjectInput) => {
    const updated = updateProjectRecord(id, input);
    setProjects(getProjects());
    return updated;
  }, []);

  const deleteProject = useCallback((id: string) => {
    deleteProjectRecord(id);
    setProjects(getProjects());
  }, []);

  const getProject = useCallback(
    (id: string) => projects.find((project) => project.id === id),
    [projects]
  );

  const value = useMemo(
    () => ({ projects, createProject, updateProject, deleteProject, getProject }),
    [createProject, deleteProject, getProject, projects, updateProject]
  );

  return (
    <ProjectsContext.Provider value={value}>{children}</ProjectsContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectsContext);
  if (!context) {
    throw new Error("useProjects must be used within a ProjectsProvider");
  }
  return context;
};
