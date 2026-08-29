import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import { useIssues } from "../../context/IssuesContext";
import { useProjects } from "../../context/ProjectsContext";
import type { CreateProjectInput } from "./types";

const ProjectFormPage = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { createProject, updateProject, getProject } = useProjects();
  const { renameIssuesProject } = useIssues();
  const project = projectId ? getProject(projectId) : undefined;
  const [submitError, setSubmitError] = useState<string | null>(null);

  if (projectId && !project) {
    return <p className="text-gray-500">Project not found.</p>;
  }

  const handleSubmit = (input: CreateProjectInput) => {
    setSubmitError(null);
    try {
      if (project) {
        const previousName = project.name;
        const updated = updateProject(project.id, input);
        if (updated && previousName !== updated.name) {
          renameIssuesProject(previousName, updated.name);
        }
        navigate(`/projects/${project.id}`);
        return;
      }

      const created = createProject(input);
      navigate(`/projects/${created.id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Unable to save project");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {project ? `Edit ${project.name}` : "Create project"}
        </h1>
        <p className="mt-1 text-gray-500">
          {project
            ? "Update project details and members."
            : "Start a new software, business, or marketing project."}
        </p>
      </div>

      {submitError ? <p className="text-sm text-red-500">{submitError}</p> : null}

      <ProjectForm
        project={project}
        submitLabel={project ? "Save changes" : "Create project"}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default ProjectFormPage;
