import FileList from "@/components/File";
import { AppTableProvider } from "@/context/table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/file/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppTableProvider>
      <FileList />
    </AppTableProvider>
  );
}
