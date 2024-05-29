import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import { Table } from "antd";
import Category from "../CategoryComponent/Category";
import Icon from "@ant-design/icons/lib/components/Icon";
import "./PieChart.css";
import MoneyFormat from "../../../shared/help/MoneyFormat";

const PieChart = (props) => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // useEffect(() => {
  //   if (props.data) {
  //     const total = props.data.reduce((accumulator, currentValue) => {
  //       return accumulator + currentValue.transaction_times;
  //     }, 0);
  //     setData({
  //       labels: props.data.map(item => item.category.content),
  //       datasets: [{
  //         data: props.data.map(item => item.transaction_times / total * 100),
  //         backgroundColor: props.data.map(item => item.category.iconColor)
  //       }]
  //     });
  //   }
  // }, props.data);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: props.data && props.data.chartData,
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [props.data]);

  const columns = [
    {
      title: "Danh mục",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Số lần giao dịch",
      dataIndex: "transaction_times",
      key: "transaction_times",
    },
    {
      title: "Số tiền",
      dataIndex: "percentage",
      key: "percentage",
    },
  ];

  useEffect(() => {
    setData(props.data.categoryData.map(item => {
      return {
        category: <Category
          key={item.id}
          id={item.id}
          color={item.iconColor}
          icon={item.iconUrl}
          content={item.content} />,
        transaction_times: item.transactionTimes + ' giao dịch',
        percentage: <span className={`chart-money ${item.amount < 0 && 'chart-money--red'}`}>{MoneyFormat(item.amount) + ' VND'}</span>,
      }
    }))
  }, [props.data]);

  return props.data && (
    <div className="chart-container">
      <h2>{props.title}</h2>
      <canvas ref={chartRef} className="doughnut" />
      {data && <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        rowKey="category"
      />}
    </div>
  )
};

export default PieChart;
