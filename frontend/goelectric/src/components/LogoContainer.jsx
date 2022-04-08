import { Box } from "@mui/material";
import logo from "../assets/logo.png";

function LogoContainer() {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "primary.main",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <img src={logo} alt="gitara" />
    </Box>
  );
}

export default LogoContainer;
