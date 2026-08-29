import type { IssueStatus } from "./types";

const STATUS_STYLES: Record<IssueStatus, string> = {
  Backlog: "bg-slate-100 text-slate-700",
  "To Do": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "In Review": "bg-amber-100 text-amber-800",
  Done: "bg-green-100 text-green-700",
};

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => (
  <span
    className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}
  >
    {status.toUpperCase()}
  </span>
);

export default IssueStatusBadge;
