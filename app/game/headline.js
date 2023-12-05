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
import { grey } from "@mui/material/colors";
import { Typography } from "@mui/material";
import SurveyForm from "./surveyForm";
import { useRouter } from "next/navigation";
import { TurnedIn } from "@mui/icons-material";
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
        <style>{"body { background-color: #f5f5f5; }"}</style>
        <Box sx={{ mt: { xs: "-58px", sm: "-64px" }, height: "100vh", width: "100%", position: "relative" }}>
          <CircularProgress color="secondary" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </Box>
      </>
    );
  if (!headline)
    return (
      <>
        <style>{"body { background-color: #f5f5f5; }"}</style>
        <Box justifyContent="center" sx={{ height: "100vh", width: "100%", position: "relative" }}>
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <p className="text-center">No headlines to show</p>
          </Box>
        </Box>
      </>
    );

  return (
    <>
      <Box component="section" sx={{ width: "100%", overflow: "auto" }}>
        <Grid
          direction="row"
          maxWidth="lg"
          justifyContent="center"
          container
          spacing={2}
          sx={{ mx: "auto", mb: "3rem", display: "flex", mt: { xs: "1rem", lg: "2rem" } }}
        >
          <Grid xs={12} md={6} sx={{ verticalAlign: "middle", pt: { md: "1.75rem" }, pl: { md: "2.5rem", lg: 0 } }}>
            <Card
              sx={{
                boxShadow: { xs: 2, sm: 4 },
                borderRadius: "1.75rem",
                width: { xs: "95%", sm: "80%", md: "95%" },
                mx: "auto",
              }}
            >
              <CardHeader title=<h2 className="font-bold text-2xl">{headline}</h2>></CardHeader>
              <Image priority={true} alt="" src={photo} width={720} height={405} />
            </Card>
          </Grid>
          <Grid xs={12} md={6} sx={{ p: { xs: "2rem 1.25rem 0", sm: "2rem 1.75rem 0" } }}>
            <Box sx={{ width: { xs: "95%", sm: "85%" }, mx: "auto" }}>
              <SurveyForm user={user} headlines={headlines} fetchOnClick={fetchOnClick}></SurveyForm>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
