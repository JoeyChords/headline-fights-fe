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
import { attributes, biasType, questions, questionFoils } from "@/app/game/modules/attributesAndQuestions";

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
  const [question1, setQuestion1] = React.useState("");
  const [question1Foil, setQuestion1Foil] = React.useState("");
  const [question1Attribute, setQuestion1Attribute] = React.useState("");
  const [question1BiasType, setQuestion1BiasType] = React.useState("");
  const [question1Value, setQuestion1Value] = React.useState("");
  const [question2, setQuestion2] = React.useState("");
  const [question2Foil, setQuestion2Foil] = React.useState("");
  const [question2Attribute, setQuestion2Attribute] = React.useState("");
  const [question2BiasType, setQuestion2BiasType] = React.useState("");
  const [question2Value, setQuestion2Value] = React.useState("");

  React.useEffect(() => {
    let num1 = Math.floor(Math.random() * 2);
    let num2 = Math.floor(Math.random() * 2);
    while (num1 === num2) {
      num2 = Math.floor(Math.random() * 2);
    }
    setPublicationCorrect(null);
    setPublicationValue("");
    setDisabled(true);
    setQuestion1Attribute(attributes[num1]);
    setQuestion1BiasType(biasType[num1]);
    setQuestion1(questions[num1]);
    setQuestion1Foil(questionFoils[num1]);
    setQuestion1Value("");
    setQuestion2Attribute(attributes[num2]);
    setQuestion2BiasType(biasType[num2]);
    setQuestion2(questions[num2]);
    setQuestion2Foil(questionFoils[num2]);
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
            sx={{ fontSize: { lg: "1.25rem", xs: "1rem", textTransform: "capitalize" }, borderRadius: "100vw", p: "0.25rem 1.5rem", mb: "6rem" }}
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
            sx={{ fontSize: { lg: "1.25rem", xs: "1rem", textTransform: "capitalize" }, borderRadius: "100vw", p: "0.25rem 1.5rem", mb: "6rem" }}
          >
            Next
          </Button>
        </Box>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl variant="standard">
        <FormLabel id="publication-radio-group-label" sx={{ textAlign: "left", fontSize: { xs: "1.25rem", lg: "1rem" }, marginBottom: ".6rem" }}>
          {question1BiasType}:
        </FormLabel>
        <RadioGroup
          aria-labelledby="publication-radio-button-group"
          name="publication-radio-button-group"
          value={question1Value}
          onChange={handleQuestion1RadioChange}
        >
          <FormControlLabel value="true" control={<Radio />} label={question1} sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }} />
          <FormControlLabel value="false" control={<Radio />} label={question1Foil} sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }} />
          <FormControlLabel value="neither" control={<Radio />} label="Neither" sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }} />
        </RadioGroup>
        <FormLabel
          id="publication-radio-group-label"
          sx={{ mt: "1rem", textAlign: "left", fontSize: { xs: "1.25rem", lg: "1rem" }, marginBottom: ".6rem" }}
        >
          {question2BiasType}:
        </FormLabel>
        <RadioGroup
          aria-labelledby="publication-radio-button-group"
          name="publication-radio-button-group"
          value={question2Value}
          onChange={handleQuestion2RadioChange}
        >
          <FormControlLabel value="true" control={<Radio />} label={question2} sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }} />
          <FormControlLabel value="false" control={<Radio />} label={question2Foil} sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }} />
          <FormControlLabel value="neither" control={<Radio />} label="Neither" sx={{ marginBottom: { xs: ".75rem", sm: ".6rem" } }} />
        </RadioGroup>
        <FormLabel
          id="publication-radio-group-label"
          sx={{ mt: "1rem", textAlign: "center", fontSize: { xs: "1.25rem", lg: "1rem" }, marginBottom: ".6rem" }}
        >
          Guess the news source:
        </FormLabel>
        <RadioGroup
          aria-labelledby="publication-radio-button-group"
          name="publication-radio-button-group"
          value={publicationValue}
          onChange={handlePublicationRadioChange}
        >
          <FormControlLabel value="cnn" control={<Radio />} label="CNN" sx={{ marginBottom: ".6rem" }} />
          <FormControlLabel value="fox news" control={<Radio />} label="Fox News" sx={{ marginBottom: ".6rem" }} />
        </RadioGroup>
        <Button
          sx={{
            mt: "1rem",
            mb: "6rem",
            fontSize: { xs: "1.25rem", lg: "1rem" },
            textTransform: "capitalize",
            borderRadius: "100vw",
            p: "0.25rem 1.5rem",
            width: "80%",
            mx: "auto",
          }}
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
