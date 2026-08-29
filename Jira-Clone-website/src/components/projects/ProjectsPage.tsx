import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProjectGrid from "./ProjectGrid";
import ProjectSearch from "./ProjectSearch";
import { useIssues } from "../../context/IssuesContext";
import { useProjects } from "../../context/ProjectsContext";

const ProjectsPage = () => {
  const { projects } = useProjects();
  const { issues } = useIssues();
  const [search, setSearch] = useState("");

  const issueCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const issue of issues) {
      counts[issue.project] = (counts[issue.project] ?? 0) + 1;
    }
    return counts;
  }, [issues]);

  const filtered = projects.filter((project) => {
    const query = search.trim().toLowerCase();
    if (!query) {
      return true;
    }
    return (
      project.name.toLowerCase().includes(query) ||
      project.key.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query) ||
      project.projectType.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-1 text-gray-500">
            Search, create, and manage team projects.
          </p>
        </div>
        <Link
          to="/projects/new"
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700"
        >
          + Create project
        </Link>
      </div>

      <ProjectSearch value={search} onChange={setSearch} />

      <ProjectGrid projects={filtered} issueCounts={issueCounts} />
    </div>
  );
};

export default ProjectsPage;
