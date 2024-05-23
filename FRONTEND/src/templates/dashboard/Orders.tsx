import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Title from "./Title";
import fetchData from "../../../api/fetchData";
import WeatherData from "../../../api/types";

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

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  const handleFirstPage = () => {
    setPage(0);
  };

  const handleLastPage = () => {
    setPage(Math.floor(filteredData.length / itemsPerPage));
  };

  const handleItemsPerPageChange = (items: number) => {
    const currentItemIndex = page * itemsPerPage;
    const newPage = Math.floor(currentItemIndex / items);
    setItemsPerPage(items);
    setPage(Math.min(newPage, Math.floor(filteredData.length / items)));
  };

  return (
    <React.Fragment>
      <Title>
        {showCurrentCityOnly
          ? `Current conditions in ${currentCity}`
          : "Current conditions in other countries"}
      </Title>
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
          {pageData.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                {new Date(row.date).toLocaleDateString()}{" "}
                {new Date(row.date).toLocaleTimeString()}
              </TableCell>
              <TableCell>{row.country}</TableCell>
              <TableCell>{row.city}</TableCell>
              <TableCell>{parseFloat(row.soilMoisture).toFixed(2)} %</TableCell>
              <TableCell>{parseFloat(row.winds).toFixed(2)} km/h</TableCell>
              <TableCell>{parseFloat(row.temperature).toFixed(2)} °C</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
      >
        <Button size="small" onClick={handleFirstPage} disabled={page === 0}>
          First
        </Button>
        <Button size="small" onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </Button>
        <Typography variant="body2">
          {`Showing ${page * itemsPerPage + 1} - ${Math.min(
            (page + 1) * itemsPerPage,
            filteredData.length
          )} of ${filteredData.length}`}
        </Typography>
        <Button
          size="small"
          onClick={handleNextPage}
          disabled={(page + 1) * itemsPerPage >= filteredData.length}
        >
          Next
        </Button>
        <Button
          size="small"
          onClick={handleLastPage}
          disabled={(page + 1) * itemsPerPage >= filteredData.length}
        >
          Last
        </Button>
      </Box>
      <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
        <Typography variant="body2" sx={{ mr: 1 }}>
          Items per page:{" "}
        </Typography>
        <Button
          size="small"
          onClick={() => handleItemsPerPageChange(15)}
          disabled={itemsPerPage === 15}
        >
          15
        </Button>
        <Button
          size="small"
          onClick={() => handleItemsPerPageChange(20)}
          disabled={itemsPerPage === 20}
        >
          20
        </Button>
        <Button
          size="small"
          onClick={() => handleItemsPerPageChange(30)}
          disabled={itemsPerPage === 30}
        >
          30
        </Button>
        <Button
          size="small"
          onClick={() => handleItemsPerPageChange(40)}
          disabled={itemsPerPage === 40}
        >
          40
        </Button>
      </Box>
    </React.Fragment>
  );
};

export default Orders;
