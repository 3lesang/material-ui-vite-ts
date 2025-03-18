import MiniDrawer from "@/components/Layout";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return <MiniDrawer />;
}
