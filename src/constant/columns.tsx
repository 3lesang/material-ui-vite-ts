import Chip from "@mui/material/Chip";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

export const USER_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    width: 200,
    disableColumnMenu: true,
  },
  {
    field: "username",
    headerName: "Username",
    sortable: false,
    width: 100,
    disableColumnMenu: true,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    width: 400,
    disableColumnMenu: true,
  },
  {
    field: "active",
    headerName: "Status",
    sortable: false,
    disableColumnMenu: true,
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
    width: 300,
    disableColumnMenu: true,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 500,
    disableColumnMenu: true,
  },
];
