import { BarChart } from "@mui/x-charts/BarChart";
import { deepPurple } from "@mui/material/colors";

interface GuessAccuracyChartProps {
  dataset: Record<string, number | string | Date>[];
}

export default function GuessAccuracyChart(props: GuessAccuracyChartProps) {
  const chartSetting = {
    yAxis: [
      {
        label: "Guess Accuracy % (Overall)",
        min: 0,
        max: 100,
      },
    ],

    margin: {
      left: 70,
    },
  };

  const valueFormatter = (value: number) => `${value}%`;

  const barColors = [deepPurple["A100"], "#212121"];

  return (
    <BarChart
      dataset={props.dataset}
      xAxis={[{ scaleType: "band", dataKey: "publication" }]}
      series={[
        { dataKey: "you", label: "You", valueFormatter },
        { dataKey: "crowd", label: "Crowd", valueFormatter },
      ]}
      {...chartSetting}
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
