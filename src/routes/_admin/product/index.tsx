import { deleteProductHttp, getProductsHttp } from "@/api/product";
import { StyledDataGrid } from "@/components/ui/StyledDataGrid";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import AppBar from "@mui/material/AppBar";
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
  GridActionsCellItem,
  GridColDef,
  GridPaginationModel,
  GridRowId,
} from "@mui/x-data-grid";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { formatRelative } from "date-fns/formatRelative";
import * as React from "react";
import { useState } from "react";
import { z } from "zod";

const SearchSchema = z.object({
  page: z.number().default(1),
  limit: z.number().default(25),
  order: z.string().default("created_at desc"),
});

export const Route = createFileRoute("/_admin/product/")({
  component: Index,
  validateSearch: zodValidator(SearchSchema),
});

function BasicPopover() {
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
    <div>
      <Button
        aria-describedby={id}
        variant="text"
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
    </div>
  );
}

function Header() {
  const navigate = useNavigate();

  const handleCreateClick = () => {
    navigate({ to: "/product/create" });
  };

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
            <BasicPopover />
          </Grid>
          <Grid>
            <SearchIcon color="inherit" sx={{ display: "block" }} />
          </Grid>
          <Grid size="grow">
            <TextField
              fullWidth
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
            <Button>Delete</Button>
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
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const handleConfirmDelete = () => {
    props.onDelete?.();
    setOpenConfirmDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenConfirmDialog(false);
  };

  const handleDeleteClick = () => {
    setOpenConfirmDialog(true);
  };

  return (
    <React.Fragment>
      <GridActionsCellItem
        icon={<DeleteIcon />}
        label="Delete"
        onClick={handleDeleteClick}
      />
      <Dialog
        open={openConfirmDialog}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this row?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

function Index() {
  const navigate = useNavigate({
    from: Route.fullPath,
  });

  const { page, limit, order } = useSearch({ from: "/_admin/product/" });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", page, limit, order],
    queryFn: () =>
      getProductsHttp({
        params: { page, limit, order },
      }),
  });

  const { mutate } = useMutation({
    mutationFn: (id: number) => deleteProductHttp(id),
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
    },
    {
      field: "UpdatedAt",
      headerName: "Last Updated",
      type: "date",
      sortable: false,
      disableColumnMenu: true,
      width: 200,
      valueFormatter: (value: any) =>
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
      search: (prev) => ({ page: model.page + 1, limit: model.pageSize }),
    });
  };

  return (
    <Paper>
      <Header />
      <StyledDataGrid
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
      />
    </Paper>
  );
}
