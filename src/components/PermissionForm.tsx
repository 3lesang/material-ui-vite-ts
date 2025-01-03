import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";

const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 0;
  align-items: flex-start;
  & .MuiFormControlLabel-label {
    user-select: none;
  }
`;

interface FieldItemProps {
  width?: string;
  action: keyof Actions;
  label: string;
}

interface FieldCheckboxProps {
  label: string;
  toggle?: boolean;
  items?: FieldItemProps[];
  onChange?: (value: Actions) => void;
  values?: Actions;
}

interface Actions {
  all?: boolean;
  read: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
}

interface FieldHeadProps {
  items: FieldItemProps[];
}

interface ModelCheckboxProps {
  name: string;
  fields: string[];
  items: FieldItemProps[];
}

function FieldCheckbox({
  label,
  toggle,
  items,
  onChange,
  values,
}: FieldCheckboxProps) {
  const state = values || {
    all: false,
    read: false,
    create: false,
    update: false,
    delete: false,
  };

  const [actions, setActions] = useState<Actions>(state);

  const handleChange =
    (action: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      if (action == "all") {
        const state = {
          read: checked,
          create: checked,
          update: checked,
          delete: checked,
        };
        onChange?.(state);
        return setActions(state);
      }
      const state = {
        ...actions,
        [action]: checked,
      };
      onChange?.(state);
      setActions(state);
    };

  const indeterminate = Object.values(actions).some((value) => value);
  const checked = Object.values(actions).every((value) => value);

  useEffect(() => {
    onChange?.({ ...actions, all: checked });
  }, [checked]);

  return (
    <Stack direction="row">
      <Stack
        direction="row"
        width="30%"
        alignItems="center"
        sx={{ cursor: toggle ? "pointer" : "default" }}
      >
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              onChange={handleChange("all")}
              checked={checked}
              indeterminate={indeterminate && !checked}
            />
          }
          sx={{ margin: 0 }}
          label={
            <Typography variant={toggle ? "button" : "caption"}>
              {label}
            </Typography>
          }
        />
      </Stack>
      {items?.map((item, index) => (
        <Box key={index} width={item.width}>
          <Checkbox
            size="small"
            onChange={handleChange(item.action)}
            checked={actions[item.action]}
          />
        </Box>
      ))}
    </Stack>
  );
}

function FieldHead({ items }: FieldHeadProps) {
  return (
    <Stack direction="row">
      <Box width="30%" />
      {items.map((item, index) => (
        <Box width={item.width} key={index}>
          <StyledFormControlLabel
            control={<Checkbox size="small" />}
            label={item.label}
            labelPlacement="top"
          />
        </Box>
      ))}
    </Stack>
  );
}

function ModelCheckbox({ name, fields, items }: ModelCheckboxProps) {
  const values = {
    all: false,
    read: true,
    create: false,
    update: true,
    delete: false,
  };

  return (
    <Box>
      <Divider />
      <Box bgcolor="#eceff1">
        <FieldCheckbox
          label={name}
          toggle
          items={items}
          onChange={(value) => {
            console.log(value);
          }}
          values={values}
        />
      </Box>
      <Box>
        {fields.map((field) => (
          <>
            <Divider />
            <FieldCheckbox
              key={field}
              label={field}
              items={items.filter((item) => item.width)}
            />
          </>
        ))}
      </Box>
    </Box>
  );
}

function PermissionForm() {
  const items: FieldItemProps[] = [
    {
      width: "20%",
      action: "read",
      label: "Read",
    },
    {
      width: "20%",
      action: "create",
      label: "Create",
    },
    {
      width: "20%",
      action: "update",
      label: "Update",
    },
    {
      width: "",
      action: "delete",
      label: "Delete",
    },
  ];

  return (
    <Card>
      <FieldHead items={items} />
      <ModelCheckbox
        name="User"
        fields={["Name", "Email", "Username"]}
        items={items}
      />
      <ModelCheckbox
        name="Role"
        fields={["Name", "Description"]}
        items={items}
      />
    </Card>
  );
}

export default PermissionForm;
