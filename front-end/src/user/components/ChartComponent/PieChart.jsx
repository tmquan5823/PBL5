import React, { useEffect, useRef, useState } from "react";
import { Chart, registerables } from "chart.js";
import { Table } from "antd";
import Category from "../CategoryComponent/Category";
import "./PieChart.css";
import MoneyFormat from "../../../shared/help/MoneyFormat";

Chart.register(...registerables);

const PieChart = (props) => {
  const [data, setData] = useState([]);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);


  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    const myChartRef = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(myChartRef, {
      type: "doughnut",
      data: props.data && props.data.chartData,
      //  options: {
      //   animation: false, // Tắt animation của biểu đồ
      // },
    });

    setData(props.data.categoryData.map((item, index) => {
      if (item.transactionTimes > 0) {
        return {
          key: index,
          category: <Category
            color={item.iconColor}
            icon={item.iconUrl}
            content={item.content} />,
          transaction_times: item.transactionTimes + ' giao dịch',
          percentage: <span className={`chart-money ${item.amount < 0 && 'chart-money--red'}`}>{MoneyFormat(item.amount) + ' VND'}</span>,
        }
      }
    }))

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

  return props.data && (
    <div className="chart-container">
      <div className="chart-main-container">
        <h2>{props.title}</h2>
        <canvas ref={chartRef} className="doughnut" />
      </div>
      {data && <div className="chart-table-container">
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          rowKey={(record, index) => index}
        />
      </div>}
    </div>
  )
};

export default PieChart;
