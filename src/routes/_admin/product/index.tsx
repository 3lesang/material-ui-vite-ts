import { axiosClient } from "@/axios";
import { PRODUCT_COLUMN } from "@/constant/columns";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  Link,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { z } from "zod";

const QuerySchema = z.object({
  page: z.number().optional(),
});

const url = "/products";
const limit = 10;

export const Route = createFileRoute("/_admin/product/")({
  component: Index,
  validateSearch: zodValidator(QuerySchema),
});

function Index() {
  const navigate = useNavigate({
    from: Route.fullPath,
  });

  const { page } = useSearch({
    from: "/_admin/product/",
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: [url, page, limit],
    queryFn: () => axiosClient.get("/products", { params: { page, limit } }),
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => axiosClient.delete(`/products/${id}`),
    onSuccess() {
      refetch();
    },
  });

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
      <DataGrid
        loading={isLoading}
        columns={PRODUCT_COLUMN}
        rows={data?.data?.data}
      />
    </Card>
  );
}
