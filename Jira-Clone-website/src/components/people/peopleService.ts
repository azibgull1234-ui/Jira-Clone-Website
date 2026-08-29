import { mockPeople } from "./mockData";
import type { PeopleFilterValues, Person } from "./types";

export const getPeople = (): Person[] => mockPeople;

export const getPersonById = (id: string): Person | undefined =>
  mockPeople.find((person) => person.id === id);

export const filterPeople = (
  people: Person[],
  filters: PeopleFilterValues
): Person[] => {
  const query = filters.search.trim().toLowerCase();

  return people.filter((person) => {
    const matchesSearch =
      !query ||
      person.name.toLowerCase().includes(query) ||
      person.email.toLowerCase().includes(query) ||
      person.role.toLowerCase().includes(query) ||
      person.department.toLowerCase().includes(query);

    const matchesRole = filters.role === "all" || person.role === filters.role;
    const matchesDepartment =
      filters.department === "all" || person.department === filters.department;
    const matchesStatus =
      filters.status === "all" ||
      (filters.status === "active" && person.active) ||
      (filters.status === "inactive" && !person.active);

    return matchesSearch && matchesRole && matchesDepartment && matchesStatus;
  });
};
