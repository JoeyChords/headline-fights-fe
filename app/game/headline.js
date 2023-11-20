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
import PublicationForm from "./publicationForm";
import { useRouter } from "next/navigation";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Headline() {
  const [headlines, setHeadlines] = useState({});
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
          if (!response.getNewHeadline) {
            setHeadlines(response.headline);
            setUser(response.user);
            setLoading(false);
          } else {
            fetchOnClick();
          }
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
          if (!response.getNewHeadline) {
            setHeadlines(response.headline);
            setUser(response.user);
            setLoading(false);
          } else {
            /**
             * Re-render loading message to rerun useEffect
             */
            fetchOnClick();
            setLoading(true);
          }
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

  let photo = headlines.photo_source_url;

  return (
    <>
      <Container className="mt-6 md:mt-20" maxWidth="lg">
        <Grid direction="row" justifyContent="center" container spacing={2}>
          <Grid xs={12} md={6}>
            <Card sx={{ boxShadow: 2 }}>
              <CardHeader title=<h2 className="font-bold text-2xl">{headlines.headline}</h2>></CardHeader>
              <Image priority={true} alt="" src={photo} width={720} height={405} />
            </Card>
          </Grid>
          <Grid className="text-center" xs={12} md={6}>
            <PublicationForm user={user} headlines={headlines} fetchOnClick={fetchOnClick}></PublicationForm>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
