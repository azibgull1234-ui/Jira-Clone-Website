import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconClassName: string;
  iconWrapClassName: string;
}

const StatCard = ({
  label,
  value,
  icon: Icon,
  iconClassName,
  iconWrapClassName,
}: StatCardProps) => {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="mt-2 text-4xl font-bold text-gray-900">{value}</p>
        </div>
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-lg ${iconWrapClassName}`}
        >
          <Icon className={iconClassName} size={24} />
        </div>
      </div>
    </article>
  );
};

export default StatCard;
