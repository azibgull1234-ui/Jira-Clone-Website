import { ArrowLeft, Building2, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import SectionCard from "../shared/SectionCard";
import AssignedIssuesList from "./AssignedIssuesList";
import PersonAvatar from "./PersonAvatar";
import PersonProjectsList from "./PersonProjectsList";
import RoleBadge from "./RoleBadge";
import type { Person } from "./types";

const PersonProfile = ({ person }: { person: Person }) => {
  return (
    <div className="space-y-6">
      <Link
        to="/people"
        className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        <ArrowLeft size={16} />
        Back to people
      </Link>

      <section className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
          <PersonAvatar name={person.name} avatar={person.avatar} size="lg" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-gray-900">{person.name}</h1>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  person.active
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-500"
                }`}
              >
                {person.active ? "Active" : "Inactive"}
              </span>
            </div>
            <p className="mt-2 flex items-center gap-2 text-gray-500">
              <Mail size={16} />
              {person.email}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <RoleBadge role={person.role} />
              <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                <Building2 size={16} />
                {person.department}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard title="Assigned issues">
          <AssignedIssuesList issues={person.assignedIssues} />
        </SectionCard>
        <SectionCard title="Projects">
          <PersonProjectsList projects={person.projects} />
        </SectionCard>
      </div>
    </div>
  );
};

export default PersonProfile;
