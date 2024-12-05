import Content from '@/components/Content'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_admin/contact')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Content />
}
