import FileList from "@/components/File";
import { AppMediaProvider } from "@/context/media";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/file/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <AppMediaProvider>
      <FileList />
    </AppMediaProvider>
  );
}
