import type { ProjectType } from "./types";

const TYPE_STYLES: Record<ProjectType, string> = {
  Software: "bg-indigo-100 text-indigo-700",
  Business: "bg-orange-100 text-orange-700",
  Marketing: "bg-emerald-100 text-emerald-700",
};

const ProjectTypeBadge = ({ type }: { type: ProjectType }) => (
  <span
    className={`rounded-full px-3 py-1 text-xs font-semibold ${TYPE_STYLES[type]}`}
  >
    {type}
  </span>
);

export default ProjectTypeBadge;
