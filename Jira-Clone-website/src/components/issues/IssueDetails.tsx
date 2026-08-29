import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Issue } from "./types";
import IssueStatusBadge from "./IssueStatusBadge";
import IssueTypeBadge from "./IssueTypeBadge";

interface IssueDetailsProps {
  issue: Issue;
  onDelete: () => void;
}

const formatDate = (value: string | null) => {
  if (!value) {
    return "—";
  }
  return new Date(value).toLocaleDateString();
};

const DetailRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 py-3 last:border-b-0">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="text-sm font-medium text-gray-900">{children}</span>
  </div>
);

const IssueDetails = ({ issue, onDelete }: IssueDetailsProps) => {
  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-gray-500">{issue.key}</p>
            <h1 className="mt-1 text-3xl font-bold text-gray-900">{issue.title}</h1>
          </div>
          <div className="flex gap-2">
            <Link
              to={`/issues/${issue.id}/edit`}
              className="rounded-lg border px-4 py-2.5 font-medium text-gray-700"
            >
              Edit
            </Link>
            <button
              type="button"
              onClick={onDelete}
              className="rounded-lg bg-red-600 px-4 py-2.5 font-medium text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>

        <section className="rounded-xl border border-gray-100 bg-white p-6">
          <h2 className="mb-3 font-semibold text-gray-900">Description</h2>
          <p className="whitespace-pre-wrap text-gray-600">
            {issue.description || "No description."}
          </p>
        </section>
      </div>

      <aside className="h-fit rounded-xl border border-gray-100 bg-white p-6">
        <DetailRow label="Type">
          <IssueTypeBadge type={issue.type} />
        </DetailRow>
        <DetailRow label="Status">
          <IssueStatusBadge status={issue.status} />
        </DetailRow>
        <DetailRow label="Priority">{issue.priority}</DetailRow>
        <DetailRow label="Assignee">{issue.assignee ?? "Unassigned"}</DetailRow>
        <DetailRow label="Reporter">{issue.reporter}</DetailRow>
        <DetailRow label="Project">{issue.project}</DetailRow>
        <DetailRow label="Due date">{formatDate(issue.dueDate)}</DetailRow>
        <DetailRow label="Created">{formatDate(issue.createdAt)}</DetailRow>
        <DetailRow label="Updated">{formatDate(issue.updatedAt)}</DetailRow>
      </aside>
    </div>
  );
};

export default IssueDetails;
