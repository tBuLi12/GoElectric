import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
      light: '#757de8',
      dark: '#002984',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#26c6da',
      light: '#6ff9ff',
      dark: '#0095a8',
      contrastText: '#000000'
    }
  },
  spacing: 5,
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <div>
        dome bullshit
      </div>
    </ThemeProvider>
  )
}

export default App
