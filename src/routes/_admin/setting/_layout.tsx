import CustomList, { CustomListItemProps } from "@/components/ui/CustomList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Grid2 from "@mui/material/Grid2";
import { createFileRoute, Outlet } from "@tanstack/react-router";

const items: CustomListItemProps[] = [
  {
    title: "Administration",
    type: "group",
  },
  {
    title: "User",
    href: "/setting/user",
    icon: <PersonIcon />,
  },
  {
    title: "Role",
    href: "/setting/role",
    icon: <SettingsOutlinedIcon />,
  },
  {
    title: "Setting",
    type: "group",
  },
  {
    title: "Account",
    href: "/setting/profile",
    icon: <AccountCircleIcon />,
  },
];

export const Route = createFileRoute("/_admin/setting/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Grid2 container spacing={1}>
      <Grid2 size={3}>
        <CustomList items={items} />
      </Grid2>
      <Grid2 size={9}>
        <Outlet />
      </Grid2>
    </Grid2>
  );
}
