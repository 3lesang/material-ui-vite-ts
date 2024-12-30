import { notify } from "@/components/ui/Toast";
import { ChevronLeft, ExpandMore } from "@mui/icons-material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid2 from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_layout/role/new")({
  component: RouteComponent,
});

function RouteComponent() {
  const handleBack = () => {
    notify("test");
  };
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <Button size="small" startIcon={<ChevronLeft />} onClick={handleBack}>
          Back
        </Button>
      </Grid2>

      <Grid2 size={12}>
        <Card>
          <CardHeader
            title="New role"
            action={<Button size="small">Create</Button>}
          />
          <CardContent>
            <Grid2 container spacing={1}>
              <Grid2 size={6}>
                <TextField label="Name" fullWidth size="small" />
              </Grid2>
              <Grid2 size={6}>
                <TextField
                  label="Description"
                  fullWidth
                  size="small"
                  multiline
                  rows={5}
                />
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>
      </Grid2>
      <Grid2 size={12}>
        <Card>
          <CardContent>
            <FormGroup>
              <Typography>User</Typography>
              <Stack direction="row" justifyContent="space-between">
                <FormControlLabel control={<Checkbox />} label="Create" />
                <FormControlLabel control={<Checkbox />} label="Read" />
                <FormControlLabel control={<Checkbox />} label="Update" />
                <FormControlLabel control={<Checkbox />} label="Delete" />
              </Stack>
              <Typography>Role</Typography>
              <Stack direction="row" justifyContent="space-between">
                <FormControlLabel control={<Checkbox />} label="Create" />
                <FormControlLabel control={<Checkbox />} label="Read" />
                <FormControlLabel control={<Checkbox />} label="Update" />
                <FormControlLabel control={<Checkbox />} label="Delete" />
              </Stack>
            </FormGroup>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  );
}
