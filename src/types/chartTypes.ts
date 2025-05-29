// src/types/chartTypes.ts
export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  // Add other Chart.js dataset properties as needed
}

export interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartSuggestion {
  type: 'bar' | 'pie' | 'line' | 'doughnut' | string; // Allow string for flexibility initially
  title?: string;
  description?: string;
  data: ChartData;
}
