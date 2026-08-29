import { StatusBadge, TypeBadge } from "./Badges";

interface IssueRowProps {
  type: string;
  issueKey: string;
  title: string;
  status: string;
}

const IssueRow = ({ type, issueKey, title, status }: IssueRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-lg px-3 py-3 transition hover:bg-gray-50">
      <div className="flex min-w-0 flex-1 items-center gap-4">
        <TypeBadge type={type} />
        <span className="min-w-fit text-sm font-medium text-gray-600">{issueKey}</span>
        <h3 className="truncate text-sm font-medium text-gray-800">{title}</h3>
      </div>
      <StatusBadge status={status} />
    </div>
  );
};

export default IssueRow;
