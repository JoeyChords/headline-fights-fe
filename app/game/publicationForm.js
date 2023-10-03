import * as React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import HeadlineButton from "./getHeadlineButton";
import UserFeedback from "./classes/UserFeedback";

export default function PublicationForm({ user, headlines, fetchOnClick }) {
  const [publicationValue, setPublicationValue] = React.useState("");
  const [publicationCorrect, setPublicationCorrect] = React.useState(null);
  const [disabled, setDisabled] = React.useState(true);

  const handlePublicationRadioChange = (event) => {
    setPublicationValue(event.target.value);
    setDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
        <h1 className="mt-8 md:mt-24">You got it right. Great job!</h1>
        <div className="mt-5">
          <HeadlineButton content={"Next"} onClick={getNextHeadline}></HeadlineButton>
        </div>
      </>
    );
  } else if (publicationCorrect === false) {
    return (
      <>
        <h1 className="mt-8 md:mt-24">Wrong answer. Better luck next time.</h1>
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
