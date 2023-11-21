import Box from "@mui/material/Box";
import { BarChart } from "@mui/x-charts/BarChart";
import { Typography } from "@mui/material";
import { black_ops_one } from "@/app/fonts";
import { blueGrey } from "@mui/material/colors";
import { createTheme, useTheme, ThemeProvider } from "@mui/material/styles";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1: string = config.PUB_1;
const PUB_2_SHORT: string = config.PUB_2_SHORT;

const chartSetting = {
  xAxis: [
    {
      label: "Evil (%)",
      min: 0,
      max: 100,
    },
  ],

  height: 300,
  width: 500,
};
const dataset = [
  {
    publication: 59,
    publicationName: PUB_1,
  },
  {
    publication: 80,
    publicationName: PUB_2_SHORT,
  },
];
const barColors = [blueGrey[800]];

const valueFormatter = (value: number) => `${value}%`;

export default function EvilChart(props: any) {
  const theme = useTheme();
  const newTheme = createTheme({ palette: { mode: "dark" } });

  return (
    <ThemeProvider theme={newTheme}>
      <Box
        sx={{
          width: "100%",
          bgcolor: "#000000",
          borderRadius: "1.75rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          justifyItems: "center",
          p: "0 1rem 4rem",
        }}
      >
        <Typography
          component="div"
          variant={"h2"}
          sx={{
            fontFamily: black_ops_one.style.fontFamily,
            fontSize: { xs: "2rem", md: "3rem", xl: "4rem" },
            lineHeight: "1",
            fontWeight: "500",

            color: "#ffffff",
          }}
        >
          <Box sx={{ textAlign: "center", padding: "4rem 0 3rem 0" }}>Evil Meter</Box>
        </Typography>
        <Box sx={{ display: "flex" }}>
          <BarChart
            dataset={dataset}
            yAxis={[
              {
                scaleType: "band",
                dataKey: "publicationName",
              },
            ]}
            series={[{ dataKey: "publication", valueFormatter }]}
            {...chartSetting}
            colors={barColors}
            layout="horizontal"
            margin={{ top: 3 }}
            sx={{
              //change left yAxis label styles
              "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
                fontSize: "1rem !important",
                transform: { xs: "rotate(0.75turn) translateX(-10px) translateY(-80px)", sm: "rotate(0turn) translateX(0px) translateY(0px)" },
              },
              // change bottom label styles
              //change left yAxis label styles
              "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
                fontSize: ".75rem !important",
              },
              "& .MuiChartsAxis-bottom .MuiChartsAxis-label text": {
                fontSize: "1rem !important",
              },
            }}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
