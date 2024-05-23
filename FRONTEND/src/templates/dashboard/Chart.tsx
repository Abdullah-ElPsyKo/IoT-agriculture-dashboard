import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { ChartsTextStyle } from "@mui/x-charts/ChartsText";
import Title from "./Title";
import fetchData from "../../../api/fetchData";

interface WeatherData {
  id: number;
  date: string;
  city: string;
  temperature: number;
  precipitation: number;
  soil_moisture: number;
  winds: number;
}

const Chart = () => {
  const theme = useTheme();
  const [chartData, setChartData] = React.useState<
    { time: string; amount: number | null }[]
  >([]);
  const [selectedCity, setSelectedCity] = React.useState<string>("");
  const [cities, setCities] = React.useState<string[]>([]); // Store cities in state

  function getMonthIndex(monthName: any) {
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
    return monthNames.indexOf(monthName);
  }

  React.useEffect(() => {
    fetchData()
      .then((data: WeatherData[]) => {
        const monthlyAverages: { time: string; amount: number }[] = [];
        const dataByMonth: { [month: string]: number[] } = {};

        // Extract unique cities and store them in state
        const uniqueCities = [...new Set(data.map((item) => item.city))];
        setCities(uniqueCities); // Update cities state

        data.forEach((entry) => {
          const month = new Date(entry.date).toLocaleString("default", {
            month: "short",
          });
          if (!dataByMonth[month]) {
            dataByMonth[month] = [];
          }
          dataByMonth[month].push(entry.temperature);
        });

        for (const month in dataByMonth) {
          const averageTemperature =
            dataByMonth[month].reduce((acc, val) => acc + val, 0) /
            dataByMonth[month].length;
          monthlyAverages.push({ time: month, amount: averageTemperature });
        }

        setChartData(monthlyAverages);
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, []);

  React.useEffect(() => {
    fetchData()
      .then((data: WeatherData[]) => {
        const filteredData = data.filter((item) => item.city === selectedCity);

        const monthlyAverages: { time: string; amount: number }[] = [];
        const dataByMonth: { [month: string]: number[] } = {};

        filteredData.forEach((entry) => {
          const month = new Date(entry.date).toLocaleString("default", {
            month: "short",
          });
          if (!dataByMonth[month]) {
            dataByMonth[month] = [];
          }
          dataByMonth[month].push(entry.temperature);
        });

        for (const month in dataByMonth) {
          const averageTemperature =
            dataByMonth[month].reduce((acc, val) => acc + val, 0) /
            dataByMonth[month].length;
          monthlyAverages.push({ time: month, amount: averageTemperature });
        }

        // Sort the monthly averages by month name
        monthlyAverages.sort(
          (a, b) => getMonthIndex(a.time) - getMonthIndex(b.time)
        );

        setChartData(monthlyAverages);
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, [selectedCity]);


  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexDirection: "row",
        }}
      >
        <Title>Monthly average temperature</Title>
        <select
          value={selectedCity}
          onChange={(e) => setSelectedCity(e.target.value)}
        >
          <option value="">Select a city...</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={chartData}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: "point",
              dataKey: "time",
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              ...(chartData &&
                chartData.length === 0 && {
                  dataKey: "monthNames",
                }),
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
            [`.${axisClasses.root} text`]: {
              fill: theme.palette.text.secondary,
            },
            [`&.${axisClasses.left}.${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Chart;
