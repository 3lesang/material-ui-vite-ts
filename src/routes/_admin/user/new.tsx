import UserForm from "@/components/form/CreateUserForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/user/new")({
  component: RouteComponent,
});

function RouteComponent() {
  return <UserForm />;
}
