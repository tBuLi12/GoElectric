import LogoContainer from "../components/LogoContainer";
import { Grid, TextField, Container } from "@mui/material";

function Homepage() {
  return (
    <>
      <LogoContainer />

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
              id="country"
              label="Counry"
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
    </>
  );
}

export default Homepage;
