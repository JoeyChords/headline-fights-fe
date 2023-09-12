import * as React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import HeadlineButton from "./getHeadlineButton";

export default function PublicationForm({ headlines, fetchOnClick }) {
  const [value, setValue] = React.useState("");
  const [status, setStatus] = React.useState("newForm");
  const [disabled, setDisabled] = React.useState(true);

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setDisabled(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === headlines.publication) {
      setStatus("correctAnswer");
    } else {
      setStatus("wrongAnswer");
    }
    setDisabled(true);
  };

  const getNextHeadline = () => {
    fetchOnClick();
    setStatus("newForm");
    setValue("");
  };

  if (status === "correctAnswer") {
    return (
      <>
        <h1 className="mt-8 md:mt-24">You got it right. Great job!</h1>
        <div className="mt-5">
          <HeadlineButton content={"Next"} onClick={getNextHeadline}></HeadlineButton>
        </div>
      </>
    );
  } else if (status === "wrongAnswer") {
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
        <RadioGroup aria-labelledby="publication-radio-button-group" name="publication-radio-button-group" value={value} onChange={handleRadioChange}>
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
