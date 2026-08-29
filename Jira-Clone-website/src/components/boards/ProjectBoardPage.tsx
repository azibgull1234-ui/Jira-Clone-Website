import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BoardFilters, { type BoardFilterValues } from "./BoardFilters";
import KanbanBoard from "./KanbanBoard";
import { useIssues } from "../../context/IssuesContext";
import { useProjects } from "../../context/ProjectsContext";
import { issueAssignees } from "../issues/mockData";
import type { IssueStatus } from "../issues/types";

const defaultFilters: BoardFilterValues = {
  search: "",
  type: "all",
  priority: "all",
  assignee: "all",
};

const ProjectBoardPage = () => {
  const { projectId } = useParams();
  const { getProject } = useProjects();
  const { issues, moveIssue } = useIssues();
  const [filters, setFilters] = useState<BoardFilterValues>(defaultFilters);
  const project = projectId ? getProject(projectId) : undefined;

  const filteredIssues = useMemo(() => {
    if (!project) {
      return [];
    }

    const query = filters.search.trim().toLowerCase();

    return issues.filter((issue) => {
      if (issue.project !== project.name) {
        return false;
      }

      const matchesSearch =
        !query ||
        issue.title.toLowerCase().includes(query) ||
        issue.key.toLowerCase().includes(query);

      const matchesType = filters.type === "all" || issue.type === filters.type;
      const matchesPriority =
        filters.priority === "all" || issue.priority === filters.priority;
      const matchesAssignee =
        filters.assignee === "all" ||
        (filters.assignee === "unassigned" && !issue.assignee) ||
        issue.assignee === filters.assignee;

      return matchesSearch && matchesType && matchesPriority && matchesAssignee;
    });
  }, [filters, issues, project]);

  if (!project) {
    return (
      <div className="space-y-4">
        <p className="text-gray-500">Board not found.</p>
        <Link to="/boards" className="font-medium text-blue-600">
          Back to boards
        </Link>
      </div>
    );
  }

  const handleMove = (issueId: string, status: IssueStatus) => {
    moveIssue(issueId, status);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            to="/boards"
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            ← All boards
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{project.name} board</h1>
          <p className="mt-1 text-gray-500">
            Drag cards between columns to update status.
          </p>
        </div>
        <Link
          to="/issues/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          + Create issue
        </Link>
      </div>

      <BoardFilters
        filters={filters}
        assignees={issueAssignees}
        onChange={setFilters}
      />

      <KanbanBoard issues={filteredIssues} onMove={handleMove} />
    </div>
  );
};

export default ProjectBoardPage;
