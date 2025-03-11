import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/category/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/category/"!</div>
}
