export interface ChartDatum {
  label: string;
  value: number;
  color: string;
}

export const sumChartValues = (data: ChartDatum[]) =>
  data.reduce((total, item) => total + item.value, 0);
