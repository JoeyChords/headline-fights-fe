import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { deepPurple } from "@mui/material/colors";
import { indigo } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: indigo[500],
    },
    secondary: {
      main: indigo[100],
    },
    error: {
      main: red.A400,
    },
  },
});
export default theme;
