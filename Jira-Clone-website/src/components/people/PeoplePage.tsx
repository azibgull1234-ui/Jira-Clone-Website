import { useMemo, useState } from "react";
import { UserCheck, UserX, Users } from "lucide-react";
import StatCard from "../shared/StatCard";
import PeopleFilters from "./PeopleFilters";
import PersonCard from "./PersonCard";
import { filterPeople, getPeople } from "./peopleService";
import type { PeopleFilterValues } from "./types";

const defaultFilters: PeopleFilterValues = {
  search: "",
  role: "all",
  department: "all",
  status: "all",
};

const PeoplePage = () => {
  const people = getPeople();
  const [filters, setFilters] = useState<PeopleFilterValues>(defaultFilters);

  const filtered = useMemo(
    () => filterPeople(people, filters),
    [filters, people]
  );

  const activeCount = people.filter((person) => person.active).length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">People</h1>
        <p className="mt-1 text-gray-500">
          Browse the team, filter by role, and open a profile.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        <StatCard
          label="Team members"
          value={people.length}
          icon={Users}
          iconClassName="text-purple-600"
          iconWrapClassName="bg-purple-100"
        />
        <StatCard
          label="Active"
          value={activeCount}
          icon={UserCheck}
          iconClassName="text-green-600"
          iconWrapClassName="bg-green-100"
        />
        <StatCard
          label="Inactive"
          value={people.length - activeCount}
          icon={UserX}
          iconClassName="text-orange-600"
          iconWrapClassName="bg-orange-100"
        />
      </div>

      <PeopleFilters filters={filters} onChange={setFilters} />

      <p className="text-sm text-gray-500">
        Showing {filtered.length} of {people.length} people
      </p>

      {filtered.length === 0 ? (
        <p className="rounded-xl border border-gray-100 bg-white p-8 text-center text-gray-500">
          No people match these filters.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PeoplePage;
