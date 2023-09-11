"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Unstable_Grid2";

var photo = "public/images/image-not-found.png";

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

  if (isLoading) return <p>Loading...</p>;
  if (!headlines) return <p>No profile headlines</p>;

  if (headlines[0].photo_source_url != null) {
    photo = headlines[0].photo_source_url;
    if (headlines[0].photo_source_url.slice(0, 1) != "h") {
      photo = "https://" + headlines[0].photo_source_url;
    }
  }
  return (
    <>
      <Container sx={{ mt: 30 }} maxWidth="lg">
        <Grid direction="row" justifyContent="center" container spacing={2}>
          <Grid xs={6}>
            <h2>{headlines[0].headline}</h2>
            <Image className="rounded-lg" alt="" src={photo} width={720} height={405} />
          </Grid>
          <Grid xs={6}>
            <Button variant="contained">Submit</Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
