"use client";
import { useRouter } from "next/navigation";
import AppBarLoggedIn from "/app/components/app-bar/appBarLoggedIn.js";

export default function Logout() {
  const router = useRouter();

  fetch("/api/logout", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((response) => {
      router.push("/login");
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
