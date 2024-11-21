import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import Content from "./components/Content";
import Header from "./components/Header";
import Navigator from "./components/Navigator";
import theme from "./components/theme";

const drawerWidth = 256;

export default function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <CssBaseline />
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        {isSmUp ? null : (
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <Navigator
          PaperProps={{ style: { width: drawerWidth } }}
          sx={{ display: { sm: "block", xs: "none" } }}
        />
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Header onDrawerToggle={handleDrawerToggle} />
        <Box
          component="main"
          sx={{ flex: 1, py: 6, px: 4, bgcolor: "#eaeff1" }}
        >
          <Content />
        </Box>
      </Box>
    </Box>
  );
}
