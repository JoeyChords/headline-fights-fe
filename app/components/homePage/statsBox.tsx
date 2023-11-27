import Box from "@mui/material/Box";

export default function StatsBox(props: any) {
  return (
    <Box
      sx={{
        border: "1px solid black",
        display: "flex",
        width: "100%",
        borderRadius: "1.75rem",
        justifyContent: "center",
        alignContent: "center",
        p: "4rem 1rem",
        aspectRatio: "1/1",
      }}
    >
      {props.component}
    </Box>
  );
}
