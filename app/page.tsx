"use client";
import AppBarLoggedIn from "./components/app-bar/appBarLoggedIn";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import HeroSection from "./components/homePage/hero";
import Stats from "./components/homePage/stats";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Home() {
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [userName, setUsername] = useState("");
  const router = useRouter();
  const [stats, setStats] = useState({});

  useEffect(() => {
    if (!queryName) {
      fetch(`${API_ENDPOINT}/home`, { method: "POST", credentials: "include" })
        .then((res) => res.json())
        .then((response) => {
          if (response.isAuthenticated) {
            setIsLoggedIn(true);
            setUsername(response.user.username);
            router.push("/game");
          } else {
            setIsLoggedIn(false);
            setStats(response);
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
          <Box className={"min-h-screen"} sx={{ bgcolor: "black", p: "1.25rem" }}>
            <HeroSection></HeroSection>
            <Stats props={stats}></Stats>
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
