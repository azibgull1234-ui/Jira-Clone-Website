import type { PersonProject } from "./types";

const PersonProjectsList = ({ projects }: { projects: PersonProject[] }) => {
  if (projects.length === 0) {
    return <p className="text-sm text-gray-400">Not on any projects.</p>;
  }

  return (
    <ul className="space-y-3">
      {projects.map((project) => (
        <li
          key={project.id}
          className="flex items-center gap-3 rounded-lg border border-gray-100 bg-[#f4f5f7] p-4"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
            {project.key}
          </div>
          <div className="min-w-0">
            <p className="truncate font-semibold text-gray-900">{project.name}</p>
            <p className="text-sm text-gray-500">{project.role}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PersonProjectsList;
