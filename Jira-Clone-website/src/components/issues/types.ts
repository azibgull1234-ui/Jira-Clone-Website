export type IssueType = "Bug" | "Task" | "Story" | "Feature" | "Epic";
export type IssueStatus = "Backlog" | "To Do" | "In Progress" | "In Review" | "Done";
export type IssuePriority = "Lowest" | "Low" | "Medium" | "High" | "Highest";
export type SprintId = "sprint-1" | "sprint-2";

export interface Issue {
  id: string;
  key: string;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string | null;
  reporter: string;
  project: string;
  sprint: SprintId | null;
  createdAt: string;
  updatedAt: string;
  dueDate: string | null;
}

export interface IssueProject {
  id: string;
  key: string;
  name: string;
}

export interface CreateIssueInput {
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  priority: IssuePriority;
  assignee: string | null;
  reporter: string;
  project: string;
  sprint: SprintId | null;
  dueDate: string | null;
}

export interface IssueFilterValues {
  search: string;
  status: string;
  type: string;
  priority: string;
  assignee: string;
}

export const ISSUE_TYPES: IssueType[] = ["Bug", "Task", "Story", "Feature", "Epic"];
export const ISSUE_STATUSES: IssueStatus[] = [
  "Backlog",
  "To Do",
  "In Progress",
  "In Review",
  "Done",
];
export const ISSUE_PRIORITIES: IssuePriority[] = [
  "Lowest",
  "Low",
  "Medium",
  "High",
  "Highest",
];

export const SPRINTS: { id: SprintId; name: string }[] = [
  { id: "sprint-1", name: "Sprint 1" },
  { id: "sprint-2", name: "Sprint 2" },
];
