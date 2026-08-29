const PROJECT_COLORS: Record<string, string> = {
  purple: "bg-linear-to-br from-purple-500 to-indigo-600",
  green: "bg-linear-to-br from-green-500 to-emerald-600",
  orange: "bg-linear-to-br from-orange-400 to-orange-600",
};

interface ProjectListItemProps {
  initials: string;
  name: string;
  type: string;
  color: string;
}

const ProjectListItem = ({
  initials,
  name,
  type,
  color,
}: ProjectListItemProps) => {
  return (
    <div className="flex cursor-pointer items-center gap-4 rounded-lg p-3 transition-all hover:bg-gray-50">
      <div
        className={`flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg text-lg font-bold text-white ${
          PROJECT_COLORS[color] ?? "bg-blue-600"
        }`}
      >
        {initials}
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="font-semibold text-gray-900">{name}</h3>
        <p className="text-sm text-gray-500">{type}</p>
      </div>
    </div>
  );
};

export default ProjectListItem;
