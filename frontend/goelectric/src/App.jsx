import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

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
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;
