import { Link } from "react-router-dom";
import type { Project } from "../projects/types";
import { PROJECT_TYPE_COLORS } from "../projects/types";
import ProjectTypeBadge from "../projects/ProjectTypeBadge";

interface BoardProjectCardProps {
  project: Project;
  issueCount: number;
}

const BoardProjectCard = ({ project, issueCount }: BoardProjectCardProps) => {
  return (
    <Link
      to={`/boards/${project.id}`}
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg text-lg font-bold text-white ${PROJECT_TYPE_COLORS[project.projectType]}`}
      >
        {project.key}
      </div>
      <div className="mb-2 flex items-start justify-between gap-3">
        <h2 className="text-lg font-semibold text-gray-900">{project.name}</h2>
        <ProjectTypeBadge type={project.projectType} />
      </div>
      <p className="text-sm text-gray-500">{issueCount} issues on this board</p>
    </Link>
  );
};

export default BoardProjectCard;
