import type { Project } from "./types";
import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
  issueCounts: Record<string, number>;
}

const ProjectGrid = ({ projects, issueCounts }: ProjectGridProps) => {
  if (projects.length === 0) {
    return (
      <p className="rounded-xl border border-gray-100 bg-white p-10 text-center text-gray-500">
        No projects match your search.
      </p>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          issueCount={issueCounts[project.name] ?? 0}
        />
      ))}
    </div>
  );
};

export default ProjectGrid;
