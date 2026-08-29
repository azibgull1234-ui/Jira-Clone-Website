import { useMemo } from "react";
import { Link } from "react-router-dom";
import BoardProjectCard from "./BoardProjectCard";
import { useIssues } from "../../context/IssuesContext";
import { useProjects } from "../../context/ProjectsContext";

const BoardsPage = () => {
  const { projects } = useProjects();
  const { issues } = useIssues();

  const issueCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const issue of issues) {
      counts[issue.project] = (counts[issue.project] ?? 0) + 1;
    }
    return counts;
  }, [issues]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Boards</h1>
        <p className="mt-1 text-gray-500">
          Open a project board to move work across columns.
        </p>
      </div>

      {projects.length === 0 ? (
        <p className="rounded-xl border border-gray-100 bg-white p-10 text-center text-gray-500">
          Create a project first, then open its board.
        </p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <BoardProjectCard
              key={project.id}
              project={project}
              issueCount={issueCounts[project.name] ?? 0}
            />
          ))}
        </div>
      )}

      <Link to="/projects/new" className="text-sm font-medium text-blue-600">
        Create a project
      </Link>
    </div>
  );
};

export default BoardsPage;
