import { BarChart } from "@mui/x-charts/BarChart";
import { deepPurple } from "@mui/material/colors";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1: string = config.PUB_1;
const PUB_2_SHORT: string = config.PUB_2_SHORT;

export default function PersonalBiasChart(props: {
  pub1CrowdBias: number;
  pub2CrowdBias: number;
  pub1PersonalBias: number;
  pub2PersonalBias: number;
}): JSX.Element {
  const chartSetting = {
    xAxis: [
      {
        label: "Total Bias %",
        min: 0,
        max: 100,
      },
    ],

    margin: {
      left: 70,
    },
  };

  const dataset = [
    {
      user: props.pub1PersonalBias,
      crowd: props.pub1CrowdBias,
      publicationName: PUB_1,
    },
    {
      user: props.pub2PersonalBias,
      crowd: props.pub2CrowdBias,
      publicationName: PUB_2_SHORT,
    },
  ];

  const valueFormatter = (value: number) => `${value}%`;

  const barColors = [deepPurple["A100"], "#212121"];

  return (
    <BarChart
      dataset={dataset}
      yAxis={[{ scaleType: "band", dataKey: "publicationName" }]}
      series={[
        { dataKey: "user", label: "You", valueFormatter },
        { dataKey: "crowd", label: "Crowd", valueFormatter },
      ]}
      {...chartSetting}
      colors={barColors}
      layout="horizontal"
      sx={{
        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
          fontSize: "1rem !important",
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
          fontSize: ".75rem !important",
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-label text": {
          fontSize: "1rem !important",
        },
        "& .MuiChartsAxis-left .MuiChartsAxis-label text": {
          fontSize: ".75rem !important",
        },
      }}
    />
  );
}
