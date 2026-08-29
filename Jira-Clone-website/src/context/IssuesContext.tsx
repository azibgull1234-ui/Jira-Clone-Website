import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  createIssue as createIssueRecord,
  deleteIssue as deleteIssueRecord,
  deleteIssuesByProject as deleteIssuesByProjectRecord,
  getIssues,
  renameIssuesProject as renameIssuesProjectRecord,
  updateIssue as updateIssueRecord,
  updateIssueStatus as updateIssueStatusRecord,
  updateIssueSprint as updateIssueSprintRecord,
} from "../components/issues/issueService";
import type { CreateIssueInput, Issue, IssueStatus, SprintId } from "../components/issues/types";

interface IssuesContextValue {
  issues: Issue[];
  createIssue: (input: CreateIssueInput) => Issue;
  updateIssue: (id: string, input: CreateIssueInput) => Issue | undefined;
  deleteIssue: (id: string) => void;
  getIssue: (id: string) => Issue | undefined;
  moveIssue: (id: string, status: IssueStatus) => void;
  moveIssueToSprint: (id: string, sprint: SprintId | null) => void;
  renameIssuesProject: (fromName: string, toName: string) => void;
  deleteIssuesByProject: (projectName: string) => void;
}

const IssuesContext = createContext<IssuesContextValue | undefined>(undefined);

export const IssuesProvider = ({ children }: { children: ReactNode }) => {
  const [issues, setIssues] = useState<Issue[]>(() => getIssues());

  const createIssue = useCallback((input: CreateIssueInput) => {
    const created = createIssueRecord(input);
    setIssues(getIssues());
    return created;
  }, []);

  const updateIssue = useCallback((id: string, input: CreateIssueInput) => {
    const updated = updateIssueRecord(id, input);
    setIssues(getIssues());
    return updated;
  }, []);

  const deleteIssue = useCallback((id: string) => {
    deleteIssueRecord(id);
    setIssues(getIssues());
  }, []);

  const renameIssuesProject = useCallback((fromName: string, toName: string) => {
    renameIssuesProjectRecord(fromName, toName);
    setIssues(getIssues());
  }, []);

  const deleteIssuesByProject = useCallback((projectName: string) => {
    deleteIssuesByProjectRecord(projectName);
    setIssues(getIssues());
  }, []);

  const getIssue = useCallback(
    (id: string) => issues.find((issue) => issue.id === id),
    [issues]
  );

  const moveIssue = useCallback((id: string, status: IssueStatus) => {
    updateIssueStatusRecord(id, status);
    setIssues(getIssues());
  }, []);

  const moveIssueToSprint = useCallback((id: string, sprint: SprintId | null) => {
    updateIssueSprintRecord(id, sprint);
    setIssues(getIssues());
  }, []);

  const value = useMemo(
    () => ({
      issues,
      createIssue,
      updateIssue,
      deleteIssue,
      getIssue,
      moveIssue,
      moveIssueToSprint,
      renameIssuesProject,
      deleteIssuesByProject,
    }),
    [
      createIssue,
      deleteIssue,
      deleteIssuesByProject,
      getIssue,
      issues,
      moveIssue,
      moveIssueToSprint,
      renameIssuesProject,
      updateIssue,
    ]
  );

  return <IssuesContext.Provider value={value}>{children}</IssuesContext.Provider>;
};

export const useIssues = () => {
  const context = useContext(IssuesContext);
  if (!context) {
    throw new Error("useIssues must be used within an IssuesProvider");
  }
  return context;
};
