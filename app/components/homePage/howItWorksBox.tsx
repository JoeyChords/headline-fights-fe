import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { blueGrey } from "@mui/material/colors";
import { grey } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import HowItWorksComponent from "@/app/components/homePage/howItWorksComponent";
import HideSourceOutlinedIcon from "@mui/icons-material/HideSourceOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import PsychologyAltOutlinedIcon from "@mui/icons-material/PsychologyAltOutlined";
import DangerousOutlinedIcon from "@mui/icons-material/DangerousOutlined";

export default function HowItWorksBox(props: any) {
  return (
    <>
      <Box
        sx={{
          aspectRatio: "1/1",
          border: "1px solid",
          borderColor: "#000000",
          backgroundColor: "#000000",
          width: "100%",
          borderRadius: "1.75rem",
          p: "2rem",
          position: "relative",
        }}
      >
        {props.icon}
        {props.component}
      </Box>
    </>
  );
}
