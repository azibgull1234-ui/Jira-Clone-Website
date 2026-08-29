import type { PersonIssue } from "./types";

const TYPE_STYLES: Record<string, string> = {
  Bug: "bg-red-500 text-white",
  Task: "bg-blue-500 text-white",
  Story: "bg-green-500 text-white",
  Feature: "bg-teal-500 text-white",
  Epic: "bg-purple-500 text-white",
};

const STATUS_STYLES: Record<string, string> = {
  Backlog: "bg-slate-100 text-slate-700",
  "To Do": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "In Review": "bg-amber-100 text-amber-800",
  Done: "bg-green-100 text-green-700",
};

const AssignedIssuesList = ({ issues }: { issues: PersonIssue[] }) => {
  if (issues.length === 0) {
    return <p className="text-sm text-gray-400">No issues assigned.</p>;
  }

  return (
    <ul className="space-y-3">
      {issues.map((issue) => (
        <li
          key={issue.id}
          className="rounded-lg border border-gray-100 bg-[#f4f5f7] p-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-md px-2 py-1 text-[10px] font-bold ${
                    TYPE_STYLES[issue.type] ?? "bg-gray-500 text-white"
                  }`}
                >
                  {issue.type}
                </span>
                <span className="text-sm font-medium text-gray-500">{issue.key}</span>
              </div>
              <p className="font-semibold text-gray-900">{issue.title}</p>
              <p className="mt-1 text-sm text-gray-500">{issue.project}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                STATUS_STYLES[issue.status] ?? "bg-gray-100 text-gray-700"
              }`}
            >
              {issue.status.toUpperCase()}
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-500">Priority: {issue.priority}</p>
        </li>
      ))}
    </ul>
  );
};

export default AssignedIssuesList;
