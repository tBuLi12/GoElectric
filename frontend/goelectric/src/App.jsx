import { Menu } from "@mui/icons-material";
import {
  CssBaseline,
  ThemeProvider,
  createTheme,
  AppBar,
  Collapse,
  Toolbar,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavList from "./components/NavList";

const theme = createTheme({
  palette: {
    primary: {
      main: "#66dabf",
      light: "#9bfff2",
      dark: "#2ba88f",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#f7c62f",
      light: "#fff965",
      dark: "#c09600",
      contrastText: "#ffffff",
    },
  },
  spacing: 5,
});

function App() {
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
        <AppBar position="relative" sx={{ bgcolor: "primary.dark" }}>
          <Toolbar>
            <IconButton
              onClick={() => setOpen((o) => !o)}
              sx={{ mr: 4 }}
              color="inherit"
            >
              <Menu />
            </IconButton>
            <Typography>YYEEEE</Typography>
          </Toolbar>
        </AppBar>
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Collapse
            in={open}
            orientation="horizontal"
            collapsedSize={55}
            sx={{
              borderRight: 1,
              borderColor: "divider",
              bgcolor: (theme) => theme.palette.grey[100],
            }}
          >
            <NavList />
          </Collapse>
          <Box sx={{ flexGrow: 1 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
