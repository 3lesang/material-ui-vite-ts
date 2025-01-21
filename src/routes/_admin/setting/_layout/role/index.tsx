import { axiosClient } from "@/axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
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

export const Route = createFileRoute("/_admin/setting/_layout/role/")({
  component: RouteComponent,
});

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    sortable: false,
    disableColumnMenu: true,
    width: 200,
  },
  {
    field: "description",
    headerName: "Description",
    sortable: false,
    disableColumnMenu: true,
    width: 580,
  },
  {
    field: "actions",
    type: "actions",
    headerName: "",
    getActions(params) {
      return [
        <Link to={`/setting/role/${params?.id}`}>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </Link>,
        <IconButton>
          <DeleteOutlineIcon />
        </IconButton>,
      ];
    },
  },
];

function RouteComponent() {
  const url = "/roles";
  const params = {
    page: 1,
    limit: 10,
  };

  const { data, isLoading } = useQuery({
    queryKey: [url, params.page, params.limit],
    queryFn: () => axiosClient.get(url, { params }),
    retry: false,
  });

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <Stack alignItems="flex-end">
          <Box>
            <Button
              component={Link}
              to="/setting/role/new"
              startIcon={<AddOutlinedIcon />}
              variant="contained"
              disableElevation
            >
              Add new item
            </Button>
          </Box>
        </Stack>
      </Grid2>
      <Grid2 size={12}>
        <Card>
          <DataGrid
            columnHeaderHeight={40}
            rowHeight={40}
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
