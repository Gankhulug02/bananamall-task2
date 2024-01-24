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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faClock } from "@fortawesome/free-solid-svg-icons";

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
  const [amounts, setAmounts] = useState();
  const [dates, setDates] = useState();
  const [transactions, setTransactions] = useState(orders);
  const [barColor, setBarColor] = useState("rgb(69 151 99)");

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
    setDates(uniqueDates.reverse());
    setAmounts(correspondingAmounts.reverse());
  }, [transactions]);

  useEffect(() => {
    setTransactions(orders);
  }, [orders]);

  const [chartOptions, setChartOptions] = useState({
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Dashboard",
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  const filterByPaid = () => {
    const paidOrders = orders.filter((order) => order.status === "paid");
    setBarColor("rgb(34 197 94)");
    setTransactions(paidOrders);
  };
  const filterByPending = () => {
    const pendingOrders = orders.filter((order) => order.status === "pending");
    setTransactions(pendingOrders);
    setBarColor("#696969");
  };

  return (
    <div className="flex flex-col w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
      <div className="flex gap-4">
        <button
          className="flex gap-2 items-center  p-2 rounded-xl bg-green-500 text-white w-fit"
          onClick={filterByPaid}
        >
          <p>Paid</p>
          <div className="flex items-center w-3">
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </button>
        <button
          className="flex gap-2 items-center p-2 rounded-xl bg-[#e7e7e7] text-[#696969] w-fit"
          onClick={filterByPending}
        >
          <p>Pending</p>
          <div className="flex items-center w-3">
            <FontAwesomeIcon icon={faClock} />
          </div>
        </button>
        <button
          className="flex gap-2 items-center p-2 rounded-xl bg-[#e7e7e7] text-[#696969] w-fit"
          onClick={() => {
            setBarColor("rgb(69 151 99)");
            setTransactions(orders);
          }}
        >
          <p>All</p>
        </button>
      </div>
      <Bar
        data={{
          labels: dates,
          datasets: [
            {
              label: "Total $",
              data: amounts,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: barColor,
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  );
};

export default Dashboard;
