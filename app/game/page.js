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
        <style>{"body { background-color: #f5f5f5; }"}</style>
        <main>
          <Box component="main">
            <AppBarLoggedIn name={userName}></AppBarLoggedIn>
            <Headline></Headline>
          </Box>
        </main>
      </>
    );
  }
  return (
    <>
      <style>{"body { background-color: #f5f5f5; }"}</style>
      <main>
        <Box justifyContent="center" sx={{ height: "100vh", width: "100%", position: "relative" }}>
          <AppBarLoggedIn name={queryName ? queryName : userName}></AppBarLoggedIn>
          <CircularProgress color="secondary" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
        </Box>
      </main>
    </>
  );
}
