import * as React from "react";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import WeatherData from "../../../api/types";
import {
  fetchUniqueCities,
  fetchLatestSCityData,
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
      fetchLatestSCityData(selectedCity)
        .then((data: WeatherData) => {
          setWeatherData(data);
        })
        .catch((error: Error) => console.error("Failed to fetch data:", error));
    }
  }, [selectedCity]);

  const renderDropdown = () => (
    <CustomSelect
      selectedCity={selectedCity}
      setSelectedCity={setSelectedCity}
      cities={cities}
    />
  );

  return (
    <React.Fragment>
      <Title>
        Latest Weather in{" "}
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
          <Typography
            color="text.secondary"
            sx={{ flex: 1, fontSize: "0.75rem", marginTop: "16px" }}
          >
            {new Date(weatherData.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </React.Fragment>
      )}
      <div>
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
      </div>
    </React.Fragment>
  );
};

export default Deposits;
