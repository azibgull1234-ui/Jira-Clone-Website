import type { Issue, IssueStatus } from "../issues/types";
import BoardCard from "./BoardCard";

interface BoardColumnProps {
  status: IssueStatus;
  issues: Issue[];
  draggingId: string | null;
  isOver: boolean;
  onDragStart: (issueId: string) => void;
  onDragEnd: () => void;
  onDragOver: (status: IssueStatus) => void;
  onDrop: (status: IssueStatus, issueId: string) => void;
}

const BoardColumn = ({
  status,
  issues,
  draggingId,
  isOver,
  onDragStart,
  onDragEnd,
  onDragOver,
  onDrop,
}: BoardColumnProps) => {
  return (
    <section
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver(status);
      }}
      onDrop={(event) => {
        event.preventDefault();
        const issueId = event.dataTransfer.getData("text/plain");
        if (issueId) {
          onDrop(status, issueId);
        }
      }}
      className={`flex h-full min-h-[28rem] w-72 shrink-0 flex-col rounded-xl border p-3 ${
        isOver ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50"
      }`}
    >
      <header className="mb-3 flex items-center justify-between px-1">
        <h2 className="text-sm font-bold tracking-wide text-gray-700 uppercase">
          {status}
        </h2>
        <span className="rounded-full bg-white px-2 py-0.5 text-xs font-semibold text-gray-500">
          {issues.length}
        </span>
      </header>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {issues.length === 0 ? (
          <p className="px-1 text-xs text-gray-400">No issues</p>
        ) : (
          issues.map((issue) => (
            <BoardCard
              key={issue.id}
              issue={issue}
              isDragging={draggingId === issue.id}
              onDragStart={onDragStart}
              onDragEnd={onDragEnd}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default BoardColumn;
