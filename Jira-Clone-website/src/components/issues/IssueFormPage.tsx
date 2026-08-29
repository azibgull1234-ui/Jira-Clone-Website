import { useNavigate, useParams } from "react-router-dom";
import IssueForm from "./IssueForm";
import { useAuth } from "../../context/AuthContext";
import { useIssues } from "../../context/IssuesContext";
import type { CreateIssueInput } from "./types";

const IssueFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { createIssue, updateIssue, getIssue } = useIssues();
  const issue = id ? getIssue(id) : undefined;
  const reporter = currentUser?.fullName || currentUser?.email || "Unknown";

  if (id && !issue) {
    return <p className="text-gray-500">Issue not found.</p>;
  }

  const handleSubmit = (input: CreateIssueInput) => {
    if (issue) {
      updateIssue(issue.id, input);
      navigate(`/issues/${issue.id}`);
      return;
    }

    const created = createIssue(input);
    navigate(`/issues/${created.id}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          {issue ? `Edit ${issue.key}` : "Create issue"}
        </h1>
        <p className="mt-1 text-gray-500">
          {issue ? "Update issue details." : "Add a new work item to a project."}
        </p>
      </div>

      <IssueForm
        issue={issue}
        reporter={reporter}
        submitLabel={issue ? "Save changes" : "Create issue"}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default IssueFormPage;
