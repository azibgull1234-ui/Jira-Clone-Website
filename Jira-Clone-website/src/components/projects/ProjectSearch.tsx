import { Search } from "lucide-react";

interface ProjectSearchProps {
  value: string;
  onChange: (value: string) => void;
}

const ProjectSearch = ({ value, onChange }: ProjectSearchProps) => {
  return (
    <div className="relative max-w-md flex-1">
      <Search className="absolute top-3 left-3 text-gray-400" size={16} />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search projects..."
        className="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default ProjectSearch;
