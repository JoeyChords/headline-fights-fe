import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface StatsBoxProps {
  component: ReactNode;
}

export default function StatsBox(props: StatsBoxProps) {
  return (
    <Box
      sx={{
        border: "1.5px solid black",
        display: "flex",
        width: "100%",
        borderRadius: "1.75rem",
        justifyContent: "center",
        alignContent: "center",
        p: "4rem 1rem",
        aspectRatio: { xs: "1/1", md: "auto", lg: "1/1" },
      }}
    >
      {props.component}
    </Box>
  );
}
