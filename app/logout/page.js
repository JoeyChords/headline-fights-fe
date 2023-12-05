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
      <style>{"body { background-color: #f5f5f5; }"}</style>
      <Box justifyContent="center" sx={{ bgcolor: grey[100], height: "100vh", overflow: "auto", position: "relative" }}>
        <AppBarLoggedIn></AppBarLoggedIn>
        <CircularProgress color="secondary" sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }} />
      </Box>
    </>
  );
}
