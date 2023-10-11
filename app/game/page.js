"use client";
import Headline from "app/game/headline.js";
import AppBarLoggedIn from "app/components/app-bar/appBarLoggedIn.js";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

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
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!queryName) {
      fetch(`${API_ENDPOINT}/game`, { method: "GET", credentials: "include" })
        .then((res) => res.json())
        .then((response) => {
          console.log(response);
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
          <Headline></Headline>
          <Copyright sx={{ mt: 5 }} />
        </main>
      </>
    );
  }
  return (
    <>
      <main>
        <AppBarLoggedIn name={queryName ? queryName : userName}></AppBarLoggedIn>
        <p className="text-center mt-20">Loading...</p>
      </main>
    </>
  );
}
