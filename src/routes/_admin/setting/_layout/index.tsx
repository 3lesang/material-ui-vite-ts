import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/setting/_layout/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <Card>
      <CardHeader title="Setting" />
    </Card>
  )
}
