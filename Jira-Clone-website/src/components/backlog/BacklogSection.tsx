import type { ReactNode } from "react";
import type { SprintId } from "../issues/types";

interface BacklogSectionProps {
  title: string;
  count: number;
  dropId: SprintId | "backlog" | "epics";
  isOver: boolean;
  children: ReactNode;
  onDragOver: (dropId: SprintId | "backlog" | "epics") => void;
  onDrop: (dropId: SprintId | "backlog" | "epics", issueId: string) => void;
}

const BacklogSection = ({
  title,
  count,
  dropId,
  isOver,
  children,
  onDragOver,
  onDrop,
}: BacklogSectionProps) => {
  return (
    <section
      onDragOver={(event) => {
        event.preventDefault();
        onDragOver(dropId);
      }}
      onDrop={(event) => {
        event.preventDefault();
        const issueId = event.dataTransfer.getData("text/plain");
        if (issueId) {
          onDrop(dropId, issueId);
        }
      }}
      className={`rounded-xl border p-4 ${
        isOver ? "border-blue-400 bg-blue-50" : "border-gray-100 bg-white"
      }`}
    >
      <header className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-bold tracking-wide text-gray-800 uppercase">{title}</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-500">
          {count}
        </span>
      </header>
      <div className="space-y-2">
        {count === 0 ? (
          <p className="px-1 py-3 text-sm text-gray-400">No issues in this section.</p>
        ) : (
          children
        )}
      </div>
    </section>
  );
};

export default BacklogSection;
