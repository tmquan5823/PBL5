import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import { Table } from "antd";
import Category from "../CategoryComponent/Category";
import Icon from "@ant-design/icons/lib/components/Icon";
import "./PieChart.css";

const PieChart = (props) => {
  const [data, setData] = useState({});
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (props.data) {
      const total = props.data.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.transaction_times;
      }, 0);
      setData({
        labels: props.data.map(item => item.category.content),
        datasets: [{
          data: props.data.map(item => item.transaction_times / total * 100),
          backgroundColor: props.data.map(item => item.category.iconColor)
        }]
      });
    }
  }, props.data);

  const categoryData = [
    {
      id: 30,
      label: "Nhà cửa",
      iconUrl:
        "https://res.cloudinary.com/dwzhz9qkm/image/upload/v1642157004/house_mgwfge.png",
      iconColor: "#8B4513",
      amount: -2000000,
      transactionTimes: 1,
    },
    {
      id: 31,
      label: "Mua sắm",
      iconUrl:
        "https://res.cloudinary.com/dwzhz9qkm/image/upload/v1642157004/shopping_bag_a2afjc.png",
      iconColor: "#FF69B4",
      amount: -200000,
      transactionTimes: 1,
    },
    {
      id: 32,
      label: "Đồ ăn & Đồ uống",
      iconUrl:
        "https://res.cloudinary.com/dwzhz9qkm/image/upload/v1642157004/food_beverage_zdp3bz.png",
      iconColor: "#FFA500",
      amount: -30000,
      transactionTimes: 1,
    },
  ];

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: data && data,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  const columns = [
    {
      title: "",
      dataIndex: "iconUrl",
      key: "iconUrl",
      render: (text, record) => (
        <img
          src={record.iconUrl}
          alt={record.label}
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      title: "",
      dataIndex: "label",
      key: "label",
    },
    {
      title: "",
      dataIndex: "transactionTimes",
      key: "transactionTimes",
      render: (text) => `${text} giao dịch`,
    },
    {
      title: "",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <span style={{ color: amount < 0 ? "red" : "green" }}>
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(amount)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <h1>Pie Chart with Table</h1>
      <canvas ref={chartRef} className="doughnut" />
      <ul className="categories-list">
        {props.data && props.data.map(item => <li className="category-item">
          <Category
            icon={item.category.iconUrl}
            color={item.category.iconColor}
            content={item.category.content}
          />
          <span>{item.transaction_times}</span>
        </li>)}
      </ul>
    </div>
  );
};

export default PieChart;
