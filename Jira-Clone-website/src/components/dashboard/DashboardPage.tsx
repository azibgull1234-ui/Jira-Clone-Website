import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ListTodo,
  type LucideIcon,
} from "lucide-react";
import StatCard from "../shared/StatCard";
import { useAuth } from "../../context/AuthContext";
import { getDisplayFirstName } from "../../utils/userName";
import DashboardGreeting from "./DashboardGreeting";
import MyProjectsCard from "./MyProjectsCard";
import RecentIssuesCard from "./RecentIssuesCard";
import { dashboardStats, myProjects, recentIssues } from "./mockData";

const STAT_ICONS: Record<(typeof dashboardStats)[number]["icon"], LucideIcon> = {
  alert: AlertCircle,
  clock: Clock,
  check: CheckCircle2,
  list: ListTodo,
};

const STAT_STYLES: Record<
  (typeof dashboardStats)[number]["icon"],
  { iconClassName: string; iconWrapClassName: string }
> = {
  alert: { iconClassName: "text-blue-600", iconWrapClassName: "bg-blue-100" },
  clock: { iconClassName: "text-orange-600", iconWrapClassName: "bg-orange-100" },
  check: { iconClassName: "text-green-600", iconWrapClassName: "bg-green-100" },
  list: { iconClassName: "text-purple-600", iconWrapClassName: "bg-purple-100" },
};

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const firstName = currentUser?.fullName
    ? currentUser.fullName.split(" ")[0]
    : getDisplayFirstName(currentUser?.email ?? null);

  return (
    <div className="space-y-6">
      <DashboardGreeting firstName={firstName} />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard
            key={stat.id}
            label={stat.label}
            value={stat.value}
            icon={STAT_ICONS[stat.icon]}
            iconClassName={STAT_STYLES[stat.icon].iconClassName}
            iconWrapClassName={STAT_STYLES[stat.icon].iconWrapClassName}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RecentIssuesCard issues={recentIssues} />
        <MyProjectsCard projects={myProjects} />
      </div>
    </div>
  );
};

export default DashboardPage;
