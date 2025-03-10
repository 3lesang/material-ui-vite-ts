import Media from "@/components/Media";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/media/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Media />;
}
