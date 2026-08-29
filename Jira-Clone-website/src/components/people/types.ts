export type UserRole =
  | "Admin"
  | "Project Lead"
  | "Developer"
  | "Designer"
  | "QA"
  | "Viewer";

export type Department =
  | "Engineering"
  | "Design"
  | "Product"
  | "Marketing"
  | "Support";

export interface PersonIssue {
  id: string;
  key: string;
  title: string;
  type: string;
  status: string;
  priority: string;
  project: string;
}

export interface PersonProject {
  id: string;
  key: string;
  name: string;
  role: string;
}

export interface Person {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
  department: Department;
  active: boolean;
  assignedIssues: PersonIssue[];
  projects: PersonProject[];
}

export interface PeopleFilterValues {
  search: string;
  role: string;
  department: string;
  status: string;
}

export const USER_ROLES: UserRole[] = [
  "Admin",
  "Project Lead",
  "Developer",
  "Designer",
  "QA",
  "Viewer",
];

export const DEPARTMENTS: Department[] = [
  "Engineering",
  "Design",
  "Product",
  "Marketing",
  "Support",
];

export const ROLE_STYLES: Record<UserRole, string> = {
  Admin: "bg-purple-100 text-purple-700",
  "Project Lead": "bg-blue-100 text-blue-700",
  Developer: "bg-teal-100 text-teal-700",
  Designer: "bg-pink-100 text-pink-700",
  QA: "bg-amber-100 text-amber-800",
  Viewer: "bg-gray-100 text-gray-700",
};
