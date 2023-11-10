"use client";
import AppBarLoggedIn from "./components/app-bar/appBarLoggedIn";
import AppBarHomePage from "./components/app-bar/appBarHomePage";
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
import { deepPurple } from "@mui/material/colors";

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
          <div className="page-wrapper bg-black w-screen h-screen p-4">
            <Box component="section" sx={{ bgcolor: deepPurple["A100"], p: "1rem", borderRadius: "1.75rem" }}>
              <AppBarHomePage></AppBarHomePage>
              <Grid container maxWidth="85rem" spacing={0} sx={{ mx: "auto" }}>
                <Grid xs={12} sm={6} sx={{ display: "flex", justifyContent: "center" }}></Grid>
                <Grid xs={12} sm={6} sx={{}}>
                  <Typography
                    component="div"
                    variant={"h1"}
                    sx={{
                      fontFamily: black_ops_one.style.fontFamily,
                      fontSize: "6.5rem",
                      lineHeight: "1",
                    }}
                  >
                    <Box>CNN</Box>
                    <Box>VS</Box>
                    <Box>Fox News</Box>
                  </Typography>
                  <Typography
                    component="div"
                    variant={"h2"}
                    sx={{
                      fontSize: "1.25rem",
                      fontWeight: "500",
                      lineHeight: "1.45rem",
                    }}
                  >
                    <Box>
                      Headline Fights finds out which is truly worse. Rate headlines without bias to find out what you and the crowd really think.
                    </Box>
                  </Typography>
                  <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
                    Submit Guess
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </div>
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
