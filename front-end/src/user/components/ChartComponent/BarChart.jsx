import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
  },
];

const MyBarChart = props => {
  return (
    <div style={{
      padding: "0 10px"
    }}>
      <h3>{props.title}</h3>
      <BarChart width={1000} height={350} data={props.data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
        />
        <YAxis
          tick={{ fontSize: 10 }} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Chi tiêu" fill="red" />
        <Bar dataKey="Thu nhập" fill="#2CB64B" />
      </BarChart>
    </div>

  );
};

export default MyBarChart;
