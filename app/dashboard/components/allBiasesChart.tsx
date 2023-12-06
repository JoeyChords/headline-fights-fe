import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";

export default function AllBiasesChart(props: {
  biasType1: string;
  pub1CrowdBias1: number;
  pub2CrowdBias1: number;
  pub1PersonalBias1: number;
  pub2PersonalBias1: number;
  biasType2: string;
  pub1CrowdBias2: number;
  pub2CrowdBias2: number;
  pub1PersonalBias2: number;
  pub2PersonalBias2: number;
  biasType3: string;
  pub1CrowdBias3: number;
  pub2CrowdBias3: number;
  pub1PersonalBias3: number;
  pub2PersonalBias3: number;
  biasType4: string;
  pub1CrowdBias4: number;
  pub2CrowdBias4: number;
  pub1PersonalBias4: number;
  pub2PersonalBias4: number;
  biasType5: string;
  pub1CrowdBias5: number;
  pub2CrowdBias5: number;
  pub1PersonalBias5: number;
  pub2PersonalBias5: number;
}): JSX.Element {
  const chartSetting = {
    yAxis: [
      {
        label: "rainfall (mm)",
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
      london: 59,
      paris: 57,
      newYork: 86,
      seoul: 21,
      month: "Jan",
    },
    {
      london: 50,
      paris: 52,
      newYork: 78,
      seoul: 28,
      month: "Fev",
    },
    {
      london: 47,
      paris: 53,
      newYork: 106,
      seoul: 41,
      month: "Mar",
    },
    {
      london: 54,
      paris: 56,
      newYork: 92,
      seoul: 73,
      month: "Apr",
    },
    {
      london: 57,
      paris: 69,
      newYork: 92,
      seoul: 99,
      month: "May",
    },
  ];

  const valueFormatter = (value: number) => `${value}mm`;

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "month" }]}
      series={[
        { dataKey: "london", label: "London", valueFormatter },
        { dataKey: "paris", label: "Paris", valueFormatter },
        { dataKey: "newYork", label: "New York", valueFormatter },
        { dataKey: "seoul", label: "Seoul", valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
