import { axiosClient } from "@/axios";
import AlignItemsList from "@/components/ui/CustomList";
import { ROLE_COLUMN } from "@/constant/columns";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const url = "/roles";
const limit = 10;

export const Route = createFileRoute("/_admin/role/")({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [url, page, limit],
    queryFn: () => axiosClient.get(url, { params: { page, limit } }),
    retry: false,
  });

  const handleNavigate = (params: any) => {
    navigate({ to: `/role/${params?.id}` });
  };

  const listColumns = [
    {
      field: "",
    },
    {
      field: "name",
    },
    {
      field: "description",
    },
  ];

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
      {isMobile ? (
        <AlignItemsList
          columns={listColumns}
          rows={data?.data?.data}
          onItemClick={handleNavigate}
        />
      ) : (
        <DataGrid
          loading={isLoading}
          columns={ROLE_COLUMN}
          rows={data?.data?.data}
        />
      )}
    </Card>
  );
}
