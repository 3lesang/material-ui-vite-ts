import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/file/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_admin/file/$id"!</div>
}
