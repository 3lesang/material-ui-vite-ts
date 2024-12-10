import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  cssVariables: true,
  components: {
    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
        },
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
});

export default theme;
