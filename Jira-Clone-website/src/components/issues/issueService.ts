import { mockIssues, issueProjects } from "./mockData";
import { getProjects } from "../projects/projectService";
import type { CreateIssueInput, Issue, IssueStatus, SprintId } from "./types";

const STORAGE_KEY = "jira-issues";

const normalizeIssue = (issue: Issue): Issue => ({
  ...issue,
  sprint: issue.sprint ?? null,
});

const loadIssues = (): Issue[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Issue[];
      if (Array.isArray(parsed)) {
        return parsed.map(normalizeIssue);
      }
    }
  } catch {
    // Fall back to seed data.
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockIssues));
  return mockIssues;
};

const saveIssues = (issues: Issue[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
};

const nextIssueKey = (issues: Issue[], projectName: string) => {
  const stored = getProjects().find((item) => item.name === projectName);
  const prefix =
    stored?.key ??
    issueProjects.find((item) => item.name === projectName)?.key ??
    "ISSUE";
  const numbers = issues
    .filter((issue) => issue.key.startsWith(`${prefix}-`))
    .map((issue) => Number(issue.key.split("-")[1]))
    .filter((value) => Number.isFinite(value));
  const next = numbers.length ? Math.max(...numbers) + 1 : 101;
  return `${prefix}-${next}`;
};

export const getIssues = (): Issue[] => loadIssues();

export const getIssueById = (id: string): Issue | undefined =>
  loadIssues().find((issue) => issue.id === id);

export const createIssue = (input: CreateIssueInput): Issue => {
  const issues = loadIssues();
  const now = new Date().toISOString();
  const issue: Issue = {
    id: crypto.randomUUID(),
    key: nextIssueKey(issues, input.project),
    ...input,
    sprint: input.sprint ?? null,
    createdAt: now,
    updatedAt: now,
  };
  const next = [issue, ...issues];
  saveIssues(next);
  return issue;
};

export const updateIssue = (id: string, changes: CreateIssueInput): Issue | undefined => {
  const issues = loadIssues();
  const index = issues.findIndex((issue) => issue.id === id);
  if (index < 0) {
    return undefined;
  }

  const updated: Issue = {
    ...issues[index],
    ...changes,
    updatedAt: new Date().toISOString(),
  };
  const next = [...issues];
  next[index] = updated;
  saveIssues(next);
  return updated;
};

export const updateIssueStatus = (id: string, status: IssueStatus): Issue | undefined => {
  const issues = loadIssues();
  const index = issues.findIndex((issue) => issue.id === id);
  if (index < 0) {
    return undefined;
  }

  const current = issues[index];
  if (current.status === status) {
    return current;
  }

  const updated: Issue = {
    ...current,
    status,
    updatedAt: new Date().toISOString(),
  };
  const next = [...issues];
  next[index] = updated;
  saveIssues(next);
  return updated;
};

export const updateIssueSprint = (
  id: string,
  sprint: SprintId | null
): Issue | undefined => {
  const issues = loadIssues();
  const index = issues.findIndex((issue) => issue.id === id);
  if (index < 0) {
    return undefined;
  }

  const updated: Issue = {
    ...issues[index],
    sprint,
    updatedAt: new Date().toISOString(),
  };
  const next = [...issues];
  next[index] = updated;
  saveIssues(next);
  return updated;
};

export const deleteIssue = (id: string) => {
  const next = loadIssues().filter((issue) => issue.id !== id);
  saveIssues(next);
};

export const renameIssuesProject = (fromName: string, toName: string) => {
  if (fromName === toName) {
    return;
  }
  const now = new Date().toISOString();
  const next = loadIssues().map((issue) =>
    issue.project === fromName
      ? { ...issue, project: toName, updatedAt: now }
      : issue
  );
  saveIssues(next);
};

export const deleteIssuesByProject = (projectName: string) => {
  saveIssues(loadIssues().filter((issue) => issue.project !== projectName));
};
