import {
  deleteManyProductHttp,
  deleteOneProductHttp,
  getProductsHttp,
} from "@/api/product";
import { useApp } from "@/contexts/app";
import { idsAtom } from "@/stores/product";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRowId,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { useDebounce } from "@uidotdev/usehooks";
import { formatRelative } from "date-fns/formatRelative";
import { useAtom } from "jotai";
import * as React from "react";
import { z } from "zod";

const SearchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(25),
  search: z.string().optional(),
  order: z.string().default("created_at desc"),
});

export const Route = createFileRoute("/_admin/product/")({
  component: Index,
  validateSearch: zodValidator(SearchSchema),
});

function Filter() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
      <Button
        aria-describedby={id}
        variant="contained"
        color="inherit"
        onClick={handleClick}
        startIcon={<FilterListIcon />}
      >
        Filter
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </Box>
  );
}

interface HeaderProps {
  onDeleteSuccess?: () => void;
}

function Header(props: HeaderProps) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate({ from: Route.fullPath });
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const { confirm } = useApp();
  const [ids] = useAtom(idsAtom);

  const { mutate, isPending } = useMutation({
    mutationFn: (ids: number[]) =>
      deleteManyProductHttp({
        ids,
      }),
    onSuccess() {
      props?.onDeleteSuccess?.();
    },
  });

  const handleCreateClick = () => {
    navigate({ to: "/product/create" });
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleDeleteManyClick = async () => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description:
        "This action cannot be undone. This will permanently delete items.",
    });
    if (confirmed) {
      mutate(ids);
    }
  };

  React.useEffect(() => {
    navigate({
      search: (prev) => ({ ...prev, search: debouncedSearchTerm }),
    });
  }, [debouncedSearchTerm]);

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: "1px solid rgba(0, 0, 0, 0.12)" }}
    >
      <Toolbar>
        <Grid container spacing={2} sx={{ alignItems: "center" }} width="100%">
          <Grid>
            <Filter />
          </Grid>
          <Grid>
            <SearchIcon color="inherit" sx={{ display: "block" }} />
          </Grid>
          <Grid size="grow">
            <TextField
              fullWidth
              onChange={handleSearch}
              placeholder="Search by email address, phone number, or user UID"
              slotProps={{
                input: {
                  disableUnderline: true,
                  sx: { fontSize: "default" },
                },
              }}
              variant="standard"
            />
          </Grid>
          <Grid>
            {ids.length > 0 && (
              <LoadingButton
                variant="contained"
                onClick={handleDeleteManyClick}
                color="error"
                loading={isPending}
              >
                Delete
              </LoadingButton>
            )}
          </Grid>
          <Grid>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateClick}
            >
              New item
            </Button>
            <Tooltip title="Reload">
              <IconButton>
                <RefreshIcon color="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

interface DeleteActionProps {
  onDelete?: () => void;
}

function DeleteAction(props: DeleteActionProps) {
  const { confirm } = useApp();
  const handleDeleteClick = async () => {
    const confirmed = await confirm({
      title: "Are you sure?",
      description:
        "This action cannot be undone. This will permanently delete the item.",
    });
    if (confirmed) {
      props?.onDelete?.();
    }
  };

  return (
    <GridActionsCellItem
      icon={<DeleteIcon />}
      label="Delete"
      onClick={handleDeleteClick}
    />
  );
}

function Index() {
  const navigate = useNavigate({
    from: Route.fullPath,
  });
  const [_, setIds] = useAtom(idsAtom);
  const { page, limit, order, search } = useSearch({
    from: "/_admin/product/",
  });

  const filter = search ? `name~${search}` : "";

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", page, limit, order, filter],
    queryFn: () =>
      getProductsHttp({
        params: { page, limit, order, filter },
      }),
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteOneProductHttp(id),
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
      field: "UpdatedAt",
      headerName: "Last Updated",
      type: "date",
      sortable: false,
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
        <DeleteAction onDelete={handleDelete(params.id)} />,
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
    setIds(ids);
  };

  return (
    <Paper>
      <Header onDeleteSuccess={refetch} />
      <DataGrid
        getRowId={(row) => row.ID}
        rows={rows}
        columns={columns}
        checkboxSelection
        loading={isLoading}
        paginationMode="server"
        rowCount={meta?.total}
        initialState={{
          pagination: { paginationModel: { page: page - 1, pageSize: limit } },
        }}
        onPaginationModelChange={handlePaginationModelChange}
        onRowSelectionModelChange={handleRowSelectionModelChange}
      />
    </Paper>
  );
}
