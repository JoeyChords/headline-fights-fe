"use client";
import Headline from "./headline";
import AppBarLoggedIn from "../components/app-bar/appBarLoggedIn";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import config from "@/app/config";
const API_ENDPOINT = config.API_ENDPOINT;
const subscribe = () => () => {};
const getServerUserNameSnapshot = () => "";
const getClientUserNameSnapshot = () => sessionStorage.getItem("userName") ?? "";

interface GameAuthResponse {
  isAuthenticated: boolean;
  email_verified: boolean;
  user?: {
    username: string;
    email: string;
  };
}

export default function Home() {
  const queryName = useSyncExternalStore(subscribe, getClientUserNameSnapshot, getServerUserNameSnapshot);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/game`, { method: "GET", credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json() as Promise<GameAuthResponse>;
      })
      .then((response) => {
        if (response.isAuthenticated) {
          if (response.email_verified) {
            setIsLoggedIn(true);
            setUsername(response.user?.username ?? "");
            sessionStorage.setItem("userName", response.user?.username ?? "");
          } else {
            if (response.user?.email) {
              sessionStorage.setItem("pendingVerifyEmail", response.user.email);
            }
            router.push("/verify");
          }
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

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
          <CircularProgress
            color="secondary"
            sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          />
        </Box>
      </main>
    </>
  );
}
