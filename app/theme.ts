import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { deepPurple } from "@mui/material/colors";
import { grey } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "Roboto", '"Helvetica Neue"', "Arial", "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"'].join(
      ","
    ),
  },
  palette: {
    primary: {
      main: "#000000",
    },
    secondary: {
      main: deepPurple["A100"],
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;
