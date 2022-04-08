import { Grid, TextField, Container } from "@mui/material";

function CarForm() {
  return (
    <Container sx={{ pt: 10 }}>
      <Grid container spacing={10}>
        <Grid item lg={4}>
          <TextField
            fullWidth
            size="medium"
            id="country"
            label="Counry"
            variant="outlined"
          />
        </Grid>
        <Grid item lg={4}>
          <TextField
            fullWidth
            size="medium"
            id="time"
            label="Time spent in car"
            variant="outlined"
          />
        </Grid>
        <Grid item lg={4}>
          <TextField
            fullWidth
            size="medium"
            id="country"
            label="Counry"
            variant="outlined"
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default CarForm;
