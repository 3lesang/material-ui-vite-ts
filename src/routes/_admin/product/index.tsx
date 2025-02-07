import { axiosClient } from "@/axios";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRowId,
  GridRowSelectionModel,
  GridSortModel,
} from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { formatRelative } from "date-fns/formatRelative";
import { z } from "zod";

const QuerySchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(25),
  search: z.string().optional(),
  filter: z.string().optional(),
  order: z.string().default("created_at desc"),
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

  const handleView = (id: GridRowId) => () => {
    navigate({ to: `/product/${id}` });
  };

  const handleDelete = (id: GridRowId) => () => {
    mutate(Number(id));
  };

  const rows = data?.data?.data;
  const meta = data?.data?.meta;

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
      sortable: true,
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
      sortable: true,
      disableColumnMenu: true,
      width: 200,
      valueFormatter: (value: string) =>
        formatRelative(new Date(value), new Date()),
    },
    {
      headerName: "Action",
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          onClick={handleView(params.id)}
          label="Edit"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon />}
          label="Duplicate"
          showInMenu
        />,
      ],
    },
  ];

  const handlePaginationModelChange = (model: GridPaginationModel) => {
    navigate({
      search: (prev) => ({
        ...prev,
        page: model.page + 1,
        limit: model.pageSize,
      }),
    });
  };

  const handleRowSelectionModelChange = (model: GridRowSelectionModel) => {
    const ids = Array.from(model).map(Number);
  };
  const handleSortModelChange = (sortModel: GridSortModel) => {
    console.log(sortModel);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <DataGrid
          rows={rows}
          columns={columns}
          checkboxSelection
          loading={isLoading}
          paginationMode="server"
          rowCount={meta?.total}
          initialState={{
            pagination: {
              paginationModel: { page: page - 1, pageSize: limit },
            },
          }}
          onPaginationModelChange={handlePaginationModelChange}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          sortingMode="server"
          onSortModelChange={handleSortModelChange}
        />
      </TableContainer>
    </Box>
  );
}
