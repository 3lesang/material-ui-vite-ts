import Chip from "@mui/material/Chip";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Link } from "@tanstack/react-router";
import { format } from "date-fns";

export const USER_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    width: 200,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <Link to="/user/$id" params={{ id: params.id.toString() }}>
          {params.value}
        </Link>
      );
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
    width: 250,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <Link to="/category/$id" params={{ id: params.id.toString() }}>
          {params.value}
        </Link>
      );
    },
  },
  {
    field: "slug",
    headerName: "Slug",
    sortable: false,
    width: 400,
    disableColumnMenu: true,
  },
  {
    field: "created_at",
    headerName: "Created At",
    sortable: false,
    width: 300,
    disableColumnMenu: true,
    renderCell: (params) => format(new Date(params.value), "HH:mm dd MMM yyyy"),
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
      return (
        <Link to="/role/$id" params={{ id: params.id.toString() }}>
          {params.value}
        </Link>
      );
    },
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    width: 680,
    disableColumnMenu: true,
  },
];
