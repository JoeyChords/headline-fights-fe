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
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";

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
        <Box maxWidth="35rem" sx={{ width: "100%", mx: "auto", mb: "3.5rem" }}>
          <Typography variant="h3" color={"#ffffff"} fontSize={{ xs: "1.75rem", md: "2.3rem", lg: "3.25rem" }} fontWeight={"500"} lineHeight={"1.3"}>
            <Box textAlign={"center"}>How It Works</Box>
          </Typography>
          <Typography variant="h3" color={"#ffffff"} fontSize={{ xs: "1.25rem" }} fontWeight={"500"} lineHeight={"1.45"}>
            <Box textAlign={"center"}>Placeholder</Box>
          </Typography>
        </Box>
        <Grid container maxWidth="85rem" spacing={4} sx={{ mx: "auto", mb: "3.5rem" }}>
          <Grid xs={12} sm={6} md={3} sx={{}}>
            <HowItWorksBox
              icon={<HideSourceOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3rem" }}></HideSourceOutlinedIcon>}
              component={<HowItWorksComponent total={10} title={"1."} explanation={"We remove the source of the headline "}></HowItWorksComponent>}
            ></HowItWorksBox>
          </Grid>
          <Grid xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }}>
            <HowItWorksBox
              icon={<ThumbUpOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3rem" }}></ThumbUpOutlinedIcon>}
              component={<HowItWorksComponent total={10} title={"2."} explanation={"You rate it"}></HowItWorksComponent>}
            ></HowItWorksBox>
          </Grid>
          <Grid xs={12} sm={6} md={3} sx={{ display: "flex", justifyContent: "center" }}>
            <HowItWorksBox
              icon={<DangerousOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3.25rem" }}></DangerousOutlinedIcon>}
              component={
                <HowItWorksComponent
                  total={10}
                  title={"3."}
                  explanation={"we find out which news organization is more evil through crowdsourcing opinions"}
                ></HowItWorksComponent>
              }
            ></HowItWorksBox>
          </Grid>
          <Grid xs={12} sm={6} md={3} sx={{}}>
            <HowItWorksBox
              icon={<PsychologyAltOutlinedIcon sx={{ color: deepPurple["A100"], fontSize: "3.75rem" }}></PsychologyAltOutlinedIcon>}
              component={
                <HowItWorksComponent
                  total={10}
                  title={"4."}
                  explanation={
                    "you find out what you really think when your biases are removed, and you find out how you compare to the rest of the crowd "
                  }
                ></HowItWorksComponent>
              }
            ></HowItWorksBox>
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
