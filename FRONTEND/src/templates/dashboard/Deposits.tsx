import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import fetchData from "../../../api/fetchData";
import WeatherData from "../../../api/types";

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Deposits = () => {
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(
    null
  );
  const [selectedCity, setSelectedCity] = React.useState<string>(""); // Step 1: Add state for selected city

  React.useEffect(() => {
    fetchData()
      .then((data: WeatherData[]) => {
        if (data && data.length > 0) {
          // Assuming you want to filter by city, adjust this part according to your needs
          const filteredData = data.filter(
            (item) => item.city === selectedCity
          );
          if (filteredData && filteredData.length > 0) {
            setWeatherData(filteredData[0]);
          }
        }
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, [selectedCity]); // Depend on selectedCity to refetch data

  // Example dropdown component
  const renderDropdown = () => {
    // Placeholder for actual data fetching and rendering logic
    return (
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {/* Populate options dynamically */}
        <option value="">Select a city...</option>
        {/* Example option */}
        <option value="New York">New York</option>
        {/* Repeat for other cities */}
      </select>
    );
  };

  return (
    <React.Fragment>
      <Title>
        Current Weather,{" "}
        {weatherData ? `${weatherData.city}, ${weatherData.date}` : ""}
      </Title>
      {weatherData && (
        <React.Fragment>
          <Typography component="p" variant="h4">
            {parseFloat(weatherData.temperature).toFixed(2)}°C{"   "}
            {parseFloat(weatherData.soilMoisture).toFixed(2)}% soil moisture
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {new Date(weatherData.date).toLocaleDateString()}
          </Typography>
        </React.Fragment>
      )}
      <div>
        {renderDropdown()} {/* Render the dropdown */}
        <Link color="primary" href="#" onClick={preventDefault}>
          View history
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
