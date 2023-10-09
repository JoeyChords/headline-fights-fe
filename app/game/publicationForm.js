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

export default function PublicationForm({ user, headlines, publicationStats, fetchOnClick }) {
  const [publicationValue, setPublicationValue] = React.useState("");
  const [publicationCorrect, setPublicationCorrect] = React.useState(null);
  const [publicationDataset, setPublicationDataset] = React.useState([
    {
      you: 0,
      crowd: 0,
      publication: "CNN",
    },
    {
      you: 0,
      crowd: 0,
      publication: "Fox News",
    },
  ]);
  const [disabled, setDisabled] = React.useState(true);

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
    setPublicationDataset([
      {
        you: publicationStats.userPub1Percent,
        crowd: publicationStats.crowdPub1Percent,
        publication: "CNN",
      },
      {
        you: publicationStats.userPub2Percent,
        crowd: publicationStats.crowdPub2Percent,
        publication: "Fox News",
      },
    ]);
    if (publicationValue === headlines.publication) {
      setPublicationCorrect(true);
    } else {
      setPublicationCorrect(false);
    }
    setDisabled(true);
  };

  const getNextHeadline = () => {
    const feedback = new UserFeedback(headlines.publication, publicationCorrect, headlines._id, user.id);
    fetchOnClick(feedback);
    setPublicationCorrect(null);
    setPublicationValue("");
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
