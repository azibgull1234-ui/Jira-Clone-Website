import { Link } from "react-router-dom";
import type { Project } from "./types";
import { PROJECT_TYPE_COLORS } from "./types";
import ProjectTypeBadge from "./ProjectTypeBadge";

interface ProjectCardProps {
  project: Project;
  issueCount: number;
}

const ProjectCard = ({ project, issueCount }: ProjectCardProps) => {
  return (
    <Link
      to={`/projects/${project.id}`}
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
      <p className="line-clamp-2 text-sm text-gray-500">{project.description}</p>
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>Lead: {project.lead}</span>
        <span>{project.members.length} members</span>
        <span>{issueCount} issues</span>
      </div>
    </Link>
  );
};

export default ProjectCard;
