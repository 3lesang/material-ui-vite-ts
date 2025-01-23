import { CardHeader } from '@mui/material'
import Card from '@mui/material/Card'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card>
      <CardHeader title="Profile" />
    </Card>
  )
}
