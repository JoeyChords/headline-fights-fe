"use client";
import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import PublicationForm from "./publicationForm";

var photo = "/image-not-found.png";

export default function Headline() {
  const [headlines, setheadlines] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/headlines")
      .then((res) => res.json())
      .then((headlines) => {
        setheadlines(headlines);
        console.log(headlines);
        setLoading(false);
      });
  }, []);

  const fetchOnClick = () => {
    photo = "/image-not-found.png";
    fetch("http://localhost:3000/headlines")
      .then((res) => res.json())
      .then((headlines) => {
        setheadlines(headlines);
        console.log(headlines);
        setLoading(false);
      });
    if (headlines[0].photo_source_url != null) {
      photo = headlines[0].photo_source_url;
      if (headlines[0].photo_source_url.slice(0, 1) != "h") {
        photo = "https://" + headlines[0].photo_source_url;
      }
    }
  };

  if (isLoading)
    return (
      <>
        <Container sx={{ mt: 30 }} maxWidth="lg">
          <p className="text-center">Loading...</p>
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

  if (headlines[0].photo_source_url != null) {
    photo = headlines[0].photo_source_url;
    if (headlines[0].photo_source_url.slice(0, 1) != "h") {
      photo = "https://" + headlines[0].photo_source_url;
    }
  }
  return (
    <>
      <Container className="mt-6 md:mt-20" maxWidth="lg">
        <Grid direction="row" justifyContent="center" container spacing={2}>
          <Grid xs={12} md={6}>
            <Card sx={{ boxShadow: 3 }}>
              <CardHeader title=<h2 className="font-bold text-2xl">{headlines[0].headline}</h2>></CardHeader>
              <Image priority={true} alt="" src={photo} width={720} height={405} />
            </Card>
          </Grid>
          <Grid className="text-center" xs={12} md={6}>
            <PublicationForm headlines={headlines} fetchOnClick={fetchOnClick}></PublicationForm>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
