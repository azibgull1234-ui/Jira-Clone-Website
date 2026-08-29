export interface DashboardStat {
  id: string;
  label: string;
  value: number;
  icon: "alert" | "clock" | "check" | "list";
}

export interface DashboardIssue {
  id: string;
  key: string;
  title: string;
  type: "BUG" | "FEAT" | "TASK";
  status: "TO DO" | "IN PROGRESS" | "DONE";
}

export interface DashboardProject {
  id: string;
  initials: string;
  name: string;
  type: string;
  color: "purple" | "green" | "orange";
}

export const dashboardStats: DashboardStat[] = [
  { id: "open", label: "Open Issues", value: 12, icon: "alert" },
  { id: "progress", label: "In Progress", value: 5, icon: "clock" },
  { id: "done", label: "Done Today", value: 3, icon: "check" },
  { id: "all", label: "All Issues", value: 24, icon: "list" },
];

export const recentIssues: DashboardIssue[] = [
  {
    id: "1",
    key: "PROJ-101",
    title: "Login page UI broken",
    type: "BUG",
    status: "TO DO",
  },
  {
    id: "2",
    key: "PROJ-102",
    title: "Implement authentication",
    type: "FEAT",
    status: "IN PROGRESS",
  },
  {
    id: "3",
    key: "PROJ-103",
    title: "Fix sidebar responsiveness",
    type: "TASK",
    status: "DONE",
  },
  {
    id: "4",
    key: "PROJ-104",
    title: "Error on issue create",
    type: "BUG",
    status: "TO DO",
  },
  {
    id: "5",
    key: "PROJ-105",
    title: "Add loader component",
    type: "TASK",
    status: "IN PROGRESS",
  },
];

export const myProjects: DashboardProject[] = [
  {
    id: "p1",
    initials: "WR",
    name: "Website Redesign",
    type: "Team managed",
    color: "purple",
  },
  {
    id: "p2",
    initials: "MA",
    name: "Mobile App",
    type: "Team managed",
    color: "green",
  },
  {
    id: "p3",
    initials: "CS",
    name: "CRM System",
    type: "Team managed",
    color: "orange",
  },
];
