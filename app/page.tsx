"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import HeroSection from "./components/homePage/hero";
import Stats from "./components/homePage/stats";
import HowItWorks from "./components/homePage/howItWorks";
import Footer from "./components/homePage/footer";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Home(): JSX.Element {
  interface Stats {
    isAuthenticated: boolean;
    numUsers: number;
    numPub1Ratings: number;
    numPub2Ratings: number;
    pub_1_total_bias: number;
    pub_2_total_bias: number;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUsername] = useState("");
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({
    isAuthenticated: false,
    numUsers: 0,
    numPub1Ratings: 0,
    numPub2Ratings: 0,
    pub_1_total_bias: 0,
    pub_2_total_bias: 0,
  });

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
        <style>{"body { background-color: black; }"}</style>
        <Box
          sx={{
            p: { xs: ".5rem", md: ".9rem", lg: "1.25rem" },
          }}
        >
          <HeroSection pub1Bias={stats.pub_1_total_bias} pub2Bias={stats.pub_2_total_bias}></HeroSection>
          <HowItWorks></HowItWorks>
          <Stats props={stats}></Stats>
          <Footer></Footer>
        </Box>
      </>
    );
  }

  return (
    <>
      <style>{"body { background-color: black; }"}</style>
      <Box justifyContent="center" sx={{ height: "100vh", width: "100%", position: "relative" }}>
        <CircularProgress color="secondary" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      </Box>
    </>
  );
}
