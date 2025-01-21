import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AuthHeader from "./AuthHeader";
import CustomHorizontalMenu, {
  CustomHorizontalMenuProps,
} from "./ui/CustomHorizontalMenu";

const items: CustomHorizontalMenuProps["items"] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Setting",
    href: "/setting/user",
  },
];

function Header() {
  return (
    <AppBar component="nav" position="sticky" elevation={0} color="inherit">
      <Toolbar variant="dense" disableGutters>
        <CustomHorizontalMenu items={items} />
        <AuthHeader />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
