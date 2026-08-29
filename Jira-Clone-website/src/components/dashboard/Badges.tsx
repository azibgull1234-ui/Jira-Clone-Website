const TYPE_STYLES: Record<string, string> = {
  BUG: "bg-red-500",
  FEAT: "bg-green-500",
  TASK: "bg-blue-500",
};

const STATUS_STYLES: Record<string, string> = {
  "TO DO": "bg-gray-100 text-gray-700",
  "IN PROGRESS": "bg-blue-100 text-blue-700",
  DONE: "bg-green-100 text-green-700",
};

export const TypeBadge = ({ type }: { type: string }) => (
  <span
    className={`rounded-md px-2 py-1 text-[10px] font-bold text-white ${
      TYPE_STYLES[type] ?? "bg-slate-500"
    }`}
  >
    {type}
  </span>
);

export const StatusBadge = ({ status }: { status: string }) => (
  <span
    className={`ml-2 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
      STATUS_STYLES[status] ?? "bg-gray-100 text-gray-700"
    }`}
  >
    {status}
  </span>
);
