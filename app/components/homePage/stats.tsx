import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import StatsComponent from "@/app/components/homePage/statsComponent";
import CTAButton from "@/app/components/homePage/ctaButton";

export default function Stats(props: any) {
  return (
    <>
      <Box
        component="section"
        sx={{
          bgcolor: deepPurple["A100"],
          p: { xs: "4rem 0", sm: "4rem 0", md: "5rem 0", lg: "6rem 0" },
          borderRadius: "1.75rem",
          width: "100%",
          mt: "6rem",
        }}
      >
        <Box maxWidth="35rem" sx={{ width: "100%", mx: "auto", mb: "3.5rem", p: "0 1rem" }}>
          <Typography fontSize={{ xs: "1rem" }} fontWeight={"500"} lineHeight={"1.3"}>
            <Box textAlign={"center"}>STATISTICS</Box>
          </Typography>
          <Typography variant="h3" fontSize={{ xs: "1.75rem", md: "2.3rem", lg: "3.25rem" }} fontWeight={"500"} lineHeight={"1.3"}>
            <Box textAlign={"center"} sx={{ mt: ".5rem" }}>
              Bigger Is Better
            </Box>
          </Typography>
          <Typography variant="h3" fontSize={{ xs: "1rem" }} fontWeight={"500"} lineHeight={"1.45"}>
            <Box textAlign={"center"} sx={{ mt: ".5rem" }}>
              Data is more accurate when it&apos;s large. That&apos;s why your ratings are so important.
            </Box>
          </Typography>
        </Box>
        <Grid container maxWidth="85rem" spacing={4} sx={{ mx: "auto", display: "flex", mb: "3.5rem" }}>
          <Grid xs={12} md={6} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ border: "1px solid black", display: "flex", width: "100%", borderRadius: "1.75rem", justifyContent: "center", p: "4rem 0" }}>
              <StatsComponent total={props.props.numUsers} title={"People Rated Headlines"}></StatsComponent>
            </Box>
          </Grid>
          <Grid xs={12} md={6} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ border: "1px solid black", display: "flex", width: "100%", borderRadius: "1.75rem", justifyContent: "center", p: "4rem 0" }}>
              <StatsComponent total={props.props.numPub1Ratings} title={"CNN Headlines Rated"}></StatsComponent>
            </Box>
          </Grid>
          <Grid xs={12} lg={4} sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ border: "1px solid black", display: "flex", width: "100%", borderRadius: "1.75rem", justifyContent: "center", p: "4rem 0" }}>
              <StatsComponent total={props.props.numPub2Ratings} title={"Fox News Headlines Rated"}></StatsComponent>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CTAButton cta={"Start Rating"}></CTAButton>
        </Box>
      </Box>
    </>
  );
}
