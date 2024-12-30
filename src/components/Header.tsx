import { deleteManyProductHttp } from "@/api/product";
import FilterAction from "@/components/FilterAction";
import { useApp } from "@/context/app";
import { idsAtom } from "@/store/product";
import AddIcon from "@mui/icons-material/Add";
import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";
import LoadingButton from "@mui/lab/LoadingButton";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid2";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { useDebounce } from "@uidotdev/usehooks";
import { useAtom } from "jotai";
import * as React from "react";

interface HeaderProps {
  onDeleteSuccess?: () => void;
}

function Header(props: HeaderProps) {
  const [searchTerm, setSearchTerm] = React.useState<string | undefined>();

  const navigate = useNavigate({ from: "/product" });
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
    if (debouncedSearchTerm != undefined) {
      navigate({
        search: (prev) => {
          const { search, ...rest } = prev;
          return debouncedSearchTerm
            ? { ...prev, search: debouncedSearchTerm }
            : rest;
        },
      });
    }
  }, [debouncedSearchTerm]);

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar variant="dense" disableGutters>
        <Grid container spacing={1} sx={{ alignItems: "center" }} width="100%">
          <Grid>
            <FilterAction />
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
                size="small"
              >
                Delete
              </LoadingButton>
            )}
          </Grid>
          <Grid>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              size="small"
              onClick={handleCreateClick}
            >
              New item
            </Button>
            <Tooltip title="Reload">
              <IconButton size="small">
                <RefreshIcon color="inherit" />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
