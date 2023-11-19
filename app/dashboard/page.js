"use client";
import AppBarLoggedIn from "/app/components/app-bar/appBarLoggedIn.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UserFeedback from "../game/classes/UserFeedback";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { grey } from "@mui/material/colors";
import { deepPurple } from "@mui/material/colors";
import HeadlineCount from "./components/HeadlineCount";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;

export default function Dashboard() {
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");
  const [totalRatings, setTotalRatings] = useState("");
  const [pub1Total, setPub1Total] = useState("");
  const [pub2Total, setPub2Total] = useState("");

  const [publicationDataset, setPublicationDataset] = useState([
    {
      you: 0,
      crowd: 0,
      publication: PUB_1,
    },
    {
      you: 0,
      crowd: 0,
      publication: PUB_2,
    },
  ]);

  const chartSetting = {
    yAxis: [
      {
        label: "Guess Accuracy (Overall)",
      },
    ],
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "rotate(-90deg) translate(0px, -20px)",
      },
    },
    margin: {
      left: 70,
    },
  };
  let dataset = publicationDataset;

  const valueFormatter = (value) => `${value}%`;

  const barColors = [deepPurple["A100"], "#212121"];

  const router = useRouter();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/dashboard`, { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.isAuthenticated) {
          setIsLoggedIn(true);
          setUsername(response.user.username);
          setTotalRatings(response.publicationStats.totalRatingsCount);
          setPub1Total(response.publicationStats.pub1RatingsCount);
          setPub2Total(response.publicationStats.pub2RatingsCount);
          setPublicationDataset([
            {
              you: response.publicationStats.userPub1Percent,
              crowd: response.publicationStats.crowdPub1Percent,
              publication: PUB_1,
            },
            {
              you: response.publicationStats.userPub2Percent,
              crowd: response.publicationStats.crowdPub2Percent,
              publication: PUB_2,
            },
          ]);
        } else {
          router.push("/login");
        }
      });
  }, [router, queryName]);

  if (isLoggedIn) {
    return (
      <>
        <AppBarLoggedIn name={userName}></AppBarLoggedIn>
        <Box
          component="main"
          sx={{
            bgcolor: grey[100],
            display: "flex",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Container maxWidth="lg">
            <Grid container spacing={2}>
              <Grid container justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  direction="column"
                  justifyContent="center"
                  sx={{
                    display: "flex",
                    mt: 3,
                    ml: 1,
                    mr: 1,
                    p: 2,
                    pt: 5,
                    height: 380,
                    width: 250,
                  }}
                >
                  <HeadlineCount total={totalRatings} pub1Total={pub1Total} pub2Total={pub2Total}></HeadlineCount>
                </Paper>
              </Grid>
              <Grid container justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    mt: 3,
                    ml: 1,
                    mr: 1,
                    pb: 5,
                    height: 380,
                    width: 360,
                  }}
                >
                  <BarChart
                    dataset={dataset}
                    xAxis={[{ scaleType: "band", dataKey: "publication" }]}
                    series={[
                      { dataKey: "you", label: "You", valueFormatter },
                      { dataKey: "crowd", label: "Crowd", valueFormatter },
                    ]}
                    {...chartSetting}
                    colors={barColors}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <AppBarLoggedIn name={queryName ? queryName : userName}></AppBarLoggedIn>
      <Box
        component="main"
        sx={{
          backgroundColor: grey[100],
          display: "flex",
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Container sx={{ mt: 15 }} maxWidth="lg">
          <Box justifyContent="center" sx={{ display: "flex" }}>
            <CircularProgress color="secondary" />
          </Box>
          <p className="text-center mt-5">Loading...</p>
        </Container>
      </Box>
    </>
  );
}
