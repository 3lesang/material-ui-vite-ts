import { getProducts } from "@/api/product";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: "id",
    headerName: "ID",
    width: 90,
    resizable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    resizable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    resizable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "age",
    headerName: "Age",
    width: 110,
    resizable: false,
    disableColumnMenu: true,
    sortable: false,
  },
  {
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    resizable: false,
    disableColumnMenu: true,
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ""} ${row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 14 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 31 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 31 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 11 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export const Route = createFileRoute("/_layout/product/")({
  component: Index,
});

function Index() {
  const { data } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({ params: { page: 1, limit: 2 } }),
  });

  console.log(data);
  return (
    <Paper sx={{ maxWidth: 936, margin: "auto", overflow: "hidden" }}>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar>
          <Grid
            container
            spacing={2}
            sx={{ alignItems: "center" }}
            width="100%"
          >
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
              <Button variant="contained" sx={{ mr: 1 }}>
                Add user
              </Button>
              <Tooltip title="Reload">
                <IconButton>
                  <RefreshIcon color="inherit" sx={{ display: "block" }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <TableContainer component={Paper}>
        <DataGrid
          rows={rows}
          columns={columns}
          sx={{
            "& .MuiDataGrid-columnSeparator": {
              display: "none",
            },
          }}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </TableContainer>
    </Paper>
  );
}
