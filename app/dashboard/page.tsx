"use client";
import AppBarLoggedIn from "@/app/components/app-bar/appBarLoggedIn.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Paper from "@mui/material/Paper";
import { grey } from "@mui/material/colors";
import HeadlineCount from "./components/headlineCount";
import GuessAccuracyChart from "./components/guessAccuracyChart";
import PersonalBiasChart from "./components/personalBiasChart";
import AllBiasesChart from "./components/allBiasesChart";
import { Stats, initialStats } from "./interfaces/Stats";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;

export default function Dashboard(): JSX.Element {
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [stats, setStats] = useState<Stats>(initialStats);

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

  let dataset = publicationDataset;

  const router = useRouter();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/dashboard`, { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        if (response.isAuthenticated) {
          setIsLoggedIn(true);
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
          setStats(response);
        } else {
          router.push("/login");
        }
      });
  }, [router, queryName]);

  if (isLoggedIn) {
    return (
      <>
        <AppBarLoggedIn name={stats.user.username}></AppBarLoggedIn>
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
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    mt: 3,
                    ml: 1,
                    mr: 1,
                    p: "2rem",
                    aspectRatio: "1/1",
                    width: "100%",
                    borderRadius: "1.75rem",
                    position: "relative",
                  }}
                >
                  <HeadlineCount
                    total={stats.publicationStats.totalRatingsCount}
                    pub1Total={stats.publicationStats.pub1RatingsCount}
                    pub2Total={stats.publicationStats.pub2RatingsCount}
                  ></HeadlineCount>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    mt: 3,
                    ml: 1,
                    mr: 1,
                    p: "2rem",
                    aspectRatio: "1/1",
                    width: "100%",
                    borderRadius: "1.75rem",
                    justifyContent: "center",
                    justifyItems: "center",
                  }}
                >
                  <GuessAccuracyChart dataset={dataset}></GuessAccuracyChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    mt: 3,
                    ml: 1,
                    mr: 1,
                    p: "2rem",
                    aspectRatio: "1/1",
                    width: "100%",
                    borderRadius: "1.75rem",
                    justifyContent: "center",
                    justifyItems: "center",
                  }}
                >
                  <PersonalBiasChart
                    pub1CrowdBias={stats.pub_1_crowd_total_bias}
                    pub2CrowdBias={stats.pub_2_crowd_total_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.total_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.total_bias}
                  ></PersonalBiasChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12}>
                <Paper
                  elevation={2}
                  sx={{
                    display: "flex",
                    mt: 3,
                    ml: 1,
                    mr: 1,
                    p: "2rem",
                    borderRadius: "1.75rem",
                    justifyContent: "center",
                    justifyItems: "center",
                  }}
                >
                  <AllBiasesChart></AllBiasesChart>
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
      <AppBarLoggedIn name={queryName ? queryName : stats.user.username}></AppBarLoggedIn>
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
