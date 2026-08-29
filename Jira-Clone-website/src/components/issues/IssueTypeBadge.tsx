import type { IssueType } from "./types";

const TYPE_STYLES: Record<IssueType, string> = {
  Bug: "bg-red-500",
  Task: "bg-blue-500",
  Story: "bg-green-500",
  Feature: "bg-teal-500",
  Epic: "bg-purple-500",
};

const IssueTypeBadge = ({ type }: { type: IssueType }) => (
  <span
    className={`rounded-md px-2 py-1 text-[10px] font-bold text-white ${TYPE_STYLES[type]}`}
  >
    {type}
  </span>
);

export default IssueTypeBadge;
