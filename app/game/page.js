"use client";
import Headline from "./headline";
import AppBarLoggedIn from "../components/app-bar/appBarLoggedIn";
import { grey } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Home() {
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!queryName) {
      fetch(`${API_ENDPOINT}/game`, { method: "GET", credentials: "include" })
        .then((res) => res.json())
        .then((response) => {
          if (response.isAuthenticated) {
            setIsLoggedIn(true);
            setUsername(response.user.username);
          } else {
            router.push("/login");
          }
        });
    } else {
      setUsername(queryName);
      setIsLoggedIn(true);
    }
  }, [router, queryName]);

  if (isLoggedIn) {
    return (
      <>
        <main>
          <AppBarLoggedIn name={userName}></AppBarLoggedIn>
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
            <Headline></Headline>
          </Box>
        </main>
      </>
    );
  }
  return (
    <>
      <main>
        <AppBarLoggedIn name={queryName ? queryName : userName}></AppBarLoggedIn>
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
          <Container sx={{ mt: 30 }} maxWidth="lg">
            <Box justifyContent="center" sx={{ display: "flex" }}>
              <CircularProgress color="secondary" />
            </Box>
            <p className="text-center mt-5">Loading...</p>
          </Container>
        </Box>
      </main>
    </>
  );
}
