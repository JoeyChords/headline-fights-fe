import * as React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import HeadlineButton from "./getHeadlineButton";
import UserFeedback from "./classes/UserFeedback";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import { useRouter } from "next/navigation";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;

export default function PublicationForm({ user, headlines, fetchOnClick }) {
  const [publicationCorrect, setPublicationCorrect] = React.useState(null);
  const [publicationValue, setPublicationValue] = React.useState("");
  const [publicationDataset, setPublicationDataset] = React.useState([
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
  const [disabled, setDisabled] = React.useState(true);
  const router = useRouter();
  let feedback = {};
  let publicationCorrectProxy = undefined; //can't get state of publicationCorrect for unknown reason, so using this instead

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

  const handlePublicationRadioChange = (event) => {
    setPublicationValue(event.target.value);
    setDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (publicationValue === headlines.publication) {
      setPublicationCorrect(true);
      publicationCorrectProxy = true;
    } else {
      setPublicationCorrect(false);
      publicationCorrectProxy = false;
    }

    feedback = new UserFeedback(headlines.publication, publicationCorrectProxy, headlines._id, user.id);

    fetch(API_ENDPOINT + "/updateStatistics", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.isAuthenticated) {
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
          console.log("Fetched");
        } else {
          router.push("/login");
        }
      });
  };

  const getNextHeadline = () => {
    fetchOnClick();
    setPublicationCorrect(null);
    setPublicationValue("");
    setDisabled(true);
    feedback = {};
    publicationCorrectProxy = undefined;
  };

  if (publicationCorrect) {
    return (
      <>
        <h1 className="mt-6 md:mt-19">You got it right. Great job!</h1>
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
        <div className="mt-5">
          <HeadlineButton content={"Next"} onClick={getNextHeadline}></HeadlineButton>
        </div>
      </>
    );
  } else if (publicationCorrect === false) {
    return (
      <>
        <h1 className="mt-6 md:mt-19">Wrong answer. Better luck next time.</h1>
        <div className="flex items-center justify-center">
          <BarChart
            className="mr-auto ml-auto"
            dataset={dataset}
            xAxis={[{ scaleType: "band", dataKey: "publication" }]}
            series={[
              { dataKey: "you", label: "You", valueFormatter },
              { dataKey: "crowd", label: "Crowd", valueFormatter },
            ]}
            {...chartSetting}
          />
        </div>
        <div className="mt-5">
          <HeadlineButton content={"Next"} onClick={getNextHeadline}></HeadlineButton>
        </div>
      </>
    );
  }

  return (
    <form className="mt-6 md:mt-20" onSubmit={handleSubmit}>
      <FormControl variant="standard">
        <FormLabel id="publication-radio-group-label">Guess the news source:</FormLabel>
        <RadioGroup
          aria-labelledby="publication-radio-button-group"
          name="publication-radio-button-group"
          value={publicationValue}
          onChange={handlePublicationRadioChange}
        >
          <FormControlLabel value="cnn" control={<Radio />} label="CNN" />
          <FormControlLabel value="fox news" control={<Radio />} label="Fox News" />
        </RadioGroup>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained" disabled={disabled}>
          Submit Guess
        </Button>
      </FormControl>
    </form>
  );
}
