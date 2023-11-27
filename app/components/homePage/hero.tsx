import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { black_ops_one } from "@/app/fonts";
import { deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import AppBarHomePage from "@/app/components/app-bar/appBarHomePage";
import EvilChart from "@/app/components/homePage/evilChart";
import CTAButton from "@/app/components/homePage/ctaButton";

export default function HeroSection() {
  return (
    <>
      <Box component="section" sx={{ bgcolor: deepPurple["A100"], p: { sm: "0", lg: "1rem" }, borderRadius: "1.75rem", width: "100%" }}>
        <AppBarHomePage></AppBarHomePage>
        <Grid container maxWidth="85rem" spacing={0} sx={{ mx: "auto", mt: "5rem", mb: "5rem", display: "flex" }}>
          <Grid xs={12} sm={6} sx={{ p: { xs: "1.25rem", sm: 3, lg: 5 } }}>
            <Box sx={{}}>
              <Typography
                component="h1"
                variant={"h1"}
                sx={{
                  fontFamily: black_ops_one.style.fontFamily,
                  fontSize: { xl: "6.5rem", lg: "5.3rem", md: "4rem", xs: "3rem" },
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
                <Box>Headline Fights is a bias-free rating system that lets the crowd decide which news source is truly worse.</Box>
              </Typography>
              <Box sx={{ textAlign: { xs: "center", sm: "left" }, mb: { xs: "4rem", sm: 0 } }}>
                <CTAButton cta={"Start Rating"}></CTAButton>
              </Box>
            </Box>
          </Grid>
          <Grid xs={12} sm={6} sx={{ display: "flex", flexDirection: "column", p: { xs: 1.5, sm: 3, lg: 5 } }}>
            <EvilChart></EvilChart>
            <Box
              sx={{
                textAlign: { xs: "center", sm: "left" },
                mb: { xs: "2rem", sm: 0 },
                mt: { xs: "2rem", sm: 0 },
                display: { xs: "block", sm: "none" },
              }}
            >
              <CTAButton cta={"Start Rating"}></CTAButton>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
