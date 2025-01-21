import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import { useNavigate, useSearch } from "@tanstack/react-router";
import * as React from "react";

function Filter() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const navigate = useNavigate({ from: "/product" });
  const { order } = useSearch({
    from: "/_admin/product/",
  });

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (event: SelectChangeEvent) => {
    navigate({
      search: (prev) => ({
        ...prev,
        order: event.target.value,
      }),
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box>
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
        sx={{}}
      >
        <Box
          sx={{
            p: 2,
            width: 300,
          }}
        >
          <Stack spacing={1}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-select-small-label">Last Updated</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={order}
                label="Last Updated"
                onChange={handleChange}
              >
                <MenuItem value="created_at desc">Lasted</MenuItem>
                <MenuItem value="created_at asc">Oldest</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-select-small-label">Price</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={order}
                label="Price"
                onChange={handleChange}
              >
                <MenuItem value="created_at desc">Latest</MenuItem>
                <MenuItem value="created_at asc">Oldest</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </Popover>
    </Box>
  );
}

export default Filter;
