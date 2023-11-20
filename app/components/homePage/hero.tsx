import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { black_ops_one } from "@/app/fonts";
import { deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import AppBarHomePage from "@/app/components/app-bar/appBarHomePage";
import EvilChart from "@/app/components/homePage/evilChart";

export default function HeroSection() {
  return (
    <>
      <Box component="section" sx={{ bgcolor: deepPurple["A100"], p: { sm: "0", lg: "1rem" }, borderRadius: "1.75rem", width: "100%" }}>
        <AppBarHomePage></AppBarHomePage>
        <Grid container maxWidth="85rem" spacing={0} sx={{ mx: "auto", mt: "5rem", mb: "5rem", display: "flex" }}>
          <Grid xs={12} sm={6} sx={{ p: { xs: 1.5, sm: 3, lg: 5 } }}>
            <Box>
              <Typography
                component="h1"
                variant={"h1"}
                sx={{
                  fontFamily: black_ops_one.style.fontFamily,
                  fontSize: { lg: "6.5rem", md: "4rem", xs: "3rem" },
                  lineHeight: "1",
                }}
              >
                <Box>CNN</Box>
                <Box>VS</Box>
                <Box>Fox News</Box>
              </Typography>
              <Typography
                component="div"
                variant={"h2"}
                sx={{
                  fontSize: { lg: "1.25rem", xs: "1rem" },
                  fontWeight: "500",
                  lineHeight: "1.45rem",
                  mt: 5,
                  mb: 5,
                }}
              >
                <Box>Headline Fights is a bias-free zone where the crowd decides which news source is truly worse.</Box>
              </Typography>
              <Button
                sx={{ mt: 1, mr: 1, textTransform: "capitalize", fontSize: { lg: "1.25rem", xs: "1rem" } }}
                size="large"
                variant="contained"
                href="/login"
              >
                Start Rating
              </Button>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} sx={{ p: { xs: 1.5, sm: 3, lg: 5 } }}>
            <EvilChart></EvilChart>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
