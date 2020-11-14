import React, { useState, useEffect } from "react";
import { FormControl, MenuItem, Select } from "@material-ui/core";

import InfoBox from "./InfoBox";
import Map from "./Map";
import { sortData, prettyPrintStat } from "./util";

import "./App.css";

function App() {
  const [country, setInputCountry] = useState("worldwide");
  const [countries, setCountries] = useState([]);
  const [countryInfo, setCountryInfo] = useState({});
  const [mapCountries, setMapCountries] = useState([]);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        console.log("all data---", data);
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          console.log("countries", data);
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          // let sortedData = sortData(data);
          setCountries(countries);
          // setMapCountries(data);
          // setTableData(sortedData);
        });
    };

    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setInputCountry(countryCode);
        setCountryInfo(data);
        // setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        // setMapZoom(4);
      });
  };

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 tracker</h1>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox
            // onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            // isRed
            // active={casesType === "cases"}
            // cases={prettyPrintStat(countryInfo.todayCases)}
            // total={numeral(countryInfo.cases).format("0.0a")}
          />
          <InfoBox
            // onClick={(e) => setCasesType("recovered")}
            title="Recovered"
            // active={casesType === "recovered"}
            // cases={prettyPrintStat(countryInfo.todayRecovered)}
            // total={numeral(countryInfo.recovered).format("0.0a")}
          />
          <InfoBox
            // onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            // isRed
            // active={casesType === "deaths"}
            // cases={prettyPrintStat(countryInfo.todayDeaths)}
            // total={numeral(countryInfo.deaths).format("0.0a")}
          />
        </div>
        <Map
        // countries={mapCountries}
        // casesType={casesType}
        // center={mapCenter}
        // zoom={mapZoom}
        />
      </div>
    </div>
  );
}

export default App;
