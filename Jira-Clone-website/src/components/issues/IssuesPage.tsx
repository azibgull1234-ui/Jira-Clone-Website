import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import IssueCard from "./IssueCard";
import IssueFilters from "./IssueFilters";
import IssueTable from "./IssueTable";
import { useIssues } from "../../context/IssuesContext";
import { issueAssignees } from "./mockData";
import type { Issue, IssueFilterValues } from "./types";

const defaultFilters: IssueFilterValues = {
  search: "",
  status: "all",
  type: "all",
  priority: "all",
  assignee: "all",
};

const IssuesPage = () => {
  const { issues, deleteIssue } = useIssues();
  const [filters, setFilters] = useState<IssueFilterValues>(defaultFilters);

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase();

    return issues.filter((issue) => {
      const matchesSearch =
        !query ||
        issue.title.toLowerCase().includes(query) ||
        issue.key.toLowerCase().includes(query) ||
        issue.description.toLowerCase().includes(query);

      const matchesStatus = filters.status === "all" || issue.status === filters.status;
      const matchesType = filters.type === "all" || issue.type === filters.type;
      const matchesPriority =
        filters.priority === "all" || issue.priority === filters.priority;
      const matchesAssignee =
        filters.assignee === "all" ||
        (filters.assignee === "unassigned" && !issue.assignee) ||
        issue.assignee === filters.assignee;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesType &&
        matchesPriority &&
        matchesAssignee
      );
    });
  }, [filters, issues]);

  const handleDelete = (issue: Issue) => {
    if (window.confirm(`Delete ${issue.key}? This cannot be undone.`)) {
      deleteIssue(issue.id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Issues</h1>
          <p className="mt-1 text-gray-500">
            Search, filter, and manage work across your projects.
          </p>
        </div>
        <Link
          to="/issues/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          + Create issue
        </Link>
      </div>

      <IssueFilters
        filters={filters}
        assignees={issueAssignees}
        onChange={setFilters}
      />

      <p className="text-sm text-gray-500">
        Showing {filtered.length} of {issues.length} issues
      </p>

      <div className="hidden md:block">
        <IssueTable issues={filtered} onDelete={handleDelete} />
      </div>

      <div className="grid gap-4 md:hidden">
        {filtered.length === 0 ? (
          <p className="rounded-xl border border-gray-100 bg-white p-8 text-center text-gray-500">
            No issues match these filters.
          </p>
        ) : (
          filtered.map((issue) => (
            <IssueCard key={issue.id} issue={issue} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default IssuesPage;
