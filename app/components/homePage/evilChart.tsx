import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { deepPurple } from "@mui/material/colors";
import { red } from "@mui/material/colors";
import { blue } from "@mui/material/colors";

const chartSetting = {
  xAxis: [
    {
      label: "Evil (%)",
      color: "#ffffff",
    },
  ],

  height: 300,
  width: 500,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
const dataset = [
  {
    cnn: 59,
    foxNews: 57,
  },
];

const valueFormatter = (value: number) => `${value}mm`;

export default function EvilChart(props: any) {
  return (
    <>
      <Box sx={{ width: "100%", bgcolor: deepPurple[800], borderRadius: "1.75rem", display: "flex" }}>
        <BarChart
          dataset={dataset}
          yAxis={[{ scaleType: "band", dataKey: "month" }]}
          series={[
            { dataKey: "cnn", label: "CNN", valueFormatter, color: blue["A700"] },
            { dataKey: "foxNews", label: "Fox News", valueFormatter, color: red["A400"] },
          ]}
          {...chartSetting}
          layout="horizontal"
        />
      </Box>
    </>
  );
}
