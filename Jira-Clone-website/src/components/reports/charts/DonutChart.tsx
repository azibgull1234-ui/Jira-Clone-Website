import type { ChartDatum } from "./types";
import { sumChartValues } from "./types";

interface DonutChartProps {
  data: ChartDatum[];
  centerLabel?: string;
}

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const DonutChart = ({ data, centerLabel }: DonutChartProps) => {
  const total = sumChartValues(data);
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
      <svg viewBox="0 0 140 140" className="h-40 w-40 shrink-0" role="img" aria-label="Donut chart">
        <circle
          cx="70"
          cy="70"
          r={RADIUS}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="16"
        />
        {total > 0
          ? data.map((item) => {
              if (item.value <= 0) return null;
              const length = (item.value / total) * CIRCUMFERENCE;
              const circle = (
                <circle
                  key={item.label}
                  cx="70"
                  cy="70"
                  r={RADIUS}
                  fill="none"
                  stroke={item.color}
                  strokeWidth="16"
                  strokeDasharray={`${length} ${CIRCUMFERENCE}`}
                  strokeDashoffset={-offset}
                  transform="rotate(-90 70 70)"
                />
              );
              offset += length;
              return circle;
            })
          : null}
        <text
          x="70"
          y="66"
          textAnchor="middle"
          fill="#111827"
          fontSize="20"
          fontWeight="700"
        >
          {total}
        </text>
        <text
          x="70"
          y="84"
          textAnchor="middle"
          fill="#6b7280"
          fontSize="10"
        >
          {centerLabel ?? "Total"}
        </text>
      </svg>
      <ul className="w-full space-y-2">
        {data.map((item) => (
          <li key={item.label} className="flex items-center justify-between gap-3 text-sm">
            <span className="flex items-center gap-2 text-gray-700">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              {item.label}
            </span>
            <span className="font-medium text-gray-900">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DonutChart;
