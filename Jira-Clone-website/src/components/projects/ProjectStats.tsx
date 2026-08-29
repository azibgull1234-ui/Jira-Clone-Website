interface ProjectStatsProps {
  issueCount: number;
  completedCount: number;
  openCount: number;
}

const ProjectStats = ({
  issueCount,
  completedCount,
  openCount,
}: ProjectStatsProps) => {
  const progress = issueCount === 0 ? 0 : Math.round((completedCount / issueCount) * 100);

  const cards = [
    { label: "Issue count", value: issueCount },
    { label: "Completed issues", value: completedCount },
    { label: "Open issues", value: openCount },
  ];

  return (
    <section className="rounded-xl border border-gray-100 bg-white p-6">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">Project statistics</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="rounded-lg bg-gray-50 p-4">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700">Project progress</span>
          <span className="text-gray-500">{progress}%</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectStats;
