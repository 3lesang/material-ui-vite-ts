import { axiosClient } from "@/axios";
import { ROLE_COLUMN } from "@/constant/columns";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

const url = "/roles";
const params = {
  page: 1,
  limit: 10,
};

export const Route = createFileRoute("/_admin/role/")({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [url, params.page, params.limit],
    queryFn: () => axiosClient.get(url, { params }),
    retry: false,
  });

  const handleNavigate = (params: any) => {
    navigate({ to: `/role/${params?.id}` });
  };

  return (
    <Card>
      <CardHeader
        title="Roles"
        subheader="List of roles"
        action={
          <Button
            component={Link}
            to="/role/new"
            startIcon={<AddOutlinedIcon />}
          >
            Add new item
          </Button>
        }
      />
      <DataGrid
        loading={isLoading}
        columns={ROLE_COLUMN}
        rows={data?.data?.data}
        onCellClick={handleNavigate}
      />
    </Card>
  );
}
