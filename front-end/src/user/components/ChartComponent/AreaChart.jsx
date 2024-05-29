import React from "react";
import ReactApexChart from "react-apexcharts";
import "./AreaChart.css";

class AreaChart extends React.Component {
  constructor(props) {
    super(props);
    const processedData = props.data.map((point) => ({ x: point.name.toString(), y: point.amount }));

    console.log(processedData)

    this.state = {
      series: [
        {
          name: "Chi tieu",
          data: processedData,
        },
      ],
      options: {
        chart: {
          type: "area",
          height: 350,
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
          colors: ["#00ff00"],
        },
        yaxis: {
          tickAmount: 4,
          floating: false,
          labels: {
            style: {
              colors: "#8e8da4",
            },
            offsetY: -7,
            offsetX: 0,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        fill: {
          opacity: 0.5,
          colors: ["#00ff00"],
        },
        tooltip: {
          x: {
            format: "yyyy",
          },
          fixed: {
            enabled: false,
            position: "topRight",
          },
        },
        grid: {
          yaxis: {
            lines: {
              offsetX: -30,
            },
          },
          padding: {
            left: 20,
          },
        },
        toolbar: {
          show: false,
        },
      },
    };
  }

  render() {
    return (
      <div className="area-chart"
        style={{
          padding: "0 10px"
        }}>
        <h3>{this.props.title}</h3>
        <style>
          {`
            .apexcharts-toolbar {
              display: none !important;
            }
          `}
        </style>
        <div id="chart">
          <ReactApexChart
            options={this.state.options}
            series={this.state.series}
            type="area"
            height={350}
            width={1000}
          />
        </div>
      </div>
    );
  }
}

export default AreaChart;
