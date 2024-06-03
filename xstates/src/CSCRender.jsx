import React, { useState, useEffect } from "react";
import axios from "axios";

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
    <div style={styles.container}>
      <h1 style={styles.header}>Select Location</h1>

      <div style={styles.selectContainer}>
        <div style={styles.selectWrapper}>
          <label htmlFor="country" style={styles.label}>
            Country
          </label>
          <select
            id="country"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            style={styles.select}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.selectWrapper}>
          <label htmlFor="state" style={styles.label}>
            State
          </label>
          <select
            id="state"
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            style={styles.select}
            disabled={!selectedCountry}
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.selectWrapper}>
          <label htmlFor="city" style={styles.label}>
            City
          </label>
          <select
            id="city"
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={styles.select}
            disabled={!selectedState}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        {selectedCity && selectedState && selectedCountry && (
          <p style={styles.selectedText}>
            You Selected 
            <span style={styles.city}> {selectedCity}, </span>
            <span style={styles.state}> {selectedState}, </span>
            <span style={styles.country}> {selectedCountry} </span>
          </p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    textAlign: "center",
  },
  header: {
    fontStyle: "italic",
    fontWeight: "bold",
    textDecoration: "underline",
  },
  selectContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px 0",
  },
  selectWrapper: {
    flex: "1",
    margin: "0 10px",
  },
  label: {
    display: "block",
    marginBottom: "8px",
  },
  select: {
    width: "100%",
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  selectedText: {
    fontSize: "1.2em",
  },
  city: {
    fontWeight: "bold",
    fontSize: "1.5em",
  },
  state: {
    color: "gray",
    fontSize: "1.2em",
  },
  country: {
    color: "lightgray",
    fontSize: "1em",
  },
};

export default CSCRender;
