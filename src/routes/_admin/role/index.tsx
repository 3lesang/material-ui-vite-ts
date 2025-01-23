import { axiosClient } from "@/axios";
import { ROLE_COLUMN } from "@/constant/columns";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

const url = "/roles";
const params = {
  page: 1,
  limit: 10,
};

export const Route = createFileRoute("/_admin/role/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data, isLoading } = useQuery({
    queryKey: [url, params.page, params.limit],
    queryFn: () => axiosClient.get(url, { params }),
    retry: false,
  });

  return (
    <Grid2 container spacing={1}>
      <Box ml="auto" px={1} pt={1}>
        <Button
          component={Link}
          to="/setting/role/new"
          startIcon={<AddOutlinedIcon />}
        >
          Add new item
        </Button>
      </Box>
      <Grid2 size={12}>
        <DataGrid
          loading={isLoading}
          columns={ROLE_COLUMN}
          rows={data?.data?.data}
        />
      </Grid2>
    </Grid2>
  );
}
