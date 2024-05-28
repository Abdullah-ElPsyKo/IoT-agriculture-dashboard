import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import fetchData from "../../../api/fetchData";
import WeatherData from "../../../api/types";
import { Paper, TableContainer, TablePagination } from "@mui/material";

interface OrdersProps {
  showCurrentCityOnly?: boolean; // Add a prop to control what data to show
}

const Orders: React.FC<OrdersProps> = ({ showCurrentCityOnly = false }) => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [currentCity, setCurrentCity] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(15);

  useEffect(() => {
    fetchData()
      .then((fetchedData: WeatherData[]) => {
        // Sort fetched data by date (earliest first)
        fetchedData.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );

        // Group data by date, hour, and city
        const groupedData: { [key: string]: WeatherData } = {};
        fetchedData.forEach((entry) => {
          const date = new Date(entry.date);
          const formattedDate = `${date.toLocaleDateString()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; // Display date, hours, minutes, and seconds
          const key = `${formattedDate} ${entry.city}`;
          // Only keep the first entry for each combination of date, hour, and city
          if (!groupedData[key]) {
            groupedData[key] = entry;
          }
        });

        // Set current city to the city of the first entry (assuming fetchedData is not empty)
        //CHANGE THIS CODE TO MAKE IT SO THAT IT USES THE LOCATION AND NOT THE FIRST ENTRY!!!!

        if (fetchedData.length > 0) {
          setCurrentCity(fetchedData[0].city);
        }

        setData(Object.values(groupedData));
      })
      .catch((error: Error) => console.error("Failed to fetch data:", error));
  }, []);

  // Filter data if showCurrentCityOnly is true
  const filteredData = showCurrentCityOnly
    ? data.filter((row) => row.city === currentCity) // Show all entries for the current city
    : data;

  // Get the current page data
  const pageData = filteredData.slice(
    page * itemsPerPage,
    (page + 1) * itemsPerPage
  );

  return (
    <React.Fragment>
      <Title>
        {showCurrentCityOnly
          ? `Current conditions in ${currentCity}`
          : "Current conditions in other countries"}
      </Title>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Soil Moisture</TableCell>
              <TableCell>Humidity</TableCell>
              <TableCell>Temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pageData.map((row) => (
              <TableRow key={row.id}>
                <TableCell>
                  {new Date(row.date).toLocaleDateString()}{" "}
                  {new Date(row.date).toLocaleTimeString()}
                </TableCell>
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>
                  {parseFloat(row.soilMoisture).toFixed(2)} %
                </TableCell>
                <TableCell>{parseFloat(row.humidity).toFixed(2)}%</TableCell>
                <TableCell>
                  {parseFloat(row.temperature).toFixed(2)} °C
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 20, 30]}
        component="div"
        count={filteredData.length}
        rowsPerPage={itemsPerPage}
        page={page}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setItemsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset page if items per page changes
        }}
      />
    </React.Fragment>
  );
};

export default Orders;
