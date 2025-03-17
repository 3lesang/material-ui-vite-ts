import { axiosClient } from "@/axios";
import AlignItemsList from "@/components/AlignItemsList";
import { CATEGORY_COLUMN } from "@/constant/columns";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

const url = "/categories";
const params = {
  page: 1,
  limit: 10,
};

export const Route = createFileRoute("/_admin/category/")({
  component: RouteComponent,
});

function RouteComponent() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: [url, params.page, params.limit],
    queryFn: () => axiosClient.get(url, { params }),
    retry: false,
  });

  const handleNavigate = (params: any) => {
    navigate({ to: `/category/${params?.id}` });
  };

  const listColumns = [
    {
      field: "",
    },
    {
      field: "name",
    },
    {
      field: "email",
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Categories"
        subheader="All the categories who have access to the admin panel"
        action={
          <Button
            component={Link}
            to="/category/new"
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
          checkboxSelection
          rowSelection
          loading={isLoading}
          columns={CATEGORY_COLUMN}
          rows={data?.data?.data}
        />
      )}
      {!isMobile && <Divider />}

      <CardActions>
        <Box ml="auto" />
        {!isMobile && <Pagination count={3} shape="rounded" />}
      </CardActions>
    </Card>
  );
}
