import { Link } from "react-router-dom";
import type { Issue, IssuePriority } from "../issues/types";
import IssueStatusBadge from "../issues/IssueStatusBadge";
import IssueTypeBadge from "../issues/IssueTypeBadge";

interface BoardCardProps {
  issue: Issue;
  isDragging?: boolean;
  onDragStart: (issueId: string) => void;
  onDragEnd: () => void;
}

const PRIORITY_STYLES: Record<IssuePriority, string> = {
  Highest: "text-red-600",
  High: "text-orange-600",
  Medium: "text-amber-600",
  Low: "text-blue-600",
  Lowest: "text-gray-500",
};

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const BoardCard = ({
  issue,
  isDragging = false,
  onDragStart,
  onDragEnd,
}: BoardCardProps) => {
  return (
    <article
      draggable
      onDragStart={(event) => {
        event.dataTransfer.setData("text/plain", issue.id);
        event.dataTransfer.effectAllowed = "move";
        onDragStart(issue.id);
      }}
      onDragEnd={onDragEnd}
      className={`cursor-grab rounded-lg border border-gray-100 bg-white p-3 shadow-sm active:cursor-grabbing ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <Link
          to={`/issues/${issue.id}`}
          className="text-xs font-semibold text-gray-500 hover:text-blue-600"
        >
          {issue.key}
        </Link>
        <IssueTypeBadge type={issue.type} />
      </div>
      <h3 className="text-sm font-semibold text-gray-900">{issue.title}</h3>
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className={`text-xs font-medium ${PRIORITY_STYLES[issue.priority]}`}>
          {issue.priority}
        </span>
        <IssueStatusBadge status={issue.status} />
      </div>
      <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
        {issue.assignee ? (
          <>
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-700">
              {initials(issue.assignee)}
            </span>
            <span className="truncate">{issue.assignee}</span>
          </>
        ) : (
          <span>Unassigned</span>
        )}
      </div>
    </article>
  );
};

export default BoardCard;
