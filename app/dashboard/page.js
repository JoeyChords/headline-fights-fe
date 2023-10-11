"use client";
import AppBarLoggedIn from "/app/components/app-bar/appBarLoggedIn.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;

export default function Dashboard() {
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!queryName) {
      fetch(`${API_ENDPOINT}/dashboard`, { method: "GET", credentials: "include" })
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
          <h1 className="text-center mt-20 font-bold text-2xl">Dashboard Coming Soon</h1>
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
