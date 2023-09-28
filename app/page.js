"use client";
import AppBarLoggedOut from "/app/components/app-bar/appBarLoggedOut.js";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const API_ENDPOINT = require("/app/config");

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");

  useEffect(() => {
    fetch(API_ENDPOINT, { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        if (response.isAuthenticated) {
          setIsLoggedIn(true);
          setUsername(response.user.username);
        }
        console.log(response);
      });
  }, [setIsLoggedIn]);

  return (
    <>
      <main>
        <AppBarLoggedOut></AppBarLoggedOut>
        <Container className="text-center" maxWidth="sm">
          <h1 className="text-center mt-20 font-bold text-2xl">Home Page Coming Soon</h1>
          <Button href={isLoggedIn ? `/game?name=${userName}` : "/login"} variant="contained" sx={{ mt: 3, mb: 2 }}>
            Play Now
          </Button>
        </Container>
      </main>
    </>
  );
}
