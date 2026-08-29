import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import IssueRow from "./IssueRow";
import SectionCard from "../shared/SectionCard";
import type { DashboardIssue } from "./mockData";

interface RecentIssuesCardProps {
  issues: DashboardIssue[];
}

const RecentIssuesCard = ({ issues }: RecentIssuesCardProps) => {
  return (
    <SectionCard
      title="My Recent Issues"
      footer={
        <Link
          to="/issues"
          className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all issues
          <ArrowRight size={16} />
        </Link>
      }
    >
      <div className="space-y-4">
        {issues.map((issue) => (
          <IssueRow
            key={issue.id}
            type={issue.type}
            issueKey={issue.key}
            title={issue.title}
            status={issue.status}
          />
        ))}
      </div>
    </SectionCard>
  );
};

export default RecentIssuesCard;
