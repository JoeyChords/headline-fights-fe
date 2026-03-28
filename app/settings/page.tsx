"use client";
import AppBarLoggedIn from "../components/app-bar/appBarLoggedIn";
import { useRouter } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import config from "@/app/config";
const API_ENDPOINT = config.API_ENDPOINT;
const subscribe = () => () => {};
const getServerUserNameSnapshot = () => "";
const getClientUserNameSnapshot = () => sessionStorage.getItem("userName") ?? "";

export default function Settings() {
  const queryName = useSyncExternalStore(subscribe, getClientUserNameSnapshot, getServerUserNameSnapshot);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/settings`, { method: "GET", credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error(String(res.status));
        return res.json();
      })
      .then((response) => {
        if (response.isAuthenticated) {
          setIsLoggedIn(true);
          setUsername(response.user.username);
          sessionStorage.setItem("userName", response.user.username);
        } else {
          router.push("/login");
        }
      })
      .catch(() => router.push("/login"));
  }, [router]);

  if (isLoggedIn) {
    return (
      <>
        <main>
          <AppBarLoggedIn name={userName}></AppBarLoggedIn>
          <h1 className="text-center mt-20 font-bold text-2xl">Settings Coming Soon</h1>
        </main>
      </>
    );
  }

  return (
    <>
      <main>
        <AppBarLoggedIn name={queryName ? queryName : userName}></AppBarLoggedIn>
        <Container sx={{ mt: 15 }} maxWidth="lg">
          <Box justifyContent="center" sx={{ display: "flex" }}>
            <CircularProgress color="secondary" />
          </Box>
          <p className="text-center mt-5">Loading...</p>
        </Container>{" "}
      </main>
    </>
  );
}
