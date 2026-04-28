import { ChartOptions } from "chart.js";

const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

export const lineData = {
  labels: months,
  datasets: [{
    data: [42,51,48,60,72,68,75,80,77,90,88,94],
    borderColor: "#378ADD",
    backgroundColor: "transparent",
    tension: 0.4,
  }],
};

export const barData = {
  labels: months,
  datasets: [{
    data: [120,200,180,250,310,280,340,390,360,420,410,480],
    backgroundColor: "#1D9E7588",
    borderRadius: 4,
  }],
};

export const lineChartOptions: ChartOptions<"line"> = {
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 11 } } },
    y: { ticks: { font: { size: 11 } } },
  },
};

export const barChartOptions: ChartOptions<"bar"> = {
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 11 } } },
    y: { ticks: { font: { size: 11 } } },
  },
};

export const defaultChartOptions: ChartOptions = {
  plugins: { legend: { display: false } },
  scales: {
    x: { ticks: { font: { size: 11 } } },
    y: { ticks: { font: { size: 11 } } },
  },
};