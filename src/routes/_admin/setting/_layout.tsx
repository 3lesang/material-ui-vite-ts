import AppList, { AppListItemProps } from "@/components/ui/AppList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Grid2 from "@mui/material/Grid2";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_admin/setting/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const items: AppListItemProps[] = [
    {
      title: "User & Role",
      type: "group",
    },
    {
      title: "User",
      to: "/setting/user",
      icon: <AccountCircleIcon />,
    },
    {
      title: "Role",
      to: "/setting/role",
      icon: <SettingsOutlinedIcon />,
    },
  ];

  return (
    <Grid2 container spacing={1}>
      <Grid2 size={3}>
        <AppList items={items} />
      </Grid2>
      <Grid2 size={9}>
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
