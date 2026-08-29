export type ProjectType = "Software" | "Business" | "Marketing";

export interface Project {
  id: string;
  key: string;
  name: string;
  description: string;
  projectType: ProjectType;
  lead: string;
  members: string[];
  createdAt: string;
}

export interface CreateProjectInput {
  key: string;
  name: string;
  description: string;
  projectType: ProjectType;
  lead: string;
  members: string[];
}

export const PROJECT_TYPES: ProjectType[] = ["Software", "Business", "Marketing"];

export const PROJECT_TYPE_COLORS: Record<ProjectType, string> = {
  Software: "bg-linear-to-br from-purple-500 to-indigo-600",
  Business: "bg-linear-to-br from-orange-400 to-orange-600",
  Marketing: "bg-linear-to-br from-green-500 to-emerald-600",
};
