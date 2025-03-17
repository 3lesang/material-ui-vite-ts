import Chip from "@mui/material/Chip";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "@tanstack/react-router";

export const USER_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    width: 200,
    disableColumnMenu: true,
    renderCell: (params) => {
      return <Link to={`/user/${params.id}`}>{params.value}</Link>;
    },
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

export const CATEGORY_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    width: 200,
    disableColumnMenu: true,
    renderCell: (params) => {
      return <Link to={`/category/${params.id}`}>{params.value}</Link>;
    },
  },
  {
    field: "slug",
    headerName: "Slug",
    sortable: false,
    width: 100,
    disableColumnMenu: true,
  },
];

export const ROLE_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    width: 300,
    disableColumnMenu: true,
    renderCell: (params) => {
      return <Link to={`/role/${params.id}`}>{params.value}</Link>;
    },
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 500,
    disableColumnMenu: true,
  },
];
