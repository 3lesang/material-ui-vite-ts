import Accordion from '@mui/material/Accordion'
import AccordionDetails from '@mui/material/AccordionDetails'
import AccordionSummary from '@mui/material/AccordionSummary'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import Grid2 from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/setting/_layout/role/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={12}>
        <Card>
          <CardHeader
            title="Super Admin"
            subheader="Super Admins can access and manage all features and settings."
            action={<Button>Save</Button>}
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
              <Accordion>
                <AccordionSummary>
                  <Typography component="span">User</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack direction="row" justifyContent="space-between">
                    <FormControlLabel control={<Checkbox />} label="Create" />
                    <FormControlLabel control={<Checkbox />} label="Read" />
                    <FormControlLabel control={<Checkbox />} label="Update" />
                    <FormControlLabel control={<Checkbox />} label="Delete" />
                  </Stack>
                </AccordionDetails>
              </Accordion>
            </FormGroup>
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  )
}
