import { Link, useNavigate, useParams } from "react-router-dom";
import ProjectDetails from "./ProjectDetails";
import { useIssues } from "../../context/IssuesContext";
import { useProjects } from "../../context/ProjectsContext";

const ProjectDetailsPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { getProject, deleteProject } = useProjects();
  const { issues, deleteIssuesByProject } = useIssues();
  const project = projectId ? getProject(projectId) : undefined;

  if (!project) {
    return (
      <div className="space-y-4">
        <p className="text-gray-500">Project not found.</p>
        <Link to="/projects" className="font-medium text-blue-600">
          Back to projects
        </Link>
      </div>
    );
  }

  const projectIssues = issues.filter((issue) => issue.project === project.name);

  const handleDelete = () => {
    if (
      window.confirm(
        `Delete ${project.name}? Issues in this project will also be removed.`
      )
    ) {
      deleteIssuesByProject(project.name);
      deleteProject(project.id);
      navigate("/projects");
    }
  };

  return (
    <div className="space-y-6">
      <Link
        to="/projects"
        className="text-sm font-medium text-blue-600 hover:text-blue-700"
      >
        ← Back to projects
      </Link>
      <ProjectDetails
        project={project}
        issues={projectIssues}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ProjectDetailsPage;
