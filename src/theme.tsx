import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
