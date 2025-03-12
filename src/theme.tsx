import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { createTheme } from "@mui/material/styles";
import type {} from "@mui/x-data-grid/themeAugmentation";

const theme = createTheme({
  cssVariables: true,
  components: {
    MuiButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiChip: {
      defaultProps: {
        size: "small",
      },
    },
    MuiIconButton: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSelect: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCheckbox: {
      defaultProps: {
        size: "small",
      },
    },
    MuiTable: {
      defaultProps: {
        size: "small",
      },
    },
    MuiSwitch: {
      defaultProps: {
        size: "small",
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: {
          variant: "h6",
        },
        subheaderTypographyProps: {
          variant: "caption",
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        color: "inherit",
      },
    },
    MuiToolbar: {
      defaultProps: {
        variant: "dense",
      },
    },
    MuiDataGrid: {
      styleOverrides: {
        root: {
          border: 0,
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
        },
      },
      defaultProps: {
        rowHeight: 40,
        columnHeaderHeight: 40,
        hideFooter: true,
        rowSelection: false,
        // checkboxSelection: true,
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&:last-child td": {
            border: 0,
          },
        },
      },
    },
    MuiPagination: {
      defaultProps: {
        size: "small",
      },
    },
  },
  typography: {
    button: {
      textTransform: "none",
    },
  },
  palette: {
    background: {
      default: "#F9F9FA",
    },
  },
});

export default theme;
