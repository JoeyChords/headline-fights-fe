"use client";
import Headline from "app/game/headline.js";
import ResponsiveAppBar from "app/components/responsiveAppBar.js";

export default function Home() {
  return (
    <>
      <main>
        <ResponsiveAppBar></ResponsiveAppBar>
        <Headline></Headline>
      </main>
    </>
  );
}
