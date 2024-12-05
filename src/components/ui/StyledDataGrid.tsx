import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

export const StyledDataGrid = styled(DataGrid)({
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
});
