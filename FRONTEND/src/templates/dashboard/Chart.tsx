import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { ChartsTextStyle } from "@mui/x-charts/ChartsText";
import Title from "./Title";
import fetchData, { fetchUniqueCities } from "../../../api/fetchData";

interface WeatherData {
  id: number;
  date: string;
  city: string;
  temperature: number;
  precipitation: number;
  soil_moisture: number;
  winds: number;
}

const getMonthIndex = (monthName: string) => {
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
};

const sortMonthlyAverages = (
  monthlyAverages: { time: string; amount: number }[]
) => {
  return monthlyAverages.sort(
    (a, b) => getMonthIndex(a.time) - getMonthIndex(b.time)
  );
};

const Chart = () => {
  const theme = useTheme();
  const [chartData, setChartData] = React.useState<
    { time: string; amount: number | null }[]
  >([]);
  const [selectedCity, setSelectedCity] = React.useState<string>("");
  const [cities, setCities] = React.useState<string[]>([]);

  React.useEffect(() => {
    fetchUniqueCities()
      .then((uniqueCities) => {
        const dataByMonth: { [month: string]: { sum: number; count: number } } =
          {};
        setCities(uniqueCities);

        // Set the first city as the default selected city
        if (uniqueCities.length > 0 && !selectedCity) {
          setSelectedCity(uniqueCities[0]);
        }

        uniqueCities.forEach((entry: any) => {
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
          amount: dataByMonth[month].sum / dataByMonth[month].count,
        }));

        setChartData(sortMonthlyAverages(monthlyAverages));
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, [selectedCity]);

  React.useEffect(() => {
    if (!selectedCity) return;

    fetchData()
      .then((data: WeatherData[]) => {
        const filteredData = data.filter((item) => item.city === selectedCity);

        const dataByMonth: { [month: string]: { sum: number; count: number } } =
          {};

        filteredData.forEach((entry) => {
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
          amount: dataByMonth[month].sum / dataByMonth[month].count,
        }));

        setChartData(sortMonthlyAverages(monthlyAverages));
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
              tickNumber: 12,
              tickLabelStyle: theme.typography.body2 as ChartsTextStyle,
              data: [
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
              ],
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
