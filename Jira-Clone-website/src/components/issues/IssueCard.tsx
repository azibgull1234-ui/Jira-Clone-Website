import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Issue } from "./types";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueTypeBadge from "./IssueTypeBadge";

interface IssueCardProps {
  issue: Issue;
  onDelete: (issue: Issue) => void;
}

const IssueCard = ({ issue, onDelete }: IssueCardProps) => {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="mb-2 flex items-center gap-2">
            <IssueTypeBadge type={issue.type} />
            <span className="text-sm font-medium text-gray-500">{issue.key}</span>
          </div>
          <h3 className="font-semibold text-gray-900">{issue.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{issue.project}</p>
        </div>
        <IssueStatusBadge status={issue.status} />
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{issue.assignee ?? "Unassigned"}</span>
        <span>{issue.priority}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <Link
          to={`/issues/${issue.id}`}
          className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-gray-700"
        >
          <Eye size={14} />
          View
        </Link>
        <Link
          to={`/issues/${issue.id}/edit`}
          className="inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm text-gray-700"
        >
          <Pencil size={14} />
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(issue)}
          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600"
        >
          <Trash2 size={14} />
          Delete
        </button>
      </div>
    </article>
  );
};

export default IssueCard;
