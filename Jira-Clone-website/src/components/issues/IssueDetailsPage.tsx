import { Link, useNavigate, useParams } from "react-router-dom";
import IssueDetails from "./IssueDetails";
import { useIssues } from "../../context/IssuesContext";

const IssueDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getIssue, deleteIssue } = useIssues();
  const issue = id ? getIssue(id) : undefined;

  if (!issue) {
    return (
      <div className="space-y-4">
        <p className="text-gray-500">Issue not found.</p>
        <Link to="/issues" className="font-medium text-blue-600">
          Back to issues
        </Link>
      </div>
    );
  }

  const handleDelete = () => {
    if (window.confirm(`Delete ${issue.key}? This cannot be undone.`)) {
      deleteIssue(issue.id);
      navigate("/issues");
    }
  };

  return (
    <div className="space-y-6">
      <Link to="/issues" className="text-sm font-medium text-blue-600 hover:text-blue-700">
        ← Back to issues
      </Link>
      <IssueDetails issue={issue} onDelete={handleDelete} />
    </div>
  );
};

export default IssueDetailsPage;
