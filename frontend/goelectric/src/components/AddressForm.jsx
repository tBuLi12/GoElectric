import { Grid, TextField } from "@mui/material";

function AddressForm({ address, handleChange }) {
  return (
    <>
      <Grid item lg={3}>
        <TextField
          required
          fullWidth
          size="medium"
          name={`${address}.country`}
          label="Country"
          variant="outlined"
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          required
          fullWidth
          size="medium"
          name={`${address}.city`}
          label="City"
          variant="outlined"
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          required
          fullWidth
          size="medium"
          name={`${address}.name`}
          label="Address Name"
          variant="outlined"
          onChange={handleChange}
        />
      </Grid>
      <Grid item lg={3}>
        <TextField
          required
          fullWidth
          size="medium"
          name={`${address}.num`}
          label="Address Number"
          variant="outlined"
          onChange={handleChange}
        />
      </Grid>
    </>
  );
}

export default AddressForm;
