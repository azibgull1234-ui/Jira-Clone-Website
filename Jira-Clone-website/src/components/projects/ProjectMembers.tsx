interface ProjectMembersProps {
  lead: string;
  members: string[];
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");

const ProjectMembers = ({ lead, members }: ProjectMembersProps) => {
  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Members</h2>
      <ul className="space-y-3">
        {members.map((member) => (
          <li key={member} className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              {initials(member)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{member}</p>
              <p className="text-xs text-gray-500">{member === lead ? "Lead" : "Member"}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectMembers;
