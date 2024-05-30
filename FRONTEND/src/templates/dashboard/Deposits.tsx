import * as React from "react";
import Typography from "@mui/material/Typography";
import WeatherData from "../../../api/types";
import {
  fetchUniqueCities,
  fetchLatestSCityData,
  fetchUniqueFarms,
  fetchLatestSFarmData,
} from "../../../api/fetchData";
import CustomSelect from "./Select";

interface DepositsProps {
  showAllData?: boolean;
  isHistoryPage?: boolean;
}

const Deposits: React.FC<DepositsProps> = ({ isHistoryPage = false }) => {
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(
    null
  );
  const [selectedCity, setSelectedCity] = React.useState<string>("");
  const [cities, setCities] = React.useState<string[]>([]);

  const [selectedFarm, setSelectedFarm] = React.useState<string>("None");
  const [farms, setFarms] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchUniqueCities()
      .then((uniqueCities) => {
        setCities(uniqueCities);
        if (uniqueCities.length > 0 && !selectedCity) {
          setSelectedCity(uniqueCities[0]);
        }
      })
      .catch((error: Error) =>
        console.error("Failed to fetch unique cities:", error)
      );
  }, [selectedCity]);

  React.useEffect(() => {
    if (selectedCity) {
      fetchUniqueFarms(selectedCity)
        .then((farmList) => setFarms(farmList))
        .catch((error) => console.error("Failed to fetch farms:", error));
    }
  }, [selectedCity]);

  React.useEffect(() => {
    if (selectedCity) {
      fetchLatestSCityData(selectedCity)
        .then((data: WeatherData) => {
          setWeatherData(data);
        })
        .catch((error: Error) => console.error("Failed to fetch data:", error));
    }
  }, [selectedCity]);

  React.useEffect(() => {
    if (selectedFarm) {
      fetchLatestSFarmData(selectedCity, selectedFarm)
        .then((data: any) => {
          setWeatherData(data[0]);
        })
        .catch((error: Error) => console.error("Failed to fetch data:", error));
    }
  }, [selectedFarm, selectedCity]);

  const renderDropdown = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <CustomSelect
        selectedValue={selectedCity}
        onSelect={setSelectedCity}
        options={cities}
      />
      <CustomSelect
        selectedValue={selectedFarm}
        onSelect={setSelectedFarm}
        options={farms}
      />
    </div>
  );

  return (
    <React.Fragment>
      <h2 style={{ fontSize: "20px", color: "rgb(25, 118, 210)" }}>
        Latest Weather in{" "}
        {weatherData
          ? `${
              selectedFarm == "None"
                ? weatherData.city
                : `${weatherData.city}, ${weatherData.farm}`
            }, ${new Date(weatherData.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`
          : ""}
      </h2>
      {renderDropdown()}
      <div style={{ paddingBottom: "5px" }}></div>
      {weatherData && (
        <React.Fragment>
          <Typography
            component="p"
            variant="h5"
            sx={{ fontSize: "0.875rem", marginBottom: "8px" }}
          >
            Temperature: {parseFloat(weatherData.temperature).toFixed(2)}°C
          </Typography>
          <Typography
            component="p"
            variant="h5"
            sx={{ fontSize: "0.875rem", marginBottom: "8px" }}
          >
            Soil Moisture: {parseFloat(weatherData.soilMoisture).toFixed(2)}%
          </Typography>
          <Typography
            component="p"
            variant="h5"
            sx={{ fontSize: "0.875rem", marginBottom: "8px" }}
          >
            Humidity: {parseFloat(weatherData.humidity).toFixed(2)}%
          </Typography>
        </React.Fragment>
      )}

      <a
        href={isHistoryPage ? "/" : `/history/${selectedCity}/1/15`}
        style={{
          fontSize: "0.875rem",
          textDecoration: "underline",
          cursor: "pointer",
        }}
      >
        {isHistoryPage ? "Go back" : "View history"}
      </a>
    </React.Fragment>
  );
};

export default Deposits;
