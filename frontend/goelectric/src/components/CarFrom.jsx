import { Send } from "@mui/icons-material";
import { Grid, TextField, Container, Typography, Button } from "@mui/material";
import { useState } from "react";
import UserServices from "../services/UserServices";

function CarForm() {
  const [userData, setUserData] = useState({
    time: "",
    km: "",
    price: "",
    country: "",
    city: "",
    addressName: "",
    addressNum: "",
  });

  const handleSubmit = () => {
    console.log(userData);
    UserServices.postCarForm(userData).then((res) => console.log(res.json()));
    setUserData({
      time: "",
      km: "",
      price: "",
      country: "",
      city: "",
      addressName: "",
      addressNum: "",
    });
  };

  const handleChange = (event) => {
    const { value, name } = event.target;

    setUserData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  return (
    <>
      <Typography align="center" variant="h2" sx={{ pt: 5 }}>
        Should you Go Electric ?
      </Typography>

      <Container sx={{ pt: 10 }}>
        <Grid container spacing={10}>
          <Grid item lg={4}>
            <TextField
              fullWidth
              size="medium"
              name="time"
              label="Average time spent in car per week"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              fullWidth
              size="medium"
              name="km"
              label="Average Kilometers driven per week"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={4}>
            <TextField
              fullWidth
              size="medium"
              name="price"
              label="Max price"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="medium"
              name="country"
              label="Country"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="medium"
              name="city"
              label="City"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="medium"
              name="addressName"
              label="Address Name"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
          <Grid item lg={3}>
            <TextField
              fullWidth
              size="medium"
              name="addressNum"
              label="Address Number"
              variant="outlined"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </Container>

      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={() => {
            handleSubmit();
          }}
          sx={{ m: 10 }}
          variant="contained"
          endIcon={<Send />}
        >
          Send
        </Button>
      </Container>
    </>
  );
}

export default CarForm;
