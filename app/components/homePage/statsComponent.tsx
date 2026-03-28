import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import type { ReactNode } from "react";

interface StatsComponentProps {
  total: ReactNode;
  title: string;
}

export default function StatsComponent(props: StatsComponentProps) {
  return (
    <>
      <Stack spacing={2} alignItems="center" justifyContent="center">
        <Typography align="center" component="p" variant="h1" sx={{ fontWeight: "bold", fontSize: { xs: "5rem" } }}>
          {props.total}
        </Typography>
        <Typography align="center" variant="h5" sx={{ fontWeight: "700", fontSize: { xs: "1.25rem" } }}>
          {props.title}
        </Typography>
      </Stack>
    </>
  );
}
