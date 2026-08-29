import type { Project } from "./types";

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

export const projectPeople = [
  "Admin User",
  "Sarah Chen",
  "Marcus Lee",
  "Priya Patel",
  "James Okonkwo",
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    key: "WR",
    name: "Website Redesign",
    description: "Refresh the marketing site and dashboard experience.",
    projectType: "Software",
    lead: "Admin User",
    members: ["Admin User", "Sarah Chen", "Marcus Lee"],
    createdAt: daysAgo(12),
  },
  {
    id: "p2",
    key: "MA",
    name: "Mobile App",
    description: "iOS and Android app for issue tracking on the go.",
    projectType: "Software",
    lead: "Sarah Chen",
    members: ["Admin User", "Sarah Chen", "Priya Patel"],
    createdAt: daysAgo(20),
  },
  {
    id: "p3",
    key: "CS",
    name: "CRM System",
    description: "Customer records, pipelines, and reporting.",
    projectType: "Business",
    lead: "James Okonkwo",
    members: ["Admin User", "Priya Patel", "James Okonkwo"],
    createdAt: daysAgo(8),
  },
  {
    id: "p4",
    key: "MK",
    name: "Launch Campaign",
    description: "Content, ads, and launch events for the next product release.",
    projectType: "Marketing",
    lead: "Marcus Lee",
    members: ["Marcus Lee", "James Okonkwo"],
    createdAt: daysAgo(5),
  },
];
