import APopover from "@/components/ui/APopover";
import { TOKEN_LOCAL_KEY, USER_LOCAL_KEY } from "@/constant/key";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "@tanstack/react-router";
import { useState } from "react";

function AuthButton() {
  const user = localStorage.getItem(USER_LOCAL_KEY);
  const parseUser = user ? JSON.parse(user) : null;

  const [isAuth, setIsAuth] = useState(() => {
    return Boolean(parseUser?.username);
  });

  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem(USER_LOCAL_KEY);
    localStorage.removeItem(TOKEN_LOCAL_KEY);
  };

  if (!isAuth) {
    return (
      <Button
        variant="contained"
        disableElevation
        component={Link}
        to="/auth/login"
      >
        Log in
      </Button>
    );
  }

  return (
    <APopover
      dropdown={
        <List>
          <ListItem disablePadding dense>
            <ListItemButton>
              <ListItemText primary="Profile" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding dense>
            <ListItemButton onClick={handleLogout}>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
        </List>
      }
    >
      <Button color="inherit" startIcon={<AccountCircleIcon />}>
        {parseUser.username}
      </Button>
    </APopover>
  );
}

export default AuthButton;
