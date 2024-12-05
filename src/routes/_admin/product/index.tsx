import { getProducts } from "@/api/product";
import { StyledDataGrid } from "@/components/ui/StyledDataGrid";
import AddIcon from "@mui/icons-material/Add";
import AutoAwesomeMotionIcon from "@mui/icons-material/AutoAwesomeMotion";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import FilterListIcon from "@mui/icons-material/FilterList";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { GridActionsCellItem, GridColDef, GridRowId } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { formatRelative } from "date-fns/formatRelative";
import * as React from "react";

export const Route = createFileRoute("/_admin/product/")({
  component: Index,
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

function Index() {
  const navigate = useNavigate();

  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ params: { page: 1, limit: 10 } }),
  });

  const viewDetail = (id: GridRowId) => () => {
    navigate({ to: `/product/${id}` });
  };

  const rows = data?.data?.data;
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "Product Name",
      minWidth: 150,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 120,
    },
    {
      field: "category",
      headerName: "Category",
      width: 130,
    },
    {
      field: "inStock",
      headerName: "Stock Status",
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value ? "In Stock" : "Out of Stock"}
          color={params.value ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 100,
    },
    {
      field: "updated_at",
      headerName: "Last Updated",
      type: "date",
      width: 200,
      valueFormatter: (value: any) => {
        if (!value) return "";
        return formatRelative(new Date(value), new Date());
      },
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      width: 100,
    },
    {
      headerName: "Action",
      field: "actions",
      type: "actions",
      width: 100,
      getActions: (params) => [
        <GridActionsCellItem icon={<DeleteIcon />} label="Delete" />,
        <GridActionsCellItem
          icon={<AutoAwesomeMotionIcon />}
          onClick={viewDetail(params.id)}
          label="View detail"
          showInMenu
        />,
        <GridActionsCellItem
          icon={<FileCopyIcon />}
          label="Duplicate User"
          showInMenu
        />,
      ],
    },
  ];

  return (
    <Paper>
      <Header />
      <StyledDataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        loading={isLoading}
      />
    </Paper>
  );
}
