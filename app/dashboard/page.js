"use client";
import AppBarLoggedIn from "/app/components/app-bar/appBarLoggedIn.js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import UserFeedback from "../game/classes/UserFeedback";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;

export default function Dashboard() {
  const queryName = useSearchParams().get("name");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUsername] = useState("");
  const [publicationDataset, setPublicationDataset] = useState([
    {
      you: 0,
      crowd: 0,
      publication: PUB_1,
    },
    {
      you: 0,
      crowd: 0,
      publication: PUB_2,
    },
  ]);

  const chartSetting = {
    yAxis: [
      {
        label: "Guess Accuracy (Overall)",
      },
    ],
    width: 300,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "rotate(-90deg) translate(0px, -20px)",
      },
    },
  };
  let dataset = publicationDataset;

  const valueFormatter = (value) => `${value}%`;

  const router = useRouter();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/dashboard`, { method: "POST", credentials: "include" })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.isAuthenticated) {
          setIsLoggedIn(true);
          setUsername(response.user.username);
          setPublicationDataset([
            {
              you: response.publicationStats.userPub1Percent,
              crowd: response.publicationStats.crowdPub1Percent,
              publication: PUB_1,
            },
            {
              you: response.publicationStats.userPub2Percent,
              crowd: response.publicationStats.crowdPub2Percent,
              publication: PUB_2,
            },
          ]);
        } else {
          router.push("/login");
        }
      });
  }, [router, queryName]);

  if (isLoggedIn) {
    return (
      <>
        <main>
          <AppBarLoggedIn name={userName}></AppBarLoggedIn>
          <div className="flex items-center justify-center">
            <BarChart
              dataset={dataset}
              xAxis={[{ scaleType: "band", dataKey: "publication" }]}
              series={[
                { dataKey: "you", label: "You", valueFormatter },
                { dataKey: "crowd", label: "Crowd", valueFormatter },
              ]}
              {...chartSetting}
            />
          </div>
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
