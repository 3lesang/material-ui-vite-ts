import { axiosClient } from "@/axios";
import AlignItemsList from "@/components/AlignItemsList";
import { CATEGORY_COLUMN } from "@/constant/columns";
import { AppTableProvider, useTable } from "@/context/table";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import LoadingButton from "@mui/lab/LoadingButton";
import { Stack, useMediaQuery, useTheme } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

const url = "/categories";
const limit = 10;

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

export const Route = createFileRoute("/_admin/category/")({
  component: RouteComponent,
});

function PageList() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const { selected, setName } = useTable();

  const { data, isLoading, refetch } = useQuery({
    queryKey: [url, page, limit],
    queryFn: () => axiosClient.get(url, { params: { page, limit } }),
    retry: false,
  });

  const { mutate: deleteByIds } = useMutation({
    mutationFn: (ids: string[]) => axiosClient.delete(url, { data: { ids } }),
    onSuccess: () => {
      refetch();
    },
  });

  const handleNavigate = (params: any) => {
    navigate({ to: `/category/${params?.id}` });
  };

  const handleDelete = () => {
    deleteByIds(selected);
  };

  return (
    <Card>
      <CardHeader
        title="Categories"
        subheader="All the categories who have access to the admin panel"
        action={
          <Stack direction="row" spacing={1}>
            {selected.length > 0 && (
              <LoadingButton color="error" size="small" onClick={handleDelete}>
                Delete
              </LoadingButton>
            )}
            <Button
              component={Link}
              to="/category/new"
              startIcon={<AddOutlinedIcon />}
            >
              Add new item
            </Button>
          </Stack>
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
          columns={CATEGORY_COLUMN}
          rows={data?.data?.data}
          onRowSelectionModelChange={(newRowSelectionModel) => {
            setName(newRowSelectionModel as string[]);
          }}
        />
      )}
    </Card>
  );
}

function RouteComponent() {
  return (
    <AppTableProvider>
      <PageList />
    </AppTableProvider>
  );
}
