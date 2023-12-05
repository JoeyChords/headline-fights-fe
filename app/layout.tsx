import "./globals.css";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeRegistry from "./ThemeRegistry";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Headline Fights",
  description:
    "Headline Fights is a game that helps players learn to recognize bias in the news media by pitting CNN and Fox News headlines against each other.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

export default function RootLayout(props: any) {
  const { children } = props;
  return (
    <html lang="en">
      <body className="min-h-full">
        <ThemeRegistry options={{ key: "mui" }}>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
