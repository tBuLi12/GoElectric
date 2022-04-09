import { Send } from "@mui/icons-material";
import {
  Grid,
  TextField,
  Container,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Box,
} from "@mui/material";
import Address from "../Address";
import AddressForm from "./AddressForm";
import UserServices from "../services/UserServices";

import { useState, useEffect } from "react";

function CarForm({ userData, setUserData, handleSubmit }) {
  const handleChange = (event) => {
    const { value, name } = event.target;
    const [rootName, subname] = name.split(".");

    setUserData((prevValue) => ({
      ...prevValue,
      [rootName]: subname
        ? { ...prevValue[rootName], [subname]: value }
        : value,
    }));
  };

  const [fixedBrands, setFixedBrands] = useState([]);
  const [fixedBody, setFixedBody] = useState([]);

  useEffect(() => {
    UserServices.getBrands()
      .then((res) => res.json())
      .then((res) => {
        setFixedBrands(res);
      });
    UserServices.getBody()
      .then((res) => res.json())
      .then((res) => {
        setFixedBody(res);
      });
  }, []);

  const handleDestAddresses = (event) => {
    const { value, name } = event.target;
    const [rootName, temp] = name.split(",");
    const [index, subname] = temp.split(".");
    console.log(userData);
    let arrCp;
    setUserData((prevValue) => ({
      ...prevValue,
      [rootName]:
        ((arrCp = [...prevValue[rootName]]),
        (arrCp[Number(index)][subname] = value),
        arrCp),
    }));
  };

  const handleMultiplySelect = (event) => {
    const { value } = event.target;
    setUserData((prevValue) => ({
      ...prevValue,
      brands: [...prevValue.brands, [value]],
    }));
  };

  return (
    <>
      <Typography align="center" variant="h2" sx={{ pt: 5 }}>
        Should you Go Electric ?
      </Typography>

      <form onSubmit={handleSubmit}>
        <Container sx={{ pt: 10 }}>
          <Grid container spacing={10}>
            <Grid item lg={4}>
              <TextField
                required
                fullWidth
                size="medium"
                name="days"
                label="Days spend in car per week"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={4}>
              <TextField
                required
                fullWidth
                size="medium"
                name="km"
                label="Average Kilometers driven per day"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={4}>
              <TextField
                required
                fullWidth
                size="medium"
                name="price"
                label="Max price"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <AddressForm address="userAddress" handleChange={handleChange} />
            <Grid item lg={3}>
              <FormLabel id="radio">Do you have photovoltaics?</FormLabel>
              <RadioGroup defaultValue="yes" name="radio">
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>
            </Grid>
            <Grid item lg={3}>
              <TextField
                fullWidth
                size="medium"
                name="maxDistance"
                label="Maximal distance for charger"
                variant="outlined"
                onChange={handleChange}
              />
            </Grid>
            <Grid item lg={2}>
              <FormControl fullWidth>
                <InputLabel id="bodyLabel">Preferred car body type</InputLabel>
                <Select
                  labelId="bodyLabel"
                  name="body"
                  value={userData.body}
                  label="Preferred Car body type"
                  onChange={handleChange}
                >
                  {fixedBody.map((tempBody) => (
                    <MenuItem value={tempBody}>{tempBody}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item lg={4}>
              <FormControl fullWidth>
                <InputLabel id="brands">Preferred car brand</InputLabel>
                <Select
                  labelId="brandsLabel"
                  name="brands"
                  value={userData.brands.length ? userData.brands : ""}
                  onChange={handleMultiplySelect}
                  label="Preferred car Brands"
                  input={
                    <OutlinedInput id="brandId" label="Preferred car Brands" />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                >
                  {fixedBrands.map((brand) => (
                    <MenuItem key={brand} value={brand}>
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Typography sx={{ pt: 5, pb: 5 }} variant="h5">
            Frequent destinations:
          </Typography>

          <Grid container spacing={10}>
            {userData.destAddress.map((address, id) => {
              return (
                <AddressForm
                  address={`destAddress,${id}`}
                  handleChange={handleDestAddresses}
                />
              );
            })}
          </Grid>
          <Button
            color="primary"
            variant="outlined"
            aria-label="add"
            sx={{ mt: 8 }}
            onClick={() => {
              setUserData((prevValue) => ({
                ...prevValue,
                destAddress: [
                  ...prevValue.destAddress,
                  new Address("", "", "", ""),
                ],
              }));
            }}
          >
            Add Address
          </Button>
        </Container>

        <Container sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            sx={{ m: 10 }}
            type="submit"
            variant="contained"
            endIcon={<Send />}
          >
            Send
          </Button>
        </Container>
      </form>
    </>
  );
}

export default CarForm;
