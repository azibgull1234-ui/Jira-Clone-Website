import { Link } from "react-router-dom";
import type { Person } from "./types";
import PersonAvatar from "./PersonAvatar";
import RoleBadge from "./RoleBadge";

const PersonCard = ({ person }: { person: Person }) => {
  return (
    <Link
      to={`/people/${person.id}`}
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <PersonAvatar name={person.name} avatar={person.avatar} />
          <div className="min-w-0">
            <h2 className="truncate font-semibold text-gray-900">{person.name}</h2>
            <p className="truncate text-sm text-gray-500">{person.email}</p>
          </div>
        </div>
        <span
          className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
            person.active
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-500"
          }`}
        >
          {person.active ? "Active" : "Inactive"}
        </span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <RoleBadge role={person.role} />
        <span className="text-sm text-gray-500">{person.department}</span>
      </div>

      <div className="mt-4 flex justify-between text-xs text-gray-500">
        <span>{person.assignedIssues.length} assigned issues</span>
        <span>{person.projects.length} projects</span>
      </div>
    </Link>
  );
};

export default PersonCard;
