import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { black_ops_one } from "@/app/fonts";
import { deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import AppBarHomePage from "@/app/components/app-bar/appBarHomePage";
import Paper from "@mui/material/Paper";
import HeadlineCount from "@/app/dashboard/components/HeadlineCount";

export default function Stats() {
  return (
    <>
      <Box component="section" sx={{ bgcolor: deepPurple["A100"], p: "6rem 1rem", borderRadius: "1.75rem", width: "100%", mt: "5rem" }}>
        <Box maxWidth="35rem" sx={{ width: "100%", mx: "auto", mb: "3.5rem" }}>
          <Typography variant="h3" fontSize={"3.25rem"} fontWeight={"500"} lineHeight={"1.3"}>
            <Box textAlign={"center"}>Placeholder</Box>
          </Typography>
        </Box>
        <Grid container maxWidth="85rem" spacing={4} sx={{ mx: "auto", display: "flex", mb: "3.5rem" }}>
          <Grid xs={12} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ border: "1px solid black", display: "flex", width: "100%", borderRadius: "1.75rem", justifyContent: "center", p: "4rem 0" }}>
              <HeadlineCount total={40} pub1Total={30} pub2Total={34}></HeadlineCount>
            </Box>
          </Grid>
          <Grid xs={12} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ border: "1px solid black", display: "flex", width: "100%", borderRadius: "1.75rem", justifyContent: "center", p: "4rem 0" }}>
              <HeadlineCount total={40} pub1Total={30} pub2Total={34}></HeadlineCount>
            </Box>
          </Grid>
          <Grid xs={12} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ border: "1px solid black", display: "flex", width: "100%", borderRadius: "1.75rem", justifyContent: "center", p: "4rem 0" }}>
              <HeadlineCount total={40} pub1Total={30} pub2Total={34}></HeadlineCount>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ textTransform: "capitalize", fontSize: { lg: "1.25rem", xs: "1rem" } }} size="large" variant="contained" href="/login">
            Start Rating
          </Button>
        </Box>
      </Box>
    </>
  );
}
