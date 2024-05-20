import React, { useState, useEffect } from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import fetchData from "../../../api/fetchData";
import WeatherData from "../../../api/types";

const WeatherInfo = () => {
  const [data, setData] = useState<WeatherData[]>([]);

  useEffect(() => {
    fetchData()
      .then((fetchedData: WeatherData[]) => {
        // Group data by date, hour, and city
        const groupedData: { [key: string]: WeatherData } = {};
        fetchedData.forEach((entry) => {
          const date = new Date(entry.date);
          const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:00`; // Display only date and hours
          const key = `${formattedDate} ${entry.city}`;
          // Only keep the first entry for each combination of date, hour, and city
          if (!groupedData[key]) {
            groupedData[key] = entry;
          }
        });
        setData(Object.values(groupedData));
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, []);

  return (
    <React.Fragment>
      <Title>Current conditions in other countries</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date/Time</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Soil Moisture</TableCell>
            <TableCell>Wind</TableCell>
            <TableCell>Temperature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {new Date(row.date).toLocaleDateString()}{" "}
                {new Date(row.date).getHours()}:00
              </TableCell>
              {/* ^ Display only date and hours */}
              <TableCell>{row.country}</TableCell>
              {/*  ^ change this row.city to row.country if we have country in database */}
              <TableCell>{row.city}</TableCell>
              <TableCell>{parseFloat(row.soilMoisture).toFixed(2)}</TableCell>
              <TableCell>{parseFloat(row.winds).toFixed(2)}</TableCell>
              <TableCell>{parseFloat(row.temperature).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link
        color="primary"
        href="#"
        onClick={(event) => event.preventDefault()}
        sx={{ mt: 3 }}
      >
        See other countries
      </Link>
    </React.Fragment>
  );
};

export default WeatherInfo;
