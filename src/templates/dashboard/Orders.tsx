import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

function createData(
  id: number,
  time: string,
  country: string,
  city: string,
  precipitation: string,
  soilMoisture: string,
  wind: string,
  temperature: string
) {
  return {
    id,
    time,
    country,
    city,
    precipitation,
    soilMoisture,
    wind,
    temperature,
  };
}

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

const Orders = (data: any) => {
  const rows = [
    createData(
      0,
      data.time,
      data.country,
      data.city,
      data.precipitation,
      data.soilMoisture,
      data.wind,
      data.temperature
    ),
  ];

  return (
    <React.Fragment>
      <Title>Current conditions in other countries</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Time</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Precipitation</TableCell>
            <TableCell>Soil Moisture</TableCell>
            <TableCell>Wind</TableCell>
            <TableCell>Temperature</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.time}</TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{row.precipitation}</TableCell>
              <TableCell>{row.soilMoisture}</TableCell>
              <TableCell>{row.wind}</TableCell>
              <TableCell>{row.temperature}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See other countries
      </Link>
    </React.Fragment>
  );
};

export default Orders;