import Button from "@mui/material/Button";
import type { ReactNode } from "react";

interface CTAButtonProps {
  cta: ReactNode;
}

export default function CTAButton(props: CTAButtonProps) {
  return (
    <Button
      sx={{
        mt: 1,
        mr: 1,
        textTransform: "capitalize",
        fontSize: { lg: "1.25rem", xs: "1.25rem" },
        borderRadius: "100vw",
        p: "0.25rem 1.5rem",
      }}
      size="large"
      variant="contained"
      href="/login"
    >
      {props.cta}
    </Button>
  );
}
