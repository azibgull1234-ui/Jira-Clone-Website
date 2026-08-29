import type { Issue } from "../issues/types";
import type { Project } from "../projects/types";

export type ReportIssue = Pick<Issue, "type" | "status" | "priority" | "project">;
export type ReportProject = Pick<Project, "id" | "key" | "name">;

/** Report-only snapshot. Swap this module for API-backed data later. */
export const reportProjects: ReportProject[] = [
  { id: "p1", key: "WR", name: "Website Redesign" },
  { id: "p2", key: "MA", name: "Mobile App" },
  { id: "p3", key: "CS", name: "CRM System" },
  { id: "p4", key: "MK", name: "Launch Campaign" },
];

export const reportIssues: ReportIssue[] = [
  { type: "Bug", status: "To Do", priority: "High", project: "Website Redesign" },
  { type: "Feature", status: "In Progress", priority: "Highest", project: "Website Redesign" },
  { type: "Task", status: "Done", priority: "Medium", project: "Website Redesign" },
  { type: "Task", status: "Backlog", priority: "Low", project: "Website Redesign" },
  { type: "Story", status: "In Review", priority: "Medium", project: "Website Redesign" },
  { type: "Bug", status: "Done", priority: "High", project: "Website Redesign" },
  { type: "Bug", status: "To Do", priority: "High", project: "Mobile App" },
  { type: "Task", status: "In Progress", priority: "Low", project: "Mobile App" },
  { type: "Story", status: "Done", priority: "Medium", project: "Mobile App" },
  { type: "Feature", status: "In Progress", priority: "High", project: "Mobile App" },
  { type: "Bug", status: "Backlog", priority: "Highest", project: "Mobile App" },
  { type: "Task", status: "Done", priority: "Lowest", project: "Mobile App" },
  { type: "Epic", status: "Backlog", priority: "Medium", project: "CRM System" },
  { type: "Story", status: "Backlog", priority: "Medium", project: "CRM System" },
  { type: "Bug", status: "In Review", priority: "Highest", project: "CRM System" },
  { type: "Task", status: "To Do", priority: "Low", project: "CRM System" },
  { type: "Feature", status: "In Progress", priority: "High", project: "CRM System" },
  { type: "Story", status: "Done", priority: "Medium", project: "CRM System" },
  { type: "Task", status: "In Progress", priority: "Medium", project: "Launch Campaign" },
  { type: "Story", status: "To Do", priority: "High", project: "Launch Campaign" },
  { type: "Bug", status: "Done", priority: "Low", project: "Launch Campaign" },
  { type: "Feature", status: "Backlog", priority: "Lowest", project: "Launch Campaign" },
];
