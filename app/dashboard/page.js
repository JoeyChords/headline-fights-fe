"use client";
import AppBarLoggedIn from "/app/components/app-bar/appBarLoggedIn.js";
import { useRouter } from "next/navigation";

export default function Home() {
  return (
    <>
      <main>
        <AppBarLoggedIn></AppBarLoggedIn>
        <h1 className="text-center mt-20 font-bold text-2xl">Dashboard Coming Soon</h1>
      </main>
    </>
  );
}
