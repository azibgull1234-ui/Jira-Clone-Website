import { Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Issue, SprintId } from "../issues/types";
import { SPRINTS } from "../issues/types";
import IssueStatusBadge from "../issues/IssueStatusBadge";
import IssueTypeBadge from "../issues/IssueTypeBadge";

interface BacklogRowProps {
  issue: Issue;
  isDragging?: boolean;
  onDragStart: (issueId: string) => void;
  onDragEnd: () => void;
  onMove: (issueId: string, sprint: SprintId | null) => void;
  onDelete: (issue: Issue) => void;
}

const BacklogRow = ({
  issue,
  isDragging = false,
  onDragStart,
  onDragEnd,
  onMove,
  onDelete,
}: BacklogRowProps) => {
  return (
    <div
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", issue.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart(issue.id);
      }}
      onDragEnd={onDragEnd}
      className={`flex flex-col gap-3 rounded-lg border border-gray-100 bg-white px-3 py-3 hover:bg-gray-50 sm:flex-row sm:items-center ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <IssueTypeBadge type={issue.type} />
        <Link
          to={`/issues/${issue.id}`}
          className="w-20 shrink-0 text-sm font-medium text-gray-500 hover:text-blue-600"
        >
          {issue.key}
        </Link>
        <span className="truncate text-sm font-medium text-gray-900">{issue.title}</span>
      </div>
      <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
        <IssueStatusBadge status={issue.status} />
        <span className="text-xs text-gray-500">{issue.assignee ?? "Unassigned"}</span>
        <select
          value={issue.sprint ?? ""}
          onMouseDown={(event) => event.stopPropagation()}
          onChange={(event) =>
            onMove(issue.id, (event.target.value || null) as SprintId | null)
          }
          className="rounded-md border border-gray-300 px-2 py-1 text-xs"
          aria-label={`Move ${issue.key}`}
        >
          <option value="">Backlog</option>
          {SPRINTS.map((sprint) => (
            <option key={sprint.id} value={sprint.id}>
              {sprint.name}
            </option>
          ))}
        </select>
        <Link to={`/issues/${issue.id}/edit`} aria-label={`Edit ${issue.key}`}>
          <Pencil size={15} className="text-gray-500 hover:text-blue-600" />
        </Link>
        <button type="button" onClick={() => onDelete(issue)} aria-label={`Delete ${issue.key}`}>
          <Trash2 size={15} className="text-gray-500 hover:text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default BacklogRow;
