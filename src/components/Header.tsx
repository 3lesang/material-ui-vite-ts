import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

function Header() {
  return (
    <AppBar component="nav" position="sticky" elevation={0} color="transparent" >
      <Toolbar variant="dense" disableGutters></Toolbar>
    </AppBar>
  );
}

export default Header;
