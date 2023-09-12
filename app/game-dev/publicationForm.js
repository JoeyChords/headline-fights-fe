import * as React from "react";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import HeadlineButton from "./getHeadlineButton";

export default function PublicationForm({ headlines, fetchOnClick }) {
  const [value, setValue] = React.useState("");
  const [status, setStatus] = React.useState("newForm");
  const [disabled, setDisabled] = React.useState(true);

  // if (status != "") {
  //   setDisabled(false);
  // }

  const handleRadioChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === headlines[0].publication) {
      setStatus("correctAnswer");
    } else {
      setStatus("wrongAnswer");
    }
  };

  const getNextHeadline = () => {
    fetchOnClick();
    setStatus("newForm");
    setValue("");
  };

  if (status === "correctAnswer") {
    return (
      <>
        <h1 className="mt-20">You got it right. Great job!</h1>
        <div className="mt-5">
          <HeadlineButton content={"Next"} onClick={getNextHeadline}></HeadlineButton>
        </div>
      </>
    );
  } else if (status === "wrongAnswer") {
    return (
      <>
        <h1 className="mt-20">Wrong answer. Better luck next time.</h1>
        <div className="mt-5">
          <HeadlineButton content={"Next"} onClick={getNextHeadline}></HeadlineButton>
        </div>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ mt: 10 }} variant="standard">
        <FormLabel id="publication-radio-group-label">Guess the news source:</FormLabel>
        <RadioGroup aria-labelledby="publication-radio-button-group" name="publication-radio-button-group" value={value} onChange={handleRadioChange}>
          <FormControlLabel value="cnn" control={<Radio />} label="CNN" />
          <FormControlLabel value="fox news" control={<Radio />} label="Fox News" />
        </RadioGroup>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="contained">
          Submit Guess
        </Button>
      </FormControl>
    </form>
  );
}
