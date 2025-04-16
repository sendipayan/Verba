"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SpeechAnalysisChart = () => {
  
  const data = {
    labels: ["Clarity", "Pauses", "Filler Words", "Volume", "Speed"],
    datasets: [
      {
        label: "Performance Score",
        data: [85, 60, 40, 75, 90], // Example scores
        backgroundColor: ["#ff6384", "#36a2eb", "#ffce56", "#4bc0c0", "#9966ff"],
        borderRadius: 20,
        
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "Speech Analysis" },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
        },
      },
    },
    barThickness: 60,   
  };

  return <Bar data={data} options={options} />;
};

export default SpeechAnalysisChart;
