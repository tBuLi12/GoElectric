import { useEffect, useState } from "react";
import { CircularProgress, Container, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function Compare() {
    const [selected, setSelected] = useState([]);
    const [list, setList] = useState(null);
    useEffect(function() {
        fetch('/api/get-cars').then(r => r.json()).then(setList);
    }, []);
    if (!list) {
        return <CircularProgress/>;
    }
    if (selected.length >= 2) {
        return (
            <Container size="md" sx={{mt: 6}}>
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Compare</TableCell>
                  <TableCell align="right">{`${selected[0].Brand} ${selected[0].Model}`}</TableCell>
                  <TableCell align="right">{`${selected[1].Brand} ${selected[1].Model}`}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.keys(selected[0]).filter(k => !['Model', 'Brand', '_id'].includes(k)).map((key) => (
                  <TableRow
                    key={key}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">{selected[0][key]}</TableCell>
                    <TableCell align="right">{selected[1][key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          </Container>
        )
    }
    return (
        <List>
            {list.map((car, i) => (
                <ListItemButton key={car._id} onClick={() => setSelected(p => [...p, car])} sx={{bgcolor: selected.includes(car) ? 'primary.main' : 'default'}}>
                    <ListItemText primary={`${car.Brand} ${car.Model}`}></ListItemText>
                </ListItemButton>
            ))}
        </List>
    )   
}