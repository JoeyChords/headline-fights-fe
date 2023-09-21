import Button from "@mui/material/Button";

export default function HeadlineButton({ content, onClick }) {
  return (
    <Button onClick={onClick} variant="contained">
      {content}
    </Button>
  );
}
