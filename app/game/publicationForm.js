import * as React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import UserFeedback from "./classes/UserFeedback";
import { useRouter } from "next/navigation";
import GuessAccuracyChart from "@/app/game/components/guessAccuracyChart";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";

const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;

export default function PublicationForm({ user, headlines, fetchOnClick }) {
  const [publicationCorrect, setPublicationCorrect] = React.useState(undefined);
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

  let dataset = publicationDataset;

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
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 className="mt-6 md:mt-19 mb-2">You got it right. Great job!</h1>
          <GuessAccuracyChart dataset={dataset}></GuessAccuracyChart>

          <Button
            onClick={getNextHeadline}
            variant="contained"
            size="large"
            sx={{ fontSize: { lg: "1.25rem", xs: "1rem", textTransform: "capitalize" }, borderRadius: "100vw", p: "0.25rem 1.5rem" }}
          >
            Next
          </Button>
        </Box>
      </>
    );
  } else if (publicationCorrect === false) {
    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h1 className="mt-6 md:mt-19">Wrong answer. Better luck next time.</h1>
          <GuessAccuracyChart dataset={dataset}></GuessAccuracyChart>

          <Button
            onClick={getNextHeadline}
            variant="contained"
            size="large"
            sx={{ fontSize: { lg: "1.25rem", xs: "1rem", textTransform: "capitalize" }, borderRadius: "100vw", p: "0.25rem 1.5rem" }}
          >
            Next
          </Button>
        </Box>
      </>
    );
  }

  return (
    <form className="mt-6 md:mt-20" onSubmit={handleSubmit}>
      <FormControl variant="standard">
        <FormLabel id="publication-radio-group-label" sx={{ mb: "1rem" }}>
          Guess the news source:
        </FormLabel>
        <RadioGroup
          aria-labelledby="publication-radio-button-group"
          name="publication-radio-button-group"
          value={publicationValue}
          onChange={handlePublicationRadioChange}
        >
          <FormControlLabel value="cnn" control={<Radio />} label="CNN" />
          <FormControlLabel value="fox news" control={<Radio />} label="Fox News" />
        </RadioGroup>
        <Button
          sx={{ mt: "1rem", mr: 1, fontSize: { lg: "1.25rem", xs: "1rem" }, textTransform: "capitalize", borderRadius: "100vw", p: "0.25rem 1.5rem" }}
          type="submit"
          variant="contained"
          size="large"
          disabled={disabled}
        >
          Submit Guess
        </Button>
      </FormControl>
    </form>
  );
}
