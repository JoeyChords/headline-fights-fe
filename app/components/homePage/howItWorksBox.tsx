import Box from "@mui/material/Box";
import type { ReactNode } from "react";

interface HowItWorksBoxProps {
  icon: ReactNode;
  component: ReactNode;
}

export default function HowItWorksBox(props: HowItWorksBoxProps) {
  return (
    <>
      <Box
        sx={{
          aspectRatio: "1/1",
          border: "1px solid",
          borderColor: "#000000",
          backgroundColor: "#000000",
          width: "100%",
          borderRadius: "1.75rem",
          p: "2rem",
          position: "relative",
        }}
      >
        {props.icon}
        {props.component}
      </Box>
    </>
  );
}
