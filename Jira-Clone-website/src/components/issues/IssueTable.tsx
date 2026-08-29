import { Eye, Pencil, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import type { Issue } from "./types";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueTypeBadge from "./IssueTypeBadge";

interface IssueTableProps {
  issues: Issue[];
  onDelete: (issue: Issue) => void;
}

const IssueTable = ({ issues, onDelete }: IssueTableProps) => {
  if (issues.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-10 text-center text-gray-500">
        No issues match these filters.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100 bg-white">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b bg-gray-50 text-xs font-semibold tracking-wide text-gray-500 uppercase">
          <tr>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Key</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Priority</th>
            <th className="px-4 py-3">Assignee</th>
            <th className="px-4 py-3">Project</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((issue) => (
            <tr key={issue.id} className="border-b last:border-b-0 hover:bg-gray-50">
              <td className="px-4 py-3">
                <IssueTypeBadge type={issue.type} />
              </td>
              <td className="px-4 py-3 font-medium text-gray-600">{issue.key}</td>
              <td className="max-w-xs px-4 py-3">
                <Link to={`/issues/${issue.id}`} className="font-medium text-gray-900 hover:text-blue-600">
                  {issue.title}
                </Link>
              </td>
              <td className="px-4 py-3">
                <IssueStatusBadge status={issue.status} />
              </td>
              <td className="px-4 py-3 text-gray-600">{issue.priority}</td>
              <td className="px-4 py-3 text-gray-600">{issue.assignee ?? "Unassigned"}</td>
              <td className="px-4 py-3 text-gray-600">{issue.project}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Link to={`/issues/${issue.id}`} aria-label={`View ${issue.key}`}>
                    <Eye size={16} className="text-gray-500 hover:text-blue-600" />
                  </Link>
                  <Link to={`/issues/${issue.id}/edit`} aria-label={`Edit ${issue.key}`}>
                    <Pencil size={16} className="text-gray-500 hover:text-blue-600" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => onDelete(issue)}
                    aria-label={`Delete ${issue.key}`}
                  >
                    <Trash2 size={16} className="text-gray-500 hover:text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IssueTable;
