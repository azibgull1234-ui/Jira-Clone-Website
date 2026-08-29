import type { ChartDatum } from "./types";
import { sumChartValues } from "./types";

interface BarChartProps {
  data: ChartDatum[];
}

const BarChart = ({ data }: BarChartProps) => {
  const max = Math.max(...data.map((item) => item.value), 1);
  const barWidth = 36;
  const gap = 28;
  const chartHeight = 168;
  const labelSpace = 44;
  const leftPad = 12;
  const width = Math.max(data.length * (barWidth + gap) + leftPad, 280);

  if (sumChartValues(data) === 0) {
    return <p className="py-8 text-center text-sm text-gray-400">No data yet</p>;
  }

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${chartHeight + labelSpace}`}
        className="h-56 w-full min-w-[320px]"
        role="img"
        aria-label="Bar chart"
      >
        {data.map((item, index) => {
          const barHeight = (item.value / max) * (chartHeight - 24);
          const x = index * (barWidth + gap) + leftPad;
          const y = chartHeight - Math.max(barHeight, 3);
          const words = item.label.split(" ");
          return (
            <g key={item.label}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={Math.max(barHeight, 3)}
                rx="6"
                fill={item.color}
              />
              <text
                x={x + barWidth / 2}
                y={y - 8}
                textAnchor="middle"
                fill="#374151"
                fontSize="11"
                fontWeight="600"
              >
                {item.value}
              </text>
              {words.map((word, wordIndex) => (
                <text
                  key={`${item.label}-${word}`}
                  x={x + barWidth / 2}
                  y={chartHeight + 16 + wordIndex * 12}
                  textAnchor="middle"
                  fill="#6b7280"
                  fontSize="10"
                >
                  {word}
                </text>
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default BarChart;
