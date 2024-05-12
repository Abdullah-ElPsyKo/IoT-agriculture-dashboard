import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { ChartsTextStyle } from "@mui/x-charts/ChartsText";
import Title from "./Title";
import fetchData from "../../../api/fetchData";

// Define types/interfaces for your data
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

  React.useEffect(() => {
    fetchData()
      .then((data: WeatherData[]) => {
        const monthlyAverages: { time: string; amount: number }[] = [];
        const dataByMonth: { [month: string]: number[] } = {};

        // Group data by month
        data.forEach((entry) => {
          const month = new Date(entry.date).toLocaleString("default", {
            month: "short",
          });
          if (!dataByMonth[month]) {
            dataByMonth[month] = [];
          }
          dataByMonth[month].push(entry.temperature); // Adjust to the desired attribute
        });

        // Calculate average temperature for each month
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

  return (
    <React.Fragment>
      <Title>Monthly average temperature</Title>
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
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: "translateX(-25px)",
            },
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default Chart;
