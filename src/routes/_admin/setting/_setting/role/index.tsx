import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { IconButton } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_setting/role/")({
  component: RouteComponent,
});

const data = [
  {
    id: "1",
    name: "Author",
    description: "Authors can manage the content they have created.",
  },
  {
    id: "2",
    name: "Editor",
    description:
      "Editors can manage and publish contents including those of other users.",
  },
  {
    id: "3",
    name: "Super admin",
    description:
      "Super Admins can access and manage all features and settings.",
  },
];

function RouteComponent() {
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Name",
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "description",
      headerName: "Description",
      sortable: false,
      disableColumnMenu: true,
      flex: 1,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "",
      getActions(params) {
        return [
          <Link to={`/setting/role/${params?.id}`}>
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
      <CardHeader title="Role" />
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
