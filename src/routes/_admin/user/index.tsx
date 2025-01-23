import { axiosClient } from "@/axios";
import { USER_COLUMN } from "@/constant/columns";
import EmailIcon from "@mui/icons-material/Email";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid2 from "@mui/material/Grid2";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const url = "/users";
const params = {
  page: 1,
  limit: 10,
};

export const Route = createFileRoute("/_admin/user/")({
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
        <Button startIcon={<EmailIcon />}>
          Invite new user
        </Button>
      </Box>
      <Grid2 size={12}>
        <DataGrid
          loading={isLoading}
          columns={USER_COLUMN}
          rows={data?.data?.data}
          rowSelection={false}
        />
      </Grid2>
    </Grid2>
  );
}
