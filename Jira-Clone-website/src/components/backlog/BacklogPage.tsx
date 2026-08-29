import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import BacklogFilters, { type BacklogFilterValues } from "./BacklogFilters";
import BacklogRow from "./BacklogRow";
import BacklogSection from "./BacklogSection";
import { useIssues } from "../../context/IssuesContext";
import { useProjects } from "../../context/ProjectsContext";
import { issueAssignees } from "../issues/mockData";
import type { Issue, SprintId } from "../issues/types";
import { SPRINTS } from "../issues/types";

const defaultFilters: BacklogFilterValues = {
  search: "",
  type: "all",
  priority: "all",
  assignee: "all",
  project: "all",
};

type DropTarget = SprintId | "backlog" | "epics";

const BacklogPage = () => {
  const { issues, deleteIssue, moveIssueToSprint } = useIssues();
  const { projects } = useProjects();
  const [filters, setFilters] = useState<BacklogFilterValues>(defaultFilters);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overTarget, setOverTarget] = useState<DropTarget | null>(null);

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return issues.filter((issue) => {
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
      const matchesProject =
        filters.project === "all" || issue.project === filters.project;

      return (
        matchesSearch &&
        matchesType &&
        matchesPriority &&
        matchesAssignee &&
        matchesProject
      );
    });
  }, [filters, issues]);

  const epics = filtered.filter((issue) => issue.type === "Epic");
  const nonEpics = filtered.filter((issue) => issue.type !== "Epic");
  const sprintIssues = (sprintId: SprintId) =>
    nonEpics.filter((issue) => issue.sprint === sprintId);
  const backlogIssues = nonEpics.filter((issue) => !issue.sprint);

  const handleDelete = (issue: Issue) => {
    if (window.confirm(`Delete ${issue.key}? This cannot be undone.`)) {
      deleteIssue(issue.id);
    }
  };

  const handleMove = (issueId: string, sprint: SprintId | null) => {
    moveIssueToSprint(issueId, sprint);
  };

  const handleDrop = (target: DropTarget, issueId: string) => {
    if (target === "epics") {
      setOverTarget(null);
      setDraggingId(null);
      return;
    }

    handleMove(issueId, target === "backlog" ? null : target);
    setOverTarget(null);
    setDraggingId(null);
  };

  const renderRows = (list: Issue[]) =>
    list.map((issue) => (
      <BacklogRow
        key={issue.id}
        issue={issue}
        isDragging={draggingId === issue.id}
        onDragStart={setDraggingId}
        onDragEnd={() => {
          setDraggingId(null);
          setOverTarget(null);
        }}
        onMove={handleMove}
        onDelete={handleDelete}
      />
    ));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Backlog</h1>
          <p className="mt-1 text-gray-500">
            Plan epics, sprints, and unscheduled work. Drag issues between sprints and the
            backlog.
          </p>
        </div>
        <Link
          to="/issues/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          + Create issue
        </Link>
      </div>

      <BacklogFilters
        filters={filters}
        assignees={issueAssignees}
        projects={projects.map((project) => project.name)}
        onChange={setFilters}
      />

      <BacklogSection
        title="Epics"
        count={epics.length}
        dropId="epics"
        isOver={overTarget === "epics"}
        onDragOver={setOverTarget}
        onDrop={handleDrop}
      >
        {renderRows(epics)}
      </BacklogSection>

      {SPRINTS.map((sprint) => {
        const list = sprintIssues(sprint.id);
        return (
          <BacklogSection
            key={sprint.id}
            title={sprint.name}
            count={list.length}
            dropId={sprint.id}
            isOver={overTarget === sprint.id}
            onDragOver={setOverTarget}
            onDrop={handleDrop}
          >
            {renderRows(list)}
          </BacklogSection>
        );
      })}

      <BacklogSection
        title="Backlog"
        count={backlogIssues.length}
        dropId="backlog"
        isOver={overTarget === "backlog"}
        onDragOver={setOverTarget}
        onDrop={handleDrop}
      >
        {renderRows(backlogIssues)}
      </BacklogSection>
    </div>
  );
};

export default BacklogPage;
