import { Stack } from "@mui/material";
import Box from "@mui/material/Box";
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

export const PRODUCT_COLUMN: GridColDef[] = [
  {
    field: "url",
    headerName: "",
    sortable: false,
    disableColumnMenu: true,
    width: 100,
    renderCell: () => (
      <Stack height={1} alignItems="center" justifyContent="center">
        <Box
          component="img"
          width={30}
          height={30}
          borderRadius={1}
          sx={{
            objectFit: "cover",
          }}
          src="https://placehold.co/600x400/png"
          alt="Example"
        />
      </Stack>
    ),
  },
  {
    field: "name",
    headerName: "Name",
    width: 400,
    sortable: false,
    disableColumnMenu: true,
    renderCell: (params) => (
      <Link to="/product/$id" params={{ id: params.id.toString() }}>
        {params.value}
      </Link>
    ),
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 300,
    sortable: false,
    disableColumnMenu: true,
  },
  {
    field: "price",
    headerName: "Price",
    width: 120,
    sortable: false,
    disableColumnMenu: true,
    valueFormatter: (value: number) =>
      value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
        maximumFractionDigits: 0,
      }),
  },
  {
    field: "stock",
    headerName: "Stock",
    type: "date",
    sortable: false,
    disableColumnMenu: true,
    width: 100,
  },
];

export const CATEGORY_COLUMN: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    width: 300,
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
