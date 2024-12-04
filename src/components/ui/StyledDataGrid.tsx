import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid/DataGrid";

export const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnSeparator": {
    display: "none",
  },
});
