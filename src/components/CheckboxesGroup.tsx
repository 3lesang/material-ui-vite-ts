import { FormLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import * as React from "react";

interface GroupProps {
  label?: string;
}

export default function CheckboxesGroup({ label }: GroupProps) {
  const [state, setState] = React.useState({
    isRead: false,
    isCreate: true,
    isUpdate: false,
    isDelete: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { isRead, isCreate, isUpdate, isDelete } = state;

  return (
    <FormControl fullWidth component="fieldset" variant="standard">
      <FormGroup
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel
          sx={{
            width: "5%",
          }}
        >
          {label}
        </FormLabel>
        <FormControlLabel
          control={
            <Checkbox checked={isRead} onChange={handleChange} name="isRead" />
          }
          label=""
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isCreate}
              onChange={handleChange}
              name="isCreate"
            />
          }
          label=""
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isUpdate}
              onChange={handleChange}
              name="isUpdate"
            />
          }
          label=""
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={isDelete}
              onChange={handleChange}
              name="isDelete"
            />
          }
          label=""
        />
      </FormGroup>
    </FormControl>
  );
}
