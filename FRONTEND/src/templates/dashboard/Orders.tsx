import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { fetchPaginatedData } from "../../../api/fetchData";
import WeatherData from "../../../api/types";
import { Paper, TableContainer, TablePagination } from "@mui/material";

const Orders: React.FC = () => {
  const [data, setData] = useState<WeatherData[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPaginatedData(page + 1, itemsPerPage);
        setData(response.data);
        setTotalCount(response.totalCount);
        console.debug("Data fetched:", response.data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [page, itemsPerPage]);

  return (
    <React.Fragment>
      <Title>Current Weather Conditions</Title>
      <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
        <Table aria-label="simple table" size="small">
          <TableHead>
            <TableRow>
              <TableCell>Date/Time</TableCell>
              <TableCell>Farm</TableCell> {/* New column header for 'Farm' */}
              <TableCell>Country</TableCell>
              <TableCell>City</TableCell>
              <TableCell>Soil Moisture</TableCell>
              <TableCell>Humidity</TableCell>
              <TableCell>Temperature</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row: WeatherData) => (
              <TableRow key={row.id}>
                <TableCell>
                  {new Date(row.date).toLocaleDateString()}{" "}
                  {new Date(row.date).toLocaleTimeString()}
                </TableCell>
                <TableCell>{row.farm ?? "farm"}</TableCell>{" "}
                <TableCell>{row.country}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>
                  {parseFloat(row.soilMoisture).toFixed(2)}%
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
        count={totalCount}
        rowsPerPage={itemsPerPage}
        page={page}
        onPageChange={(_event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setItemsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
      />
    </React.Fragment>
  );
};

export default Orders;
