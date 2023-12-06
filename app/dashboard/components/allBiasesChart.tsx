import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
const config = require("/app/config");
const PUB_1 = config.PUB_1;
const PUB_2_SHORT = config.PUB_2_SHORT;

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
      youPub1: props.pub1PersonalBias1,
      crowdPub1: props.pub1CrowdBias1,
      youPub2: props.pub2PersonalBias1,
      crowdPub2: props.pub2CrowdBias1,
      biasType: props.biasType1,
    },
    {
      youPub1: props.pub1PersonalBias2,
      crowdPub1: props.pub1CrowdBias2,
      youPub2: props.pub2PersonalBias2,
      crowdPub2: props.pub2CrowdBias2,
      biasType: props.biasType2,
    },
    {
      youPub1: props.pub1PersonalBias3,
      crowdPub1: props.pub1CrowdBias3,
      youPub2: props.pub2PersonalBias3,
      crowdPub2: props.pub2CrowdBias3,
      biasType: props.biasType3,
    },
    {
      youPub1: props.pub1PersonalBias4,
      crowdPub1: props.pub1CrowdBias4,
      youPub2: props.pub2PersonalBias4,
      crowdPub2: props.pub2CrowdBias4,
      biasType: props.biasType4,
    },
    {
      youPub1: props.pub1PersonalBias5,
      crowdPub1: props.pub1CrowdBias5,
      youPub2: props.pub2PersonalBias5,
      crowdPub2: props.pub2CrowdBias5,
      biasType: props.biasType5,
    },
  ];

  const valueFormatter = (value: number) => `${value}mm`;

  return (
    <BarChart
      dataset={dataset}
      xAxis={[{ scaleType: "band", dataKey: "biasType" }]}
      series={[
        { dataKey: "youPub1", label: `You (${PUB_1})`, valueFormatter },
        { dataKey: "crowdPub1", label: `Crowd (${PUB_2_SHORT})`, valueFormatter },
        { dataKey: "youPub2", label: `You (${PUB_2_SHORT})`, valueFormatter },
        { dataKey: "crowdPub2", label: `Crowd (${PUB_2_SHORT})`, valueFormatter },
      ]}
      {...chartSetting}
    />
  );
}
