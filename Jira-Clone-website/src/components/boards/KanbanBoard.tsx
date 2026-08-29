import { useState } from "react";
import { ISSUE_STATUSES, type Issue, type IssueStatus } from "../issues/types";
import BoardColumn from "./BoardColumn";

interface KanbanBoardProps {
  issues: Issue[];
  onMove: (issueId: string, status: IssueStatus) => void;
}

const KanbanBoard = ({ issues, onMove }: KanbanBoardProps) => {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [overStatus, setOverStatus] = useState<IssueStatus | null>(null);

  const handleDrop = (status: IssueStatus, issueId: string) => {
    onMove(issueId, status);
    setDraggingId(null);
    setOverStatus(null);
  };

  return (
    <div className="flex min-h-[32rem] gap-4 overflow-x-auto pb-4">
      {ISSUE_STATUSES.map((status) => (
        <BoardColumn
          key={status}
          status={status}
          issues={issues.filter((issue) => issue.status === status)}
          draggingId={draggingId}
          isOver={overStatus === status}
          onDragStart={setDraggingId}
          onDragEnd={() => {
            setDraggingId(null);
            setOverStatus(null);
          }}
          onDragOver={setOverStatus}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
