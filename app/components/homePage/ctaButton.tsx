import Button from "@mui/material/Button";

export default function CTAButton(props: any) {
  return (
    <Button
      sx={{ mt: 1, mr: 1, textTransform: "capitalize", fontSize: { lg: "1.25rem", xs: "1.25rem" }, borderRadius: "100vw", p: "0.25rem 1.5rem" }}
      size="large"
      variant="contained"
      href="/login"
    >
      {props.cta}
    </Button>
  );
}
