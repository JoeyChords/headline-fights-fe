"use client";
import AppBarLoggedIn from "./components/app-bar/appBarLoggedIn";
import AppBarLoggedOut from "./components/app-bar/appBarLoggedOut";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import { black_ops_one } from "./fonts";
import { Typography } from "@mui/material";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Home() {
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!queryName) {
      fetch(API_ENDPOINT, { method: "GET", credentials: "include" })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
          if (response.isAuthenticated) {
            setIsLoggedIn(true);
            setUsername(response.user.username);
          } else {
            setIsLoggedIn(false);
          }
        });
    } else {
      setUsername(queryName);
      setIsLoggedIn(true);
    }
  }, [router, queryName]);

  if (!isLoggedIn) {
    return (
      <>
        <main>
          <AppBarLoggedOut></AppBarLoggedOut>
          <Box component="section">
            <Grid container spacing={0}>
              <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
                <Typography
                  variant={"h1"}
                  sx={{
                    fontFamily: black_ops_one.style.fontFamily,
                    fontSize: "4rem",
                  }}
                >
                  CNN vs. Fox News
                </Typography>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
                  Submit Guess
                </Button>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
                  Submit Guess
                </Button>
              </Grid>
              <Grid xs={6} sx={{ textAlign: "center" }}>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
                  Submit Guess
                </Button>
                <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
                  Submit Guess
                </Button>
              </Grid>
            </Grid>
          </Box>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
        <AppBarLoggedIn name={queryName ? queryName : userName}></AppBarLoggedIn>
        <Container sx={{ mt: 15 }} maxWidth="lg">
          <Box justifyContent="center" sx={{ display: "flex" }}>
            <CircularProgress color="secondary" />
          </Box>
          <p className="text-center mt-5">Loading...</p>
        </Container>
      </main>
    </>
  );
}
