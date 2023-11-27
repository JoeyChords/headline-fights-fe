//Fetches and renders the game headlines and images
"use client";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import SurveyForm from "./surveyForm";
import { useRouter } from "next/navigation";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Headline() {
  const [headlines, setHeadlines] = useState({});
  const [headline, setHeadline] = useState("");
  const [photo, setPhoto] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  /**
   * Fetch new headline and accompanying image on user submit.
   * Send user feedback to API.
   */
  const fetchOnClick = () => {
    setLoading(true);
    fetch(API_ENDPOINT + "/headlines", {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.isAuthenticated) {
          setHeadlines(response.headline);
          setHeadline(response.headline.headline);
          setPhoto(response.headline.photo_source_url);
          setUser(response.user);
          setLoading(false);
        } else {
          router.push("/login");
        }
      });
  };

  /**
   * Fetch new headline and accompanying image on page load
   */
  useEffect(() => {
    fetch(API_ENDPOINT + "/headlines", { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        if (response.isAuthenticated) {
          setHeadlines(response.headline);
          setHeadline(response.headline.headline);
          setPhoto(response.headline.photo_source_url);
          setUser(response.user);
          setLoading(false);
        } else {
          router.push("/login");
        }
      });
  }, [router]);

  if (isLoading)
    return (
      <>
        <Container sx={{ mt: 30 }} maxWidth="lg">
          <Box justifyContent="center" sx={{ display: "flex" }}>
            <CircularProgress color="secondary" />
          </Box>
          <p className="text-center mt-5">Loading...</p>
        </Container>
      </>
    );
  if (!headlines)
    return (
      <>
        <Container sx={{ mt: 30 }} maxWidth="lg">
          <p className="text-center">No headlines to show</p>
        </Container>
      </>
    );

  return (
    <>
      <Box component="section" sx={{ width: "100%" }}>
        <Grid
          direction="row"
          maxWidth="lg"
          justifyContent="center"
          container
          spacing={2}
          sx={{ mx: "auto", display: "flex", mt: { xs: "1rem", lg: "2rem" }, mb: "2rem" }}
        >
          <Grid xs={12} md={6} sx={{ verticalAlign: "middle", position: "relative" }}>
            <Card
              sx={{
                boxShadow: { xs: 2, sm: 4 },
                borderRadius: "1.75rem",
                display: { md: "none" },
              }}
            >
              <CardHeader title=<h2 className="font-bold text-2xl">{headline}</h2>></CardHeader>
              <Image priority={true} alt="" src={photo} width={720} height={405} />
            </Card>
            <Card
              sx={{
                boxShadow: { xs: 2, sm: 4 },
                borderRadius: "1.75rem",
                width: "95%",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-52.5%, -50%)",
                display: { xs: "none", md: "block" },
              }}
            >
              <CardHeader title=<h2 className="font-bold text-2xl">{headline}</h2>></CardHeader>
              <Image priority={true} alt="" src={photo} width={720} height={405} />
            </Card>
          </Grid>
          <Grid xs={12} md={6} sx={{ p: { xs: "2rem 1.25rem 4rem", sm: "2rem 1.75rem 4rem" } }}>
            <Typography variant="h1" component={"h1"}>
              <Box sx={{ textAlign: "center", fontWeight: 700, fontSize: "1.25rem", mb: "1.5rem" }}>Rate for Bias and Guess the Source</Box>
            </Typography>
            <SurveyForm user={user} headlines={headlines} fetchOnClick={fetchOnClick}></SurveyForm>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
