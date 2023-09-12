"use client";
import Headline from "app/game/headline.js";
import AppBarLoggedIn from "app/components/app-bar/appBarLoggedIn.js";

export default function Home() {
  return (
    <>
      <main>
        <AppBarLoggedIn></AppBarLoggedIn>
        <Headline></Headline>
      </main>
    </>
  );
}
