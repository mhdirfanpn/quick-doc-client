import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const LineGraph = ({ revenue }) => {
  const [data, setData] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      title: {
        text: "Revenue per Month",
        align: "left",
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
        ],
      },
      yaxis: {
        min: 0,
        max: 10000,
      },
    },
  });

  useEffect(() => {
    const apexChartData = Array(12).fill(0); // Initialize the array with 12 elements, all set to 0
    const categories = [];

    revenue.forEach((item) => {
      if (item.month !== null && item.month >= 1 && item.month <= 12) {
        apexChartData[item.month - 1] = item.revenue;
      }
    });

    // Get the corresponding month names for the x-axis categories
    const fullMonthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    categories.push(...fullMonthNames.slice(0, apexChartData.length));

    setData((prevState) => ({
      ...prevState,
      series: [
        {
          name: "Revenue",
          data: apexChartData,
        },
      ],
      options: {
        ...prevState.options,
        xaxis: {
          ...prevState.options.xaxis,
          categories: categories,
        },
      },
    }));
  }, [revenue]);

  return (
    <Chart
      options={data.options}
      series={data.series}
      type="line"
      width={1080}
      height={600}
    />
  );
};

export default LineGraph;
