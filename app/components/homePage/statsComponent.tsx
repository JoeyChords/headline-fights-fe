import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
const config = require("/app/config");
const API_ENDPOINT = config.API_ENDPOINT;
const PUB_1 = config.PUB_1;
const PUB_2 = config.PUB_2;

export default function StatsComponent(props: any) {
  return (
    <>
      <Stack spacing={2}>
        <Typography align="center" component="p" variant="h1" sx={{ fontWeight: "bold" }}>
          {props.total}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "700" }}>
          {props.title}
        </Typography>
      </Stack>
    </>
  );
}
