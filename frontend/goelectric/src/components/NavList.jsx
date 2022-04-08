import { List, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import { Home, Info } from "@mui/icons-material";
import { useNavigate } from "react-router-dom"

export default function NavList() {
    return (
        <List>
          <NavLink to='/' icon={<Home/>}>Home</NavLink>
          <NavLink to='/about' icon={<Info/>}>About</NavLink>
        </List>
    )
}

function NavLink({ to, icon, children }) {
    const navigate = useNavigate();
    return (
        <ListItemButton onClick={() => navigate(to)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={children} sx={{mr: 3}}/>
        </ListItemButton>
    )
}