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
  const { orders } = useContext(OrderContext);
  const [amounts, setAmounts] = useState([200, 300, 400]);
  const [dates, setDates] = useState(["1/24/2024", "2/24/2023", "2/26/2023"]);

  const transactions = orders;

  useEffect(() => {
    // Create an object to store amounts based on date
    const amountsByDate = {};

    // Iterate through transactions
    transactions.forEach((transaction) => {
      const transactionDate = new Date(transaction.date).toLocaleDateString();

      // If the date is already in amountsByDate, update the amount
      if (amountsByDate[transactionDate]) {
        amountsByDate[transactionDate] += transaction.amount;
      } else {
        // If the date is not in amountsByDate, set the amount
        amountsByDate[transactionDate] = transaction.amount;
      }
    });

    // Extract dates and amounts from amountsByDate object
    const uniqueDates = Object.keys(amountsByDate);
    const correspondingAmounts = uniqueDates.map((date) => amountsByDate[date]);

    // Update state with the extracted dates and amounts
    setDates(uniqueDates);
    setAmounts(correspondingAmounts);
  }, [transactions]);

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
      <Bar
        data={{
          labels: dates,
          datasets: [
            {
              label: "Total $",
              data: amounts,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgb(53, 162, 235, 0.4)",
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default Dashboard;
