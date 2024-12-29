import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_setting/user/")({
  component: RouteComponent,
});

const data = [
  {
    id: "1",
    name: "Alice Johnson",
    username: "alicej",
    email: "alice.johnson@example.com",
    status: "active",
  },
  {
    id: "2",
    name: "Bob Smith",
    username: "bobsmith",
    email: "bob.smith@example.com",
    status: "inactive",
  },
  {
    id: "3",
    name: "Carol Williams",
    username: "carolw",
    email: "carol.williams@example.com",
    status: "active",
  },
  {
    id: "4",
    name: "David Brown",
    username: "davidb",
    email: "david.brown@example.com",
    status: "inactive",
  },
  {
    id: "5",
    name: "Eve Davis",
    username: "eved",
    email: "eve.davis@example.com",
    status: "active",
  },
];

function RouteComponent() {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "username",
      headerName: "Username",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      getActions(params) {
        return [
          <Link to={`/setting/user/${params?.id}`}>
            <IconButton size="small">
              <EditOutlinedIcon />
            </IconButton>
          </Link>,
          <IconButton size="small">
            <DeleteOutlineIcon />
          </IconButton>,
        ];
      },
    },
  ];
  return (
    <Card>
      <CardHeader title="User" />
      <DataGrid
        columns={columns}
        rows={data}
        hideFooter
        rowSelection={false}
        checkboxSelection
      />
    </Card>
  );
}
