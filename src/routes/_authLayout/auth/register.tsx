import RegisterForm from "@/components/form/RegisterForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout/auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterForm />;
}
