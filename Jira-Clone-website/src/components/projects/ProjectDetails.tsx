import { Link } from "react-router-dom";
import type { Issue } from "../issues/types";
import type { Project } from "./types";
import { PROJECT_TYPE_COLORS } from "./types";
import IssueStatusBadge from "../issues/IssueStatusBadge";
import IssueTypeBadge from "../issues/IssueTypeBadge";
import ProjectMembers from "./ProjectMembers";
import ProjectStats from "./ProjectStats";
import ProjectTypeBadge from "./ProjectTypeBadge";

interface ProjectDetailsProps {
  project: Project;
  issues: Issue[];
  onDelete: () => void;
}

const ProjectDetails = ({ project, issues, onDelete }: ProjectDetailsProps) => {
  const completedCount = issues.filter((issue) => issue.status === "Done").length;
  const openCount = issues.length - completedCount;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-xl font-bold text-white ${PROJECT_TYPE_COLORS[project.projectType]}`}
          >
            {project.key}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-gray-500">{project.key}</span>
              <ProjectTypeBadge type={project.projectType} />
              <span className="text-sm text-gray-500">Lead: {project.lead}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Link
            to={`/projects/${project.id}/edit`}
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
        <h2 className="mb-2 font-semibold text-gray-900">Description</h2>
        <p className="whitespace-pre-wrap text-gray-600">
          {project.description || "No description."}
        </p>
      </section>

      <ProjectStats
        issueCount={issues.length}
        completedCount={completedCount}
        openCount={openCount}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ProjectMembers lead={project.lead} members={project.members} />
        </div>
        <section className="rounded-xl border border-gray-100 bg-white p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Issues</h2>
            <Link to="/issues" className="text-sm font-medium text-blue-600">
              View all issues
            </Link>
          </div>
          {issues.length === 0 ? (
            <p className="text-sm text-gray-500">No issues in this project yet.</p>
          ) : (
            <ul className="space-y-3">
              {issues.slice(0, 6).map((issue) => (
                <li key={issue.id}>
                  <Link
                    to={`/issues/${issue.id}`}
                    className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50"
                  >
                    <IssueTypeBadge type={issue.type} />
                    <span className="w-20 text-sm text-gray-500">{issue.key}</span>
                    <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-900">
                      {issue.title}
                    </span>
                    <IssueStatusBadge status={issue.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProjectDetails;
