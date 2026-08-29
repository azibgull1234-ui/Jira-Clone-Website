import type { IssuePriority, IssueStatus, IssueType } from "../issues/types";
import {
  ISSUE_PRIORITIES,
  ISSUE_STATUSES,
  ISSUE_TYPES,
} from "../issues/types";
import type { ChartDatum } from "./charts/types";
import type { ReportIssue, ReportProject } from "./mockData";

const STATUS_COLORS: Record<IssueStatus, string> = {
  Backlog: "#64748b",
  "To Do": "#6b7280",
  "In Progress": "#2563eb",
  "In Review": "#d97706",
  Done: "#16a34a",
};

const TYPE_COLORS: Record<IssueType, string> = {
  Bug: "#ef4444",
  Task: "#3b82f6",
  Story: "#22c55e",
  Feature: "#14b8a6",
  Epic: "#a855f7",
};

const PRIORITY_COLORS: Record<IssuePriority, string> = {
  Highest: "#dc2626",
  High: "#ea580c",
  Medium: "#d97706",
  Low: "#2563eb",
  Lowest: "#9ca3af",
};

export const buildStatusChart = (issues: ReportIssue[]): ChartDatum[] =>
  ISSUE_STATUSES.map((label) => ({
    label,
    value: issues.filter((issue) => issue.status === label).length,
    color: STATUS_COLORS[label],
  }));

export const buildTypeChart = (issues: ReportIssue[]): ChartDatum[] =>
  ISSUE_TYPES.map((label) => ({
    label,
    value: issues.filter((issue) => issue.type === label).length,
    color: TYPE_COLORS[label],
  }));

export const buildPriorityChart = (issues: ReportIssue[]): ChartDatum[] =>
  [...ISSUE_PRIORITIES].reverse().map((label) => ({
    label,
    value: issues.filter((issue) => issue.priority === label).length,
    color: PRIORITY_COLORS[label],
  }));

export const buildCompletionChart = (issues: ReportIssue[]): ChartDatum[] => {
  const completed = issues.filter((issue) => issue.status === "Done").length;
  return [
    { label: "Completed", value: completed, color: "#16a34a" },
    { label: "Pending", value: issues.length - completed, color: "#94a3b8" },
  ];
};

export interface ProjectProgressRow {
  id: string;
  name: string;
  key: string;
  total: number;
  completed: number;
  percent: number;
}

export const buildProjectProgress = (
  projects: ReportProject[],
  issues: ReportIssue[]
): ProjectProgressRow[] =>
  projects.map((project) => {
    const projectIssues = issues.filter((issue) => issue.project === project.name);
    const completed = projectIssues.filter((issue) => issue.status === "Done").length;
    const total = projectIssues.length;
    return {
      id: project.id,
      name: project.name,
      key: project.key,
      total,
      completed,
      percent: total === 0 ? 0 : Math.round((completed / total) * 100),
    };
  });
