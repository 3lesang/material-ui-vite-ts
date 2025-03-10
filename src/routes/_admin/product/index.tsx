import { axiosClient } from "@/axios";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { formatRelative } from "date-fns/formatRelative";
import { z } from "zod";

const QuerySchema = z.object({
  page: z.number().optional(),
  limit: z.number().optional(),
  search: z.string().optional(),
  filter: z.string().optional(),
  order: z.string().optional(),
});

export const Route = createFileRoute("/_admin/product/")({
  component: Index,
  validateSearch: zodValidator(QuerySchema),
});

function Index() {
  const navigate = useNavigate({
    from: Route.fullPath,
  });
  const { page, limit, order, search } = useSearch({
    from: "/_admin/product/",
  });

  const url = "/products";
  const params = {
    page,
    limit,
    order,
    filter: search ? `name~${search}` : "",
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: [url, page, limit, order, params.filter],
    queryFn: () => axiosClient.get("/products", { params }),
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => axiosClient.delete(`/products/${id}`),
    onSuccess() {
      refetch();
    },
  });

  const columns: GridColDef[] = [
    {
      field: "url",
      headerName: "",
      sortable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: () => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Box
            component="img"
            width={40}
            height={40}
            borderRadius={2}
            sx={{
              objectFit: "cover",
            }}
            src="https://via.placeholder.com/40"
            alt="Example"
          />
        </Box>
      ),
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 500,
      sortable: false,
      disableColumnMenu: true,
    },
    {
      field: "price",
      headerName: "Price",
      width: 120,
      sortable: false,
      disableColumnMenu: true,
      valueFormatter: (value: number) =>
        value.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
          maximumFractionDigits: 0,
        }),
    },
    {
      field: "updated_at",
      headerName: "Last Updated",
      type: "date",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      valueFormatter: (value: string) =>
        formatRelative(new Date(value), new Date()),
    },
  ];

  return (
    <Card>
      <CardHeader
        title="Products"
        subheader="List of products"
        action={
          <Button
            component={Link}
            to="/product/new"
            startIcon={<AddOutlinedIcon />}
          >
            Add new item
          </Button>
        }
      />
      <DataGrid loading={isLoading} columns={columns} rows={data?.data?.data} />
    </Card>
  );
}
