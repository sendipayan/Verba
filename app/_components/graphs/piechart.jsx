"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const UserEngagementChart = () => {
  const data = {
    labels: ["Courses Completed", "Courses Skipped", "Courses Ongoing"],
    datasets: [
      {
        label: "User Engagement",
        data: [50, 20, 30], // Example engagement stats
        backgroundColor: ["#4bc0c0", "#ff6384", "#ffce56"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "User Engagement" },
    },
  };

  return <Pie data={data} options={options} />;
};

export default UserEngagementChart;
