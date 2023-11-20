import * as React from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { blueGrey } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";

export default function StatsComponent(props: any) {
  return (
    <>
      <Box sx={{ position: "absolute", bottom: "2rem", pr: "1rem" }}>
        <Typography variant="h5" sx={{ fontWeight: "700", fontSize: { xs: "1.25rem" }, color: "#ffffff" }}>
          {props.title}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: "500", fontSize: { xs: "1rem" }, color: grey[400] }}>
          {props.explanation}
        </Typography>
      </Box>
    </>
  );
}
