import { axiosClient } from "@/axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EmailIcon from "@mui/icons-material/Email";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid2 from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { GridColDef } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_layout/user/")({
  component: RouteComponent,
});

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    disableColumnMenu: true,
    width: 250,
  },
  {
    field: "username",
    headerName: "Username",
    sortable: false,
    disableColumnMenu: true,
    width: 120,
  },
  {
    field: "email",
    headerName: "Email",
    sortable: false,
    disableColumnMenu: true,
    width: 300,
  },
  {
    field: "status",
    headerName: "Status",
    sortable: false,
    disableColumnMenu: true,
    width: 100,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "",
    getActions(params) {
      return [
        <Link to={`/setting/user/${params?.id}`}>
          <IconButton size="small">
            <MoreVertIcon />
          </IconButton>
        </Link>,
        <IconButton size="small">
          <DeleteOutlineIcon />
        </IconButton>,
      ];
    },
  },
];

function RouteComponent() {
  const url = "/users";
  const params = {
    page: 1,
    limit: 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: [url, params.page, params.limit],
    queryFn: () => axiosClient.get(url, { params }),
  });

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <Stack alignItems="flex-end">
          <Box>
            <Button startIcon={<EmailIcon />} size="small">
              Invite new user
            </Button>
          </Box>
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <Card>
          <DataGrid
            loading={isLoading}
            columns={columns}
            rows={data?.data?.data}
            hideFooter
            rowSelection={false}
          />
        </Card>
      </Grid2>
    </Grid2>
  );
}
