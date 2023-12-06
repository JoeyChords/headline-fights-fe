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
import SingleBiasTypeChart from "./components/singleBiasTypeChart";
import { Stats, initialStats } from "./interfaces/Stats";
import { Typography } from "@mui/material";
import { Divider } from "@mui/material";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;
const PUB_2_SHORT = config.PUB_2_SHORT;

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
        <style>{"body { background-color: #f5f5f5; }"}</style>
        <AppBarLoggedIn name={stats.user.username}></AppBarLoggedIn>
        <Box component="main">
          <Container maxWidth="lg" sx={{ pb: "2rem" }}>
            <Box
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                m: "4rem 0 4rem 0",
              }}
            >
              <Typography variant="h3">Totals</Typography>
            </Box>
            <Grid container spacing={3} sx={{ mt: "1rem" }}>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
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
                    p: "2rem",
                    aspectRatio: "1/1",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <GuessAccuracyChart dataset={dataset}></GuessAccuracyChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={12} md={12} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: { xs: "1/1", sm: "2/1", md: "3/1", lg: "1/1" },
                    width: "100%",

                    borderRadius: "1.75rem",
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
            </Grid>

            <Box
              sx={{
                textAlign: "center",
                fontWeight: "bold",
                m: "4rem 0 4rem 0",
              }}
            >
              <Typography variant="h3">Bias Types</Typography>
            </Box>

            <Grid container spacing={3} sx={{ mt: "1rem" }}>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Sensationalism"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.sensationalism}
                    pub2CrowdBias={stats.pub_2_crowd_bias.sensationalism}
                    pub1PersonalBias={stats.pub_1_personal_bias.sensationalism}
                    pub2PersonalBias={stats.pub_2_personal_bias.sensationalism}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Undue Weight Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.undue_weight_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.undue_weight_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.undue_weight_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.undue_weight_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Speculative Content"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.speculative_content}
                    pub2CrowdBias={stats.pub_2_crowd_bias.speculative_content}
                    pub1PersonalBias={stats.pub_1_personal_bias.speculative_content}
                    pub2PersonalBias={stats.pub_2_personal_bias.speculative_content}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Tonality Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.tonality_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.tonality_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.tonality_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.tonality_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Concision Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.concision_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.concision_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.concision_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.concision_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Coverage Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.coverage_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.coverage_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.coverage_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.coverage_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Distortion Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.distortion_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.distortion_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.distortion_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.distortion_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Partisan Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.partisan_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.partisan_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.partisan_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.partisan_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Favors Or Attacks"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.favors_or_attacks}
                    pub2CrowdBias={stats.pub_2_crowd_bias.favors_or_attacks}
                    pub1PersonalBias={stats.pub_1_personal_bias.favors_or_attacks}
                    pub2PersonalBias={stats.pub_2_personal_bias.favors_or_attacks}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Content Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.content_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.content_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.content_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.content_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Structural Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.structural_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.structural_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.structural_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.structural_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Gatekeeping Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.gatekeeping_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.gatekeeping_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.gatekeeping_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.gatekeeping_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Decision Making Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.decision_making_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.decision_making_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.decision_making_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.decision_making_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"Mainstream Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.mainstream_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.mainstream_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.mainstream_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.mainstream_bias}
                  ></SingleBiasTypeChart>
                </Paper>
              </Grid>
              <Grid justifyContent="center" xs={12} sm={6} md={6} lg={4}>
                <Paper
                  elevation={2}
                  sx={{
                    p: "2rem",
                    aspectRatio: "1/1.25",
                    width: "100%",
                    borderRadius: "1.75rem",
                  }}
                >
                  <SingleBiasTypeChart
                    biasType={"False Balance Bias"}
                    pub1CrowdBias={stats.pub_1_crowd_bias.false_balance_bias}
                    pub2CrowdBias={stats.pub_2_crowd_bias.false_balance_bias}
                    pub1PersonalBias={stats.pub_1_personal_bias.false_balance_bias}
                    pub2PersonalBias={stats.pub_2_personal_bias.false_balance_bias}
                  ></SingleBiasTypeChart>
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
      <style>{"body { background-color: #f5f5f5; }"}</style>
      <Box justifyContent="center" sx={{ bgcolor: grey[100], height: "100vh", overflow: "auto", position: "relative" }}>
        <AppBarLoggedIn name={queryName ? queryName : stats.user.username}></AppBarLoggedIn>
        <CircularProgress color="secondary" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      </Box>
    </>
  );
}
