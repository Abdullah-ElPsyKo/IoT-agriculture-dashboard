import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart, axisClasses } from "@mui/x-charts";
import { ChartsTextStyle } from "@mui/x-charts/ChartsText";
import Title from "./Title";

// Generate Sales Data
function createData(
  time: string,
  amount?: number
): { time: string; amount: number | null } {
  return { time, amount: amount ?? null };
}

const data = [
  createData("Jan", 12),
  createData("Feb", 13),
  createData("Mar", 15),
  createData("Apr", 17),
  createData("May", 20),
  createData("Jun", 24),
  createData("Jul", 28),
  createData("Aug", 28),
  createData("Sep", 25),
  createData("Oct", 20),
  createData("Nov", 16),
  createData("Dec", 13),
];

export default function Chart() {
  const theme = useTheme();

  return (
    <React.Fragment>
      <Title>Monthly average, {"country"}</Title>
      <div style={{ width: "100%", flexGrow: 1, overflow: "hidden" }}>
        <LineChart
          dataset={data}
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
}
