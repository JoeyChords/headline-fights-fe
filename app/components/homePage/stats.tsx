import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import StatsBox from "@/app/components/homePage/statsBox";
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
            <Box textAlign={"center"}>R&apos;s, D&apos;s, and Indy&apos;s</Box>
          </Typography>
          <Typography variant="h3" fontSize={{ xs: "1.75rem", md: "2.3rem", lg: "3.25rem" }} fontWeight={"700"} lineHeight={"1.3"}>
            <Box textAlign={"center"} sx={{ mt: ".5rem" }}>
              More Ratings,
              <br />
              Less Bias
            </Box>
          </Typography>
          <Typography variant="h3" fontSize={{ xs: "1rem" }} fontWeight={"500"} lineHeight={"1.45"}>
            <Box textAlign={"center"} sx={{ mt: ".5rem" }}>
              Headline Fights data is more accurate when it&apos;s large and diverse. All ideoligies are necessary and welcome.
            </Box>
          </Typography>
        </Box>
        <Grid container maxWidth="85rem" spacing={4} sx={{ mx: "auto", display: "flex", mb: "3.5rem", justifyContent: "center" }}>
          <Grid xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <StatsBox component={<StatsComponent total={props.props.numPub2Ratings} title={"Fox News Headlines Rated"}></StatsComponent>}></StatsBox>
          </Grid>
          <Grid xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <StatsBox component={<StatsComponent total={props.props.numPub1Ratings} title={"CNN Headlines Rated"}></StatsComponent>}></StatsBox>
          </Grid>
          <Grid xs={12} sm={6} md={4} sx={{ display: "flex", justifyContent: "center" }}>
            <StatsBox component={<StatsComponent total={props.props.numUsers} title={"People Rated Headlines"}></StatsComponent>}></StatsBox>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CTAButton cta={"Start Rating"}></CTAButton>
        </Box>
      </Box>
    </>
  );
}
