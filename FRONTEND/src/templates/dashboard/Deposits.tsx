import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import { useNavigate } from "react-router-dom";
import fetchData from "../../../api/fetchData";
import WeatherData from "../../../api/types";

interface DepositsProps {
  showAllData?: boolean; // Add a prop to control what data to show
  isHistoryPage?: boolean; // Add a prop to control the link behavior
}

const Deposits: React.FC<DepositsProps> = ({ isHistoryPage = false }) => {
  const [weatherData, setWeatherData] = React.useState<WeatherData | null>(
    null
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchData()
      .then((data: WeatherData[]) => {
        if (data && data.length > 0) {
          const latestDate = data.reduce((latest, current) =>
            new Date(current.date) > new Date(latest.date) ? current : latest
          );
          setWeatherData(latestDate);
        }
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, []);

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
        Latest weather,{" "}
        {weatherData ? `${weatherData.country}, ${weatherData.city}` : ""}
      </Title>
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
