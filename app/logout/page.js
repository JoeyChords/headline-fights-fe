"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AppBarLoggedIn from "/app/components/app-bar/appBarLoggedIn.js";
const API_ENDPOINT = require("/app/config");

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
        <h1 className="text-center mt-20 font-bold text-2xl">Logging out...</h1>
      </main>
    </>
  );
}
