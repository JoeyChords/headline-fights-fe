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
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import { surveyCriteria, SurveyCriteria } from "@/app/game/modules/attributesAndQuestions";

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
  const [question1, setQuestion1] = React.useState(new SurveyCriteria("", "", "", "", ""));
  const [question1Value, setQuestion1Value] = React.useState("");
  const [question2, setQuestion2] = React.useState(new SurveyCriteria("", "", "", "", ""));
  const [question2Value, setQuestion2Value] = React.useState("");

  React.useEffect(() => {
    const criteriaLength = surveyCriteria.length;
    let num1 = Math.floor(Math.random() * criteriaLength);
    let num2 = Math.floor(Math.random() * criteriaLength);
    while (num1 === num2) {
      num2 = Math.floor(Math.random() * criteriaLength);
    }
    setPublicationCorrect(null);
    setPublicationValue("");
    setDisabled(true);
    setQuestion1(surveyCriteria[num1]);
    setQuestion1Value("");
    setQuestion2(surveyCriteria[num2]);
    setQuestion2Value("");
  }, []);

  const router = useRouter();

  let feedback = {};
  let publicationCorrectProxy = undefined; //can't get state of publicationCorrect for unknown reason, so using this instead

  let dataset = publicationDataset;

  const handleQuestion1RadioChange = (event) => {
    setQuestion1Value(event.target.value);
    if (question2Value != "" && publicationValue != "") {
      setDisabled(false);
    }
  };

  const handleQuestion2RadioChange = (event) => {
    setQuestion2Value(event.target.value);
    if (question1Value != "" && publicationValue != "") {
      setDisabled(false);
    }
  };

  const handlePublicationRadioChange = (event) => {
    setPublicationValue(event.target.value);
    if (question1Value != "" && question2Value != "") {
      setDisabled(false);
    }
    console.log(event.target.value);
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

    feedback = new UserFeedback(
      headlines.publication,
      publicationCorrectProxy,
      headlines._id,
      user.id,
      question1.attribute,
      question1Value,
      question2.attribute,
      question2Value
    );

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
    feedback = {};
    publicationCorrectProxy = undefined;
  };

  if (publicationCorrect) {
    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="mt-6 md:mt-19 mb-2 text-center">You got the source right. Great job!</h2>
          <GuessAccuracyChart dataset={dataset}></GuessAccuracyChart>

          <Button
            onClick={getNextHeadline}
            variant="contained"
            size="large"
            sx={{
              fontSize: { lg: "1.25rem", xs: "1rem", textTransform: "capitalize" },
              borderRadius: "100vw",
              p: "0.25rem 1.5rem",
              mb: "3rem",
              width: "80%",
            }}
          >
            Next
          </Button>
          <h2 className="text-center">
            See the{" "}
            <Link href={`/dashboard?name=${user.username}`} underline="always" color={blueGrey[700]}>
              Dashboard
            </Link>{" "}
            for all your results.
          </h2>
        </Box>
      </>
    );
  } else if (publicationCorrect === false) {
    return (
      <>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h2 className="mt-6 md:mt-19 mb-2 text-center">You guessed the source wrong. Better luck next time.</h2>
          <GuessAccuracyChart dataset={dataset}></GuessAccuracyChart>

          <Button
            onClick={getNextHeadline}
            variant="contained"
            size="large"
            sx={{
              fontSize: { lg: "1.25rem", xs: "1rem", textTransform: "capitalize" },
              borderRadius: "100vw",
              p: "0.25rem 1.5rem",
              mb: "3rem",
              width: "80%",
            }}
          >
            Next
          </Button>
          <h2 className="text-center">
            See the{" "}
            <Link href={`/dashboard?name=${user.username}`} underline="always" color={blueGrey[700]}>
              Dashboard
            </Link>{" "}
            for all your results.
          </h2>
        </Box>
      </>
    );
  }

  return (
    <Box margin="auto" sx={{ p: { xs: 0, sm: "0 1rem", md: 0 } }}>
      <Typography variant="h1" component={"h1"}>
        <Box sx={{ textAlign: "center", fontWeight: 700, fontSize: "1.25rem", mb: ".5rem" }}>Rate for Bias and Guess the Source</Box>
        <Box sx={{ textAlign: "center", fontWeight: 400, fontSize: "1rem", mb: "1.5rem", color: grey[800] }}>Consider the image in your rating</Box>
      </Typography>
      <form onSubmit={handleSubmit}>
        <FormControl variant="standard">
          <FormLabel id="publication-radio-group-label" sx={{ textAlign: "left", fontSize: { xs: "1.25rem", lg: "1rem" }, marginBottom: ".6rem" }}>
            {question1.biasType}:
          </FormLabel>
          <RadioGroup
            aria-labelledby="publication-radio-button-group"
            name="publication-radio-button-group"
            value={question1Value}
            onChange={handleQuestion1RadioChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio size={"small"} />}
              label={question1.question}
              sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }}
            />
            <FormControlLabel
              value="false"
              control={<Radio size={"small"} />}
              label={question1.questionFoil}
              sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }}
            />
            <FormControlLabel
              value="neither"
              control={<Radio size={"small"} />}
              label={question1.noneOfTheAbove}
              sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }}
            />
          </RadioGroup>
          <FormLabel
            id="publication-radio-group-label"
            sx={{ mt: "1rem", textAlign: "left", fontSize: { xs: "1.25rem", lg: "1rem" }, marginBottom: ".6rem" }}
          >
            {question2.biasType}:
          </FormLabel>
          <RadioGroup
            aria-labelledby="publication-radio-button-group"
            name="publication-radio-button-group"
            value={question2Value}
            onChange={handleQuestion2RadioChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio size={"small"} />}
              label={question2.question}
              sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }}
            />
            <FormControlLabel
              value="false"
              control={<Radio size={"small"} />}
              label={question2.questionFoil}
              sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }}
            />
            <FormControlLabel
              value="neither"
              control={<Radio size={"small"} />}
              label={question2.noneOfTheAbove}
              sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }}
            />
          </RadioGroup>
          <FormLabel
            id="publication-radio-group-label"
            sx={{ mt: "1rem", textAlign: { xs: "center", sm: "left" }, fontSize: { xs: "1.25rem", lg: "1rem" }, marginBottom: ".6rem" }}
          >
            Guess the news source:
          </FormLabel>
          <RadioGroup
            aria-labelledby="publication-radio-button-group"
            name="publication-radio-button-group"
            value={publicationValue}
            onChange={handlePublicationRadioChange}
          >
            <FormControlLabel value="cnn" control={<Radio size={"small"} />} label="CNN" sx={{ marginBottom: ".6rem" }} />
            <FormControlLabel value="fox news" control={<Radio size={"small"} />} label="Fox News" sx={{ marginBottom: ".6rem" }} />
          </RadioGroup>
          <Button
            sx={{
              mt: "1rem",
              fontSize: { xs: "1.25rem", lg: "1rem" },
              textTransform: "capitalize",
              borderRadius: "100vw",
              p: "0.25rem 1.5rem",
              width: "80%",
              mx: "auto",
              mb: { xs: "3rem", md: "1rem" },
            }}
            type="submit"
            variant="contained"
            size="large"
            disabled={disabled}
          >
            Submit
          </Button>
        </FormControl>
      </form>
    </Box>
  );
}
