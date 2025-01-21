import CustomList, { CustomListItemProps } from "@/components/ui/CustomList";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

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

function Sidebar() {
  return <CustomList items={items} />;
}

export default Sidebar;
