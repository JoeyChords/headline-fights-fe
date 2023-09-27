"use client";
import AppBarLoggedOut from "/app/components/app-bar/appBarLoggedOut.js";
import { useEffect, useState } from "react";
const API_ENDPOINT = require("/app/config");

export default function Home() {
  useEffect(() => {
    fetch(API_ENDPOINT, { method: "GET", credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
      });
  }, []);

  return (
    <>
      <main>
        <AppBarLoggedOut></AppBarLoggedOut>
        <h1 className="text-center mt-20 font-bold text-2xl">Home Page Coming Soon</h1>
      </main>
    </>
  );
}
