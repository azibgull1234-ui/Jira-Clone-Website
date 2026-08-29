import { Search } from "lucide-react";
import { ISSUE_PRIORITIES, ISSUE_TYPES } from "../issues/types";

export interface BoardFilterValues {
  search: string;
  type: string;
  priority: string;
  assignee: string;
}

interface BoardFiltersProps {
  filters: BoardFilterValues;
  assignees: string[];
  onChange: (filters: BoardFilterValues) => void;
}

const selectClassName =
  "rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500";

const BoardFilters = ({ filters, assignees, onChange }: BoardFiltersProps) => {
  const update = (key: keyof BoardFilterValues, value: string) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 lg:flex-row lg:flex-wrap lg:items-center">
      <div className="relative min-w-[220px] flex-1">
        <Search className="absolute top-3 left-3 text-gray-400" size={16} />
        <input
          type="search"
          value={filters.search}
          onChange={(event) => update("search", event.target.value)}
          placeholder="Search issues..."
          className="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <select
        value={filters.type}
        onChange={(event) => update("type", event.target.value)}
        className={selectClassName}
        aria-label="Filter by type"
      >
        <option value="all">All types</option>
        {ISSUE_TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <select
        value={filters.priority}
        onChange={(event) => update("priority", event.target.value)}
        className={selectClassName}
        aria-label="Filter by priority"
      >
        <option value="all">All priorities</option>
        {ISSUE_PRIORITIES.map((priority) => (
          <option key={priority} value={priority}>
            {priority}
          </option>
        ))}
      </select>
      <select
        value={filters.assignee}
        onChange={(event) => update("assignee", event.target.value)}
        className={selectClassName}
        aria-label="Filter by assignee"
      >
        <option value="all">All assignees</option>
        <option value="unassigned">Unassigned</option>
        {assignees.map((person) => (
          <option key={person} value={person}>
            {person}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BoardFilters;
