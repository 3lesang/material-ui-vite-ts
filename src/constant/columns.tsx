import Chip from "@mui/material/Chip";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

export const USER_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    disableColumnMenu: true,
    width: 500,
  },
  {
    field: "username",
    headerName: "Username",
    sortable: false,
    disableColumnMenu: true,
    width: 200,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    disableColumnMenu: true,
    width: 500,
  },
  {
    field: "active",
    headerName: "Status",
    sortable: false,
    disableColumnMenu: true,
    width: 150,
    renderCell: (params: GridRenderCellParams) => {
      const status = params.value ? "Active" : "Inactive";
      return <Chip label={status} />;
    },
  },
];

export const ROLE_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    disableColumnMenu: true,
    width: 500,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    disableColumnMenu: true,
    width: 800,
  },
];
