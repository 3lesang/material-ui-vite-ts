import { axiosClient } from "@/axios";
import AlignItemsList from "@/components/ui/CustomList";
import { USER_COLUMN } from "@/constant/columns";
import EmailIcon from "@mui/icons-material/Email";
import { Card, CardHeader, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

const url = "/users";
const params = {
  page: 1,
  limit: 10,
};

export const Route = createFileRoute("/_admin/user/")({
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
    navigate({ to: `/user/${params?.id}` });
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
        title="Users"
        subheader="All the users who have access to the admin panel"
        action={
          <Button startIcon={<EmailIcon />} component={Link} to="/user/new">
            Invite new user
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
          columns={USER_COLUMN}
          rows={data?.data?.data}
        />
      )}
    </Card>
  );
}
