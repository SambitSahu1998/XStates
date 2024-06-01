import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Select,
  MenuItem,
  Typography,
  Box,
  FormControl
} from "@mui/material";

const CSCRender = () => {
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    axios
      .get("https://crio-location-selector.onrender.com/countries")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the countries!", error);
      });
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/states`
        )
        .then((response) => {
          setStates(response.data);
          setCities([]);
          setSelectedState("");
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("There was an error fetching the states!", error);
        });
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedState) {
      axios
        .get(
          `https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`
        )
        .then((response) => {
          setCities(response.data);
          setSelectedCity("");
        })
        .catch((error) => {
          console.error("There was an error fetching the cities!", error);
        });
    }
  }, [selectedState]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt:5,fontStyle: 'italic', fontWeight: 'bold', textDecoration: 'underline' }}>
        Select Location 
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", m: 3 }}>
        <FormControl sx={{ minWidth: 200, width:'50%' }}>
          <Select
            value={selectedCountry}
            displayEmpty
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <MenuItem value="">
              <em>Select Country</em>
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200, width:'30%' }} disabled={!selectedCountry}>
          <Select
            value={selectedState}
            displayEmpty
            onChange={(e) => setSelectedState(e.target.value)}
          >
            <MenuItem value="">
              <em>Select State</em>
            </MenuItem>
            {states.map((state) => (
              <MenuItem key={state} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 200 }} disabled={!selectedState}>
          <Select
            value={selectedCity}
            displayEmpty
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            <MenuItem value="">
              <em>Select City</em>
            </MenuItem>
            {cities.map((city) => (
              <MenuItem key={city} value={city}>
                {city}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedCity && selectedState && selectedCountry && (
        <Typography variant="h6" gutterBottom>
          You Selected:  
          <span style={{ fontWeight: 'bold', fontSize: '1.5em' }}> {selectedCity}, </span>
          <span style={{ color: 'gray', fontSize: '1.2em' }}> {selectedState}, </span>
          <span style={{ color: 'lightgray', fontSize: '1em' }}> {selectedCountry} </span>
        </Typography>
      )}
    </Container>
  );
};

export default CSCRender;
