import { Search } from "lucide-react";
import { DEPARTMENTS, USER_ROLES, type PeopleFilterValues } from "./types";

interface PeopleFiltersProps {
  filters: PeopleFilterValues;
  onChange: (filters: PeopleFilterValues) => void;
}

const selectClassName =
  "rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500";

const PeopleFilters = ({ filters, onChange }: PeopleFiltersProps) => {
  const update = (key: keyof PeopleFilterValues, value: string) => {
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
          placeholder="Search people..."
          className="w-full rounded-lg border border-gray-300 py-2.5 pr-4 pl-10 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <select
        value={filters.role}
        onChange={(event) => update("role", event.target.value)}
        className={selectClassName}
        aria-label="Filter by role"
      >
        <option value="all">All roles</option>
        {USER_ROLES.map((role) => (
          <option key={role} value={role}>
            {role}
          </option>
        ))}
      </select>

      <select
        value={filters.department}
        onChange={(event) => update("department", event.target.value)}
        className={selectClassName}
        aria-label="Filter by department"
      >
        <option value="all">All departments</option>
        {DEPARTMENTS.map((department) => (
          <option key={department} value={department}>
            {department}
          </option>
        ))}
      </select>

      <select
        value={filters.status}
        onChange={(event) => update("status", event.target.value)}
        className={selectClassName}
        aria-label="Filter by status"
      >
        <option value="all">All statuses</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default PeopleFilters;
