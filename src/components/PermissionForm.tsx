import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import Typography from "@mui/material/Typography";

const StyledFormControlLabel = styled(FormControlLabel)`
  margin: 0;
  & .MuiFormControlLabel-label {
    user-select: none;
  }
`;

interface FieldCheckboxProps {
  label: string;
}

function FieldCheckbox({ label }: FieldCheckboxProps) {
  return (
    <Stack direction="row">
      <Box width="20%">
        <Typography>{label}</Typography>
      </Box>
      <Stack direction="row" width="80%" justifyContent="space-between">
        <Stack width="38px" justifyContent="center" alignItems="center">
          <Box>
            <Checkbox size="small" />
          </Box>
        </Stack>
        <Stack width="47.47px" justifyContent="center" alignItems="center">
          <Box>
            <Checkbox size="small" />
          </Box>
        </Stack>

        <Stack width="51.69px" justifyContent="center" alignItems="center">
          <Box>
            <Checkbox size="small" />
          </Box>
        </Stack>

        <Stack width="45.94px" justifyContent="center" alignItems="center">
          <Box>
            <Checkbox size="small" />
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
}

function PermissionForm() {
  return (
    <Card>
      <CardContent>
        <Stack direction="row">
          <Box width="20%">
            <Typography variant="h6">User</Typography>
          </Box>
          <Stack direction="row" width="80%" justifyContent="space-between">
            <StyledFormControlLabel
              control={<Checkbox size="small" />}
              label="Read"
              labelPlacement="top"
            />
            <StyledFormControlLabel
              control={<Checkbox size="small" />}
              label="Create"
              labelPlacement="top"
            />
            <StyledFormControlLabel
              control={<Checkbox size="small" />}
              label="Update"
              labelPlacement="top"
            />
            <StyledFormControlLabel
              control={<Checkbox size="small" />}
              label="Delete"
              labelPlacement="top"
            />
          </Stack>
        </Stack>
        <FieldCheckbox label="Name" />
        <FieldCheckbox label="Username" />
        <FieldCheckbox label="Email" />
        <FieldCheckbox label="Active" />
      </CardContent>
    </Card>
  );
}

export default PermissionForm;
