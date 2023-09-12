"use client";
import Headline from "app/game/headline.js";
import AppBarLoggedIn from "app/components/app-bar/appBarLoggedIn.js";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link color="inherit" href="/game">
        Headline Fights
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Home() {
  return (
    <>
      <main>
        <AppBarLoggedIn></AppBarLoggedIn>
        <Headline></Headline>
        <Copyright sx={{ mt: 5 }} />
      </main>
    </>
  );
}
