import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "@tanstack/react-router";

interface CustomHorizontalMenuItemProps {
  label?: string;
  href?: string;
}

export interface CustomHorizontalMenuProps {
  items: CustomHorizontalMenuItemProps[];
}

function CustomHorizontalMenu({ items }: CustomHorizontalMenuProps) {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {items.map((item) => (
        <Button key={item.href} component={Link} to={item.href} color="inherit">
          {item.label}
        </Button>
      ))}
    </Box>
  );
}

export default CustomHorizontalMenu;
