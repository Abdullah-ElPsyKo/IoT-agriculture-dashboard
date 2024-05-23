import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../api/fetchData";
import WeatherData from "../../../api/types";

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
  const navigate = useNavigate();

  // Fetch data once and store it
  React.useEffect(() => {
    fetchData()
      .then((data: WeatherData[]) => {
        if (data && data.length > 0) {
          const uniqueCities = [...new Set(data.map((item) => item.city))];
          setCities(uniqueCities);
          // Initially set the latest data
          const latestDate = data.reduce((latest, current) =>
            new Date(current.date) > new Date(latest.date) ? current : latest
          );
          setWeatherData(latestDate);
        }
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, []); // Empty dependency array means this runs once on mount

  // Filter data based on selected city
  React.useEffect(() => {
    if (selectedCity) {
      fetchData()
        .then((data: WeatherData[]) => {
          const filteredData = data.find((item) => item.city === selectedCity);
          if (filteredData) {
            setWeatherData(filteredData);
          }
        })
        .catch((error: Error) => console.error("Failed to fetch data:", error));
    }
  }, [selectedCity]);

  const renderDropdown = () => {
    return (
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
      >
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    );
  };

  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();
    if (isHistoryPage) {
      navigate("/");
    } else {
      navigate("/history");
    }
  };

  return (
    <React.Fragment>
      <Title>
        Current Weather,{" "}
        {weatherData ? `${weatherData.city}, ${weatherData.date}` : ""}
      </Title>
      {renderDropdown()}
      {weatherData && (
        <React.Fragment>
          <Typography component="p" variant="h5">
            Temperature: {parseFloat(weatherData.temperature).toFixed(2)}°C
          </Typography>
          <Typography component="p" variant="h5">
            Soil Moisture: {parseFloat(weatherData.soilMoisture).toFixed(2)}%
          </Typography>
          <Typography component="p" variant="h5">
            Wind Speed: {parseFloat(weatherData.winds).toFixed(2)} km/h
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {new Date(weatherData.date).toLocaleDateString()}
          </Typography>
        </React.Fragment>
      )}
      <div>
        <Link color="primary" href="#" onClick={handleLinkClick}>
          {isHistoryPage ? "Go back" : "View history"}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
