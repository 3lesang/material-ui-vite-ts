import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import React from "react";

export interface MultipleSelectProps {
  options: { value: any; label: string }[];
  value?: any[];
  onChange: (values: any[]) => void;
  label?: string;
}

const MultipleSelect: React.FC<MultipleSelectProps> = ({
  options,
  value = [],
  onChange,
  label = "Select",
}) => {
  const handleSelectionChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value as any[];
    onChange(value);
  };

  return (
    <FormControl fullWidth size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        multiple
        value={value}
        onChange={handleSelectionChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={
                  options.find((option) => option.value === value)?.label ||
                  value
                }
                size="small"
              />
            ))}
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultipleSelect;
