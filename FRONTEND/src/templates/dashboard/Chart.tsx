import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { ChartsTextStyle } from "@mui/x-charts/ChartsText";
import {
  fetchUniqueCities,
  fetchAllCityData,
  fetchUniqueFarms,
  fetchLatestSFarmData,
} from "../../../api/fetchData";
import CustomSelect from "./Select";

interface WeatherData {
  id: number;
  date: string;
  city: string;
  temperature: number;
  precipitation: number;
  soil_moisture: number;
  winds: number;
}

const getRelativeMonthOrder = () => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIndex = new Date().getMonth();
  const orderedMonths = [];
  for (let i = 0; i < 12; i++) {
    orderedMonths.push(monthNames[(currentMonthIndex - 11 + i + 12) % 12]);
  }
  return orderedMonths;
};

const sortMonthlyAverages = (
  monthlyAverages: { time: string; amount: number }[]
) => {
  const relativeMonthOrder = getRelativeMonthOrder();
  return monthlyAverages.sort(
    (a, b) =>
      relativeMonthOrder.indexOf(a.time) - relativeMonthOrder.indexOf(b.time)
  );
};

const Chart = () => {
  const theme = useTheme();
  const [chartData, setChartData] = React.useState<
    { time: string; amount: number | null }[]
  >([]);
  const [selectedCity, setSelectedCity] = React.useState<string>("");
  const [cities, setCities] = React.useState<string[]>([]);

  const [selectedFarm, setSelectedFarm] = React.useState<string>("None");
  const [farms, setFarms] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchUniqueCities()
      .then((cities) => {
        setCities(cities);
        if (cities.length > 0 && !selectedCity) {
          setSelectedCity(cities[0]);
        }
      })
      .catch((error) => console.error("Failed to fetch unique cities:", error));
  }, []);

  React.useEffect(() => {
    if (selectedCity) {
      fetchUniqueFarms(selectedCity)
        .then((farmList) => setFarms(farmList))
        .catch((error) => console.error("Failed to fetch farms:", error));
    }
  }, [selectedCity]);

  React.useEffect(() => {
    if (selectedFarm) {
      fetchLatestSFarmData(selectedCity, selectedFarm)
        .then((data: WeatherData[]) => {
          if (!Array.isArray(data)) {
            throw new TypeError("Expected an array of weather data");
          }
          const dataByMonth: {
            [month: string]: { sum: number; count: number };
          } = {};
          data.forEach((entry) => {
            const month = new Date(entry.date).toLocaleString("default", {
              month: "short",
            });
            if (!dataByMonth[month]) {
              dataByMonth[month] = { sum: 0, count: 0 };
            }
            dataByMonth[month].sum += entry.temperature;
            dataByMonth[month].count += 1;
          });
          const monthlyAverages = Object.keys(dataByMonth).map((month) => ({
            time: month,
            amount: Math.round(
              dataByMonth[month].sum / dataByMonth[month].count
            ),
          }));

          setChartData(sortMonthlyAverages(monthlyAverages));
        })
        .catch((error) => console.error("Failed to fetch farm data:", error));
    }
  }, [selectedFarm]);

  React.useEffect(() => {
    if (!selectedCity) return;

    fetchAllCityData(selectedCity)
      .then((weatherData: WeatherData[]) => {
        if (!Array.isArray(weatherData)) {
          throw new TypeError("Expected an array of weather data");
        }
        const dataByMonth: { [month: string]: { sum: number; count: number } } =
          {};
        weatherData.forEach((entry) => {
          const month = new Date(entry.date).toLocaleString("default", {
            month: "short",
          });
          if (!dataByMonth[month]) {
            dataByMonth[month] = { sum: 0, count: 0 };
          }
          dataByMonth[month].sum += entry.temperature;
          dataByMonth[month].count += 1;
        });

        const monthlyAverages = Object.keys(dataByMonth).map((month) => ({
          time: month,
          amount: Math.round(dataByMonth[month].sum / dataByMonth[month].count),
        }));

        setChartData(sortMonthlyAverages(monthlyAverages));
      })
      .catch((error) => console.error("Failed to fetch data for city:", error));
  }, [selectedCity]);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ fontSize: "20px", color: "rgb(25, 118, 210)" }}>
          Monthly Average Temperature,{" "}
          {selectedFarm == "None"
            ? selectedCity
            : `${selectedCity}, ${selectedFarm}`}
        </h2>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
      </div>
      <LineChart
        dataset={chartData}
        margin={{ top: 16, right: 20, left: 70, bottom: 30 }}
        xAxis={[
          {
            scaleType: "point",
            dataKey: "time",
            tickNumber: 12,
            tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
          },
        ]}
        yAxis={[
          {
            label: "Temperature (°C)",
            labelStyle: {
              ...(theme.typography.body1 as ChartsTextStyle),
              fill: theme.palette.text.primary,
            },
            tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
            max: 40,
            tickNumber: 3,
          },
        ]}
        series={[
          {
            dataKey: "amount",
            showMark: false,
            color: theme.palette.primary.light,
          },
        ]}
        sx={{
          [`.${axisClasses.root} line`]: {
            stroke: theme.palette.text.secondary,
          },
          [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
          [`&.${axisClasses.left}.${axisClasses.label}`]: {
            transform: "translateX(-25px)",
          },
        }}
      />
    </React.Fragment>
  );
};

export default Chart;
