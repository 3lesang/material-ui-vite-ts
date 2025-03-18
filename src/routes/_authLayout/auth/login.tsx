import LoginForm from "@/components/LoginForm";
import { USER_LOCAL_KEY } from "@/constant/key";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authLayout/auth/login")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const user = localStorage.getItem(USER_LOCAL_KEY);
    if (user) {
      throw redirect({
        to: "/",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function RouteComponent() {
  return <LoginForm />;
}
