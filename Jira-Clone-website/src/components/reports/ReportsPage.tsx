import {
  AlertCircle,
  CheckCircle2,
  Clock,
  ListTodo,
} from "lucide-react";
import BarChart from "./charts/BarChart";
import DonutChart from "./charts/DonutChart";
import HorizontalBarChart from "./charts/HorizontalBarChart";
import SectionCard from "../shared/SectionCard";
import StatCard from "../shared/StatCard";
import { reportIssues, reportProjects } from "./mockData";
import {
  buildCompletionChart,
  buildPriorityChart,
  buildProjectProgress,
  buildStatusChart,
  buildTypeChart,
} from "./reportUtils";

const ReportsPage = () => {
  const openCount = reportIssues.filter((issue) => issue.status !== "Done").length;
  const inProgressCount = reportIssues.filter(
    (issue) => issue.status === "In Progress"
  ).length;
  const doneCount = reportIssues.filter((issue) => issue.status === "Done").length;

  const statusData = buildStatusChart(reportIssues);
  const typeData = buildTypeChart(reportIssues);
  const priorityData = buildPriorityChart(reportIssues);
  const completionData = buildCompletionChart(reportIssues);
  const projectProgress = buildProjectProgress(reportProjects, reportIssues);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="mt-1 text-gray-500">
          Track issue volume, breakdowns, and project progress.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="All Issues"
          value={reportIssues.length}
          icon={ListTodo}
          iconClassName="text-purple-600"
          iconWrapClassName="bg-purple-100"
        />
        <StatCard
          label="Open Issues"
          value={openCount}
          icon={AlertCircle}
          iconClassName="text-blue-600"
          iconWrapClassName="bg-blue-100"
        />
        <StatCard
          label="In Progress"
          value={inProgressCount}
          icon={Clock}
          iconClassName="text-orange-600"
          iconWrapClassName="bg-orange-100"
        />
        <StatCard
          label="Completed"
          value={doneCount}
          icon={CheckCircle2}
          iconClassName="text-green-600"
          iconWrapClassName="bg-green-100"
        />
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard title="Issues by status">
          <BarChart data={statusData} />
        </SectionCard>
        <SectionCard title="Completed vs pending">
          <DonutChart data={completionData} centerLabel="Issues" />
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <SectionCard title="Issues by type">
          <DonutChart data={typeData} centerLabel="Types" />
        </SectionCard>
        <SectionCard title="Issues by priority">
          <HorizontalBarChart data={priorityData} />
        </SectionCard>
      </div>

      <SectionCard title="Project progress">
        {projectProgress.length === 0 ? (
          <p className="text-sm text-gray-400">No projects yet</p>
        ) : (
          <ul className="space-y-4">
            {projectProgress.map((project) => (
              <li key={project.id}>
                <div className="mb-1 flex flex-wrap items-center justify-between gap-2 text-sm">
                  <span className="font-semibold text-gray-900">
                    {project.name}{" "}
                    <span className="font-medium text-gray-500">{project.key}</span>
                  </span>
                  <span className="text-gray-500">
                    {project.completed}/{project.total} done · {project.percent}%
                  </span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${project.percent}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </SectionCard>
    </div>
  );
};

export default ReportsPage;
