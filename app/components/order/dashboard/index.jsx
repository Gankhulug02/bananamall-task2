"use client";
import React, { useContext, useEffect, useState } from "react";
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
import { OrderContext } from "@/app/context/orderContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { orderes } = useContext(OrderContext);
  const [priceValue, setPriceValue] = useState([200, 300, 400]);
  const [labels, setLabels] = useState(["Feb", "Jan", "Jsad"]);
  const [chartData, setChartData] = useState({
    labels: labels,
    datasets: [
      {
        label: "Total $",
        data: priceValue,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgb(53, 162, 235, 0.4)",
      },
    ],
  });

  const data = [{ Jan: 300, Feb: 200 }];

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly total",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  return (
    <div className="w-[70vw] md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default Dashboard;
