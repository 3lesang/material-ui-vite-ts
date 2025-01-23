import CustomMenu from "@/components/ui/CustomMenu";
import { TOKEN_LOCAL_KEY, USER_LOCAL_KEY } from "@/constant/key";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

function AuthHeader() {
  const user = localStorage.getItem(USER_LOCAL_KEY);

  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(() => {
    return Boolean(user);
  });

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
  const handleLogout = () => {
    setIsAuth(false);
    localStorage.removeItem(USER_LOCAL_KEY);
    localStorage.removeItem(TOKEN_LOCAL_KEY);
  };

  const handleNavigate = (to: string) => () => {
    navigate({ to });
  };

  const items = [
    {
      label: "Profile",
      onClick: handleNavigate("/profile"),
    },
    {
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <CustomMenu items={items}>
      <Button color="inherit" endIcon={<AccountCircleIcon />}>
        {JSON.parse(user || "").username}
      </Button>
    </CustomMenu>
  );
}

export default AuthHeader;
