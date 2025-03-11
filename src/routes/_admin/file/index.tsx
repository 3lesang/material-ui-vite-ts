import File from "@/components/File";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/file/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <File />;
}
