"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppBarLoggedIn from "/app/components/app-bar/appBarLoggedIn.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { grey } from "@mui/material/colors";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    fetch(API_ENDPOINT + "/logout", {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    })
      .then((res) => res.json())
      .then((response) => {
        router.push("/login");
      });
  });

  return (
    <>
      <main>
        <AppBarLoggedIn></AppBarLoggedIn>
        <Box
          component="main"
          sx={{
            bgcolor: grey[100],
            display: "flex",
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            flexDirection: "column",
          }}
        >
          <Box justifyContent="center" sx={{ display: "flex", mt: 20 }}>
            <CircularProgress color="secondary" />
          </Box>
          <h1 className="text-center mt-5 font-bold text-2xl">Logging out...</h1>
        </Box>
      </main>
    </>
  );
}
