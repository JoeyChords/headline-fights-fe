import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import HowItWorksComponent from "@/app/components/homePage/howItWorksComponent";
import HowItWorksBox from "@/app/components/homePage/howItWorksBox";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import CTAButton from "@/app/components/homePage/ctaButton";
import CalculateOutlinedIcon from "@mui/icons-material/CalculateOutlined";

export default function HowItWorks(props: any) {
  return (
    <>
      <Box
        component="section"
        sx={{
          bgcolor: blueGrey[900],
          p: { xs: "4rem 0", sm: "4rem 0", md: "5rem 0", lg: "6rem 0" },
          borderRadius: "1.75rem",
          width: "100%",
          mt: "6rem",
        }}
      >
        <Box maxWidth="35rem" sx={{ width: "100%", mx: "auto", mb: "3.5rem", p: "0 1rem" }}>
          <Typography variant="h3" color={"#ffffff"} fontSize={{ xs: "1.75rem", md: "2.3rem", lg: "3.25rem" }} fontWeight={"700"} lineHeight={"1.3"}>
            <Box textAlign={"center"}>How Rating Works</Box>
          </Typography>
          <Typography variant="h3" color={"#ffffff"} fontSize={{ xs: "1.25rem" }} fontWeight={"500"} lineHeight={"1.45"}>
            <Box textAlign={"center"} sx={{ mt: ".5rem" }}>
              Recognizing Bias in the Media Becomes a Thoughtful Game
            </Box>
          </Typography>
        </Box>
        <Grid container maxWidth="85rem" spacing={4} sx={{ mx: "auto", mb: "3.5rem", justifyContent: "center" }}>
          <Grid xs={12} sm={6} md={4} lg={3}>
            <HowItWorksBox
              icon={<HideSourceOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3rem" }}></HideSourceOutlinedIcon>}
              component={
                <HowItWorksComponent
                  total={10}
                  title={"1."}
                  explanation={"We show you a headline and accompanying image without revealing its source."}
                ></HowItWorksComponent>
              }
            ></HowItWorksBox>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
            <HowItWorksBox
              icon={<ThumbUpOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3rem" }}></ThumbUpOutlinedIcon>}
              component={
                <HowItWorksComponent
                  total={10}
                  title={"2."}
                  explanation={"You rate the headline for known media bias types, then guess if it's from Fox News or CNN."}
                ></HowItWorksComponent>
              }
            ></HowItWorksBox>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} sx={{ display: "flex", justifyContent: "center" }}>
            <HowItWorksBox
              icon={<CalculateOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3.8rem" }}></CalculateOutlinedIcon>}
              component={
                <HowItWorksComponent
                  total={10}
                  title={"3."}
                  explanation={"We tell you if you're right, then calculate your ratings both separately and along with everyone else's."}
                ></HowItWorksComponent>
              }
            ></HowItWorksBox>
          </Grid>
          <Grid xs={12} sm={6} md={4} lg={3} sx={{}}>
            <HowItWorksBox
              icon={<PsychologyAltOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3.75rem" }}></PsychologyAltOutlinedIcon>}
              component={
                <HowItWorksComponent
                  total={10}
                  title={"4."}
                  explanation={"You see how you rate each publication for bias, then compare your results to the crowd's ratings."}
                ></HowItWorksComponent>
              }
            ></HowItWorksBox>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <CTAButton cta={"Start Rating"}></CTAButton>
        </Box>
      </Box>
    </>
  );
}
