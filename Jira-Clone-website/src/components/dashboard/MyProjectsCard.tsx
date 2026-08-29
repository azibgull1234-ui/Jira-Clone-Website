import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectListItem from "./ProjectListItem";
import SectionCard from "../shared/SectionCard";
import type { DashboardProject } from "./mockData";

interface MyProjectsCardProps {
  projects: DashboardProject[];
}

const MyProjectsCard = ({ projects }: MyProjectsCardProps) => {
  return (
    <SectionCard
      title="My Projects"
      titleClassName="mb-6"
      footer={
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all projects
          <ArrowRight size={16} />
        </Link>
      }
    >
      <div className="space-y-4">
        {projects.map((project) => (
          <ProjectListItem
            key={project.id}
            initials={project.initials}
            name={project.name}
            type={project.type}
            color={project.color}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default MyProjectsCard;
