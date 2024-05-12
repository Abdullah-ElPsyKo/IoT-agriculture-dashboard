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

  React.useEffect(() => {
    fetchData()
      .then((data: WeatherData[]) => {
        if (data && data.length > 0) {
          setWeatherData(data[0]);
        }
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, []);

  return (
    <React.Fragment>
      <Title>
        Current Weather,{" "}
        {weatherData ? `${weatherData.city}, ${weatherData.city}` : ""}
      </Title>
      {weatherData && (
        <React.Fragment>
          <Typography component="p" variant="h4">
            {parseFloat(weatherData.temperature).toFixed(2)}°C
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            {new Date(weatherData.date).toLocaleDateString()}
          </Typography>
        </React.Fragment>
      )}
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View history
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Deposits;
