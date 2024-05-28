import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import WeatherData from "../../../api/types";
import { fetchUniqueCities } from "../../../api/fetchData";
import { fetchLatestSCityData } from "../../../api/fetchData";

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

  React.useEffect(() => {
    fetchUniqueCities()
      .then((uniqueCities) => {
        setCities(uniqueCities);

        // Set the first city as the default selected city
        if (uniqueCities.length > 0 && !selectedCity) {
          setSelectedCity(uniqueCities[0]);
        }
      })
      .catch((error: Error) =>
        console.error("Failed to fetch unique cities:", error)
      );
  }, []);

  React.useEffect(() => {
    if (selectedCity) {
      fetchLatestSCityData(selectedCity)
        .then((data: WeatherData[]) => {
          data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          );
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
        Latest Weather,{" "}
        {weatherData
          ? `${weatherData.city}, ${new Date(
              weatherData.date
            ).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}`
          : ""}
      </Title>
      {renderDropdown()}
      {weatherData && (
        <React.Fragment>
          <Typography component="p" variant="h5" sx={{ fontSize: "0.875rem" }}>
            {" "}
            {/* Adjusted font size */}
            Temperature: {parseFloat(weatherData.temperature).toFixed(2)}°C
          </Typography>
          <Typography component="p" variant="h5" sx={{ fontSize: "0.875rem" }}>
            {" "}
            {/* Adjusted font size */}
            Soil Moisture: {parseFloat(weatherData.soilMoisture).toFixed(2)}%
          </Typography>
          <Typography component="p" variant="h5" sx={{ fontSize: "0.875rem" }}>
            {" "}
            {/* Adjusted font size */}
            Wind Speed: {parseFloat(weatherData.winds).toFixed(2)} km/h
          </Typography>
          <Typography
            color="text.secondary"
            sx={{ flex: 1, fontSize: "0.75rem" }}
          >
            {" "}
            {/* Adjusted font size */}
            {new Date(weatherData.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </React.Fragment>
      )}
      <div>
        <Link
          color="primary"
          href="#"
          onClick={handleLinkClick}
          sx={{ fontSize: "0.875rem" }}
        >
          {" "}
          {/* Adjusted font size */}
          {isHistoryPage ? "Go back" : "View history"}
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
