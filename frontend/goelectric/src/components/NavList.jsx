import {
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Home, Info, Menu } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function NavList({ setOpen }) {
  return (
    <List>
      <ListItemButton
        sx={{ color: "#ffffff" }}
        onClick={() => setOpen((o) => !o)}
      >
        <ListItemIcon>
          <Menu sx={{ color: "#ffffff" }} />
        </ListItemIcon>
      </ListItemButton>
      <NavLink
        sx={{ color: "#ffffff" }}
        to="/"
        icon={<Home sx={{ color: "#ffffff" }} />}
      >
        Home
      </NavLink>
      <NavLink to="/about" icon={<Info sx={{ color: "#ffffff" }} />}>
        About
      </NavLink>
    </List>
  );
}

function NavLink({ to, icon, children }) {
  const navigate = useNavigate();
  return (
    <ListItemButton onClick={() => navigate(to)}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText
        disableTypography
        primary={<Typography color="white">{children}</Typography>}
        sx={{ mr: 3, color: "while" }}
      />
    </ListItemButton>
  );
}
