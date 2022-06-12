export type ChartData = {
  value: number;
  time: string;
  category: string;
}

export enum ChartType {
  SINGLE_CHART=0,
  MUTIL_CHART=1,
}