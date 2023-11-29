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
import HowItWorks from "./components/homePage/howItWorks";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUsername] = useState("");
  const router = useRouter();
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(`${API_ENDPOINT}/home`, { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        if (response.isAuthenticated) {
          setIsLoggedIn(true);
          setUsername(response.user.username);
          router.push("/game?name=" + userName);
        } else {
          setIsLoggedIn(false);
          setStats(response);
        }
      });
  }, [router, userName]);

  if (!isLoggedIn) {
    return (
      <>
        <main>
          <Box className={"min-h-screen"} sx={{ bgcolor: "black", p: { xs: ".5rem", md: ".9rem", lg: "1.25rem" }, height: "100vh" }}>
            <HeroSection></HeroSection>
            <HowItWorks></HowItWorks>
            <Stats props={stats}></Stats>
          </Box>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
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
