import type { ChartDatum } from "./types";
import { sumChartValues } from "./types";

interface HorizontalBarChartProps {
  data: ChartDatum[];
}

const HorizontalBarChart = ({ data }: HorizontalBarChartProps) => {
  const max = Math.max(...data.map((item) => item.value), 1);
  const total = sumChartValues(data);

  if (total === 0) {
    return <p className="text-sm text-gray-400">No data yet</p>;
  }

  return (
    <ul className="space-y-3">
      {data.map((item) => {
        const percent = Math.round((item.value / max) * 100);
        return (
          <li key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700">{item.label}</span>
              <span className="text-gray-500">{item.value}</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
              <div
                className="h-full rounded-full"
                style={{ width: `${percent}%`, backgroundColor: item.color }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default HorizontalBarChart;
