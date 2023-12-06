import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { deepPurple } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
const config = require("/app/config");
const PUB_1 = config.PUB_1;
const PUB_2_SHORT = config.PUB_2_SHORT;

export default function SingleBiasTypeChart(props: {
  biasType: string;
  pub1CrowdBias: number;
  pub2CrowdBias: number;
  pub1PersonalBias: number;
  pub2PersonalBias: number;
}): JSX.Element {
  const chartSetting = {
    yAxis: [
      {
        label: "Bias (%)",
        min: 0,
        max: 100,
      },
    ],

    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-20px, 0)",
      },
    },
  };

  const dataset = [
    {
      youPub1: props.pub1PersonalBias,
      crowdPub1: props.pub1CrowdBias,
      youPub2: props.pub2PersonalBias,
      crowdPub2: props.pub2CrowdBias,
      biasType: props.biasType,
    },
  ];

  const valueFormatter = (value: number) => `${value}%`;

  const barColors = [deepPurple["A100"], grey[600], deepPurple["A400"], "000000"];

  const legendPlacement = {
    slotProps: {
      legend: {
        position: {
          vertical: "top",
          horizontal: "middle",
        },
        direction: "row",
        itemGap: 10,
        labelStyle: {
          fontSize: ".75rem",
        },
      },
    },
    margin: {
      top: 80,
    },
  } as const;

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "biasType" }]}
      series={[
        { dataKey: "youPub1", label: `You (${PUB_1})`, valueFormatter },
        { dataKey: "crowdPub1", label: `Crowd (${PUB_1})`, valueFormatter },
        { dataKey: "youPub2", label: `You (${PUB_2_SHORT})`, valueFormatter },
        { dataKey: "crowdPub2", label: `Crowd (${PUB_2_SHORT})`, valueFormatter },
      ]}
      {...chartSetting}
      {...legendPlacement}
      colors={barColors}
      sx={{
        "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
          fontSize: ".75rem !important",
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
          fontSize: "1rem !important",
        },
        "& .MuiChartsAxis-bottom .MuiChartsAxis-label text": {
          fontSize: "1rem !important",
        },
        "& .MuiChartsAxis-left .MuiChartsAxis-label text": {
          fontSize: "1rem !important",
        },
      }}
    />
  );
}
