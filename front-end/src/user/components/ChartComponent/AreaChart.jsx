import React, { Component } from "react";
import Chart from "chart.js/auto";

class AreaChart extends Component {
  chart = null; // Thêm thuộc tính để lưu trữ biểu đồ

  async fetchData() {
    let data = await fetch("https://disease.sh/v3/covid-19/historical/vn?lastdays=all");
    let jsondata = await data.json();
    let cases = jsondata.timeline.cases;
    let time = Object.keys(cases);
    let value = time.map(date => cases[date]);
    return { time, value };
  }

  componentDidMount() {
    this.fetchData().then(({ time, value }) => {
      this.createChart(time, value);
    });
  }

  componentDidUpdate() {
    this.fetchData().then(({ time, value }) => {
      this.createChart(time, value);
    });
  }

  createChart(labels, data) {
    const canvas = document.getElementById('canvas');

    // Hủy biểu đồ nếu đã tồn tại
    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Thu nhập',
            backgroundColor: "blue",
            borderColor: 'blue',
            data: data,
            tension: 0.4
          }
        ]
      }
    });
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  render() {
    return (
      <div className="container">
        <h3></h3>
        <canvas id="canvas"></canvas>
      </div>
    );
  }
}

export default AreaChart;
